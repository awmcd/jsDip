/**

prepOrders
----------

- Checks for units without orders; assigns 'hold' order.
- Checks for orders with geographic limitations; resolves as failed.
   - Marks convoy dependant army moves.
- Checks for unmatched support and convoy orders; resolves as failed.
- Checks for head-to-head battles; labels as such.

**/

define(["underscore", "util/translateOrders",
        "util/trueAdjacency", "util/getConvoyPaths"],
        function (_, translateOrders, trueAdjacency, getConvoyPaths) {
    
function prepOrders (game, state, order_list) {
    
    var report = {};
    
    // Assign holds for units without orders.
    _.each(state.board, function (power) {
       _.each(power.units, function (unit) {
           
           var order_exists, unit_loc = unit[1];
           
           for (var order in order_list) {
               if (order_list[order].unit === unit_loc) {
                   order_exists = true;
                   break;
                }
            }
            
           if (!order_exists) {
               order_list[unit_loc] = translateOrders(unit_loc+' H');
               report.unassigned = report.unassigned || [];
               report.unassigned.push(unit_loc);
           }
           
       });
    });

    
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // Important update or order objects below
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    
    // Update intra-order unit and destination properties to reflect game
    
    _.each(order_list, function(order){
        
        if (game[order.unit].unit) {
            
            // Assign unit object
            order.unit = game[order.unit].unit;
            
            // Assign unit partner
            if (order.partner) {
                order.partner = game[order.partner].unit;
            }
            
            // If we're dealing with a fleet that has an explicit coast order,
            // OR a fleet moving to a territory with split coasts ...
            if (order.unit.type === 'f' &&
                (order.destination.split('_').length > 1 ||
                game[order.destination].coasts)) {
                    
                var split = order.destination.split("_"),
                    location = split[0],
                    coast = split[1];
                
                // Did they order a coast?
                if (game[location].coasts[coast]) {
                    order.destination = game[location].coasts[coast];
                } else {
                    order.destination = game[location];
                }
                
            // For everyone else...    
            } else {
                order.destination = game[order.destination];     
            }
            
        } else {
            report.invalid_geo = report.invalid_geo || [];
            report.invalid_geo.push('"'+order.input+'"');
            order.resolved = true;
            order.result = false;
            order.invalid = true;
            order.note = 'Unit does not exist!';
        }
        
    });
    
    
    // Check for geographic limitations
    
    _.each(order_list, function (order) {
        
        var convoy_potential;
        
        // Only check unresolved moved and support orders.
        if ((order.resolved) || (order.type === 'convoy')) {
            
            if (order.type === 'convoy') {
                if (order.unit.loc.type !== 'sea') {
                    order.illegal = true;
                    order.result = false;
                    order.resolved = true;
                }
            }
            
            return;
        }
        
        var geo_check = trueAdjacency(order, order_list, game);
        
        // check for convoy intent
        
        if (order.unit.type === 'a' &&
            order.unit.loc.type === 'coast' &&
            order.destination.type === 'coast' &&
            geo_check) {
            
            var checkConvoyPaths = getConvoyPaths(order, order_list);
            
            var my_convoy_paths;
            
            if (checkConvoyPaths) {
                
                _.each(checkConvoyPaths, function (path) {
                    var wrong_link;
                    
                    _.each(path, function (link) {
                        if (order.unit.owner !== link.unit.owner) {
                            wrong_link = true;
                        }
                    })
                    
                    if (wrong_link) {
                        return;
                    } else {
                        my_convoy_paths = my_convoy_paths || [];
                        my_convoy_paths.push(path);
                    }
                    
                })
            }
            
            if (my_convoy_paths) {
                order.convoy_dependant = my_convoy_paths;
            }
            
        }
        
        // if not, is there a potentially-valid covoy path?
        if (!geo_check && order.unit.type === 'a' &&
            order.unit.loc.type === 'coast' &&
            order.type === 'move' &&
            order.destination.type !== 'sea' &&
            order.unit.loc !== order.destination) {
            
            convoy_potential = true;
                
            var checkConvoyPaths = getConvoyPaths(order, order_list);
            
            if (checkConvoyPaths) {
                
                // Can't move to your own territory
                // !!!! MOVE THIS HIGHER
                if (order.unit.type === 'a' &&
                    order.type === 'move' &&
                    order.unit.loc === order.destination) {
                    return false;
                }
                
                order.convoy_dependant = checkConvoyPaths;
                order.illegal = false;
                geo_check = true;
            }
        }
        
        // Moving to same location is illegal
        if (!geo_check && (order.destination === order.unit.loc)) {
            order.illegal = true;
        }
        
        if (!geo_check) {
            report.invalid_geo = report.invalid_geo || [];
            report.invalid_geo.push('"'+order.input+'"');
            
            // This has to do with the distinction between illegal/impossible moves
            // See DATC 4.E.1
            
            if (convoy_potential) {
                order.illegal = false;
            } else {
                order.illegal = true;
            }
            
            order.resolved = true;
            order.result = false;
            order.note = 'Geographically impossible! (Assigned hold)';
        }
        
    });
    
    // Check for unmatched orders
    
    _.each(order_list, function(order) {
        
        // Only check unresolved orders that have a partner requirement
        if ((order.resolved) || (!order.partner) && (order.partner !== undefined)) {
            return;
        }
        
        var partner = order.partner;
        
        // For Support-Hold orders...
        if (order.type === 'support_hold') {
            var hold_check;
            
            if (order_list[partner.loc.id].type !== 'move' ||
                order_list[partner.loc.id].illegal) {
                hold_check = true;
            }
            
            if (!hold_check) {
                report.invalid_unmatched = report.invalid_unmatched || [];
                report.invalid_unmatched.push('"'+order.input+'"');
                order.illegal = true;
                order.resolved = true;
                order.result = false;
                order.note = 'Unit in ' + partner + ' received unmatched order.';
            }
        }
        
        // For Support-Move orders...
        if (order.type === 'support_move') {
            var move_check;
            
            if (!order.partner) {
                
            } else if (order_list[partner.loc.id.substring(0,3)].type === 'move' &&
                       order_list[partner.loc.id.substring(0,3)].destination === order.destination &&
                       !order_list[partner.loc.id.substring(0,3)].illegal) {
                move_check = true;
            }
            
            if (!move_check) {
                report.invalid_unmatched = report.invalid_unmatched || [];
                report.invalid_unmatched.push('"'+order.input+'"');
                order.illegal = true;
                order.resolved = true;
                order.result = false;
                order.note = 'Unit in ' + partner + ' received unmatched order.';
            }
        }
        
        // For Convoy orders...
        if (order.type === 'convoy') {
            var convoy_check;
            
            if (order_list[partner.loc.id].type === 'move' &&
                order_list[partner.loc.id].destination === order.destination) {
                    convoy_check = true;
            }
            
            if (!convoy_check) {
                report.invalid_unmatched = report.invalid_unmatched || [];
                report.invalid_unmatched.push('"'+order.input+'"');
                order.illegal = true;
                order.resolved = true;
                order.result = false;
                order.note = 'Unit in ' + partner + ' received unmatched order.';
            }
        }
    });
    
    
    // Mark head-to-head orders
    _.each(order_list, function(order) {
        
        if (!order.resolved && order.type === 'move' &&
            !order.convoy_dependant) {
            
            var potential_h2h_order;
            
            if (!order.destination.subcoast) {
                potential_h2h_order = order_list[order.destination.id];
            } else {
                potential_h2h_order = order_list[order.destination.subcoast.id];
            }
            
            if (potential_h2h_order) {
                if (potential_h2h_order.type === 'move' && !potential_h2h_order.convoy_dependant) {      
                    if (potential_h2h_order.destination.subcoast) {
                        if (potential_h2h_order.destination.subcoast.id === order.unit.loc.id) {
                            order.h2h = true;
                        }
                    } else if  (potential_h2h_order.destination.id === order.unit.loc.id) {
                        order.h2h = true;
                    }
                }
            }
            
        }
    });
    
    // Take care of illegal moves
    
    _.each(order_list, function (order) {
        if (order.illegal) {
            order.illegal = order.input;
        }
    });
    
    // **********************
    // CONSOLE REPORTING CODE
    // **********************
    
    console.log('prepOrders Report');
    console.log('-----------------');
    
    if (report.unassigned) {
        console.log('Found '+report.unassigned.length+' unassigned order(s); ordered holds.');
        
        var txt = '';
        _.each(report.unassigned, function (unit) {
            var add_txt = unit+' ';
            txt = txt+add_txt;
        });
        
        console.log('  |-> (',txt,')');
        
    }
    
    if (report.invalid_geo) {
        console.log('Found '+report.invalid_geo.length+' geographically invalid order(s).');
        
        var txt = '';
        _.each(report.invalid_geo, function (unit) {
            var add_txt = unit+' ';
            txt = txt+add_txt;
        });
        
        console.log('  |-> (',txt,')');
        
    };
    
    if (report.invalid_unmatched) {
        console.log('Found '+report.invalid_unmatched.length+' unmatched order(s).');
        
        var txt = '';
        _.each(report.invalid_unmatched, function (unit) {
            var add_txt = unit+' ';
            txt = txt+add_txt;
        });
        
        console.log('  |-> (',txt,')');
        
    };
    
    var num_resolved = 0, num_unresolved = 0;
    
    _.each(order_list, function (order) {
        if (order.resolved === true) {
            num_resolved++;
        } else if (order.resolved === false) {
            num_unresolved++;
        }
    });
    
    console.log(num_unresolved + '/' + (num_unresolved+num_resolved) +' moves remain unresolved.');
    console.log(' ');
    
    return order_list;
}

return prepOrders;

});