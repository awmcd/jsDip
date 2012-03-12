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
        
        // Only check unresolved moved and support orders.
        if ((order.resolved) || (order.type === 'convoy')) {
            return;
        }
        
        var geo_check = trueAdjacency(order, order_list, game);
        
        // if not, is there a potentially-valid covoy path?
        if (!geo_check && order.unit.type === 'a' &&
            order.unit.loc.type === 'coast' &&
            order.type === 'move' &&
            order.unit.loc !== order.destination) {
                
            var checkConvoyPaths = getConvoyPaths(order, order_list);
            
            if (checkConvoyPaths) {
                
            if (order.unit.type === 'a' &&
                order.type === 'move' &&
                order.unit.loc === order.destination) {
                return false;
            }
                
                order.convoy_dependant = checkConvoyPaths;
                geo_check = true;
            }
        }
        
        if (!geo_check) {
            report.invalid_geo = report.invalid_geo || [];
            report.invalid_geo.push('"'+order.input+'"');
            order.resolved = true;
            order.result = false;
            order.note = 'Geographically impossible!';
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
            
            if (order_list[partner.loc.id].type !== 'move') {
                hold_check = true;
            }
            
            if (!hold_check) {
                report.invalid_unmatched = report.invalid_unmatched || [];
                report.invalid_unmatched.push('"'+order.input+'"');
                order.resolved = true;
                order.result = false;
                order.note = 'Unit in ' + partner + ' received unmatched order.';
            }
        }
        
        // For Support-Move orders...
        if (order.type === 'support_move') {
            var move_check;
            
            if (!order.partner) {
                
            } else if (order_list[partner.loc.id].type === 'move' &&
                       order_list[partner.loc.id].destination === order.destination) {
                move_check = true;
            }
            
            if (!move_check) {
                report.invalid_unmatched = report.invalid_unmatched || [];
                report.invalid_unmatched.push('"'+order.input+'"');
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
                order.resolved = true;
                order.result = false;
                order.note = 'Unit in ' + partner + ' received unmatched order.';
            }
        }
    });
    
    
    // Mark head-to-head orders
    _.each(order_list, function(order) {
        
        if (!order.resolved && order.type === 'move') {
            
            var potential_h2h_order;
            
            if (!order.destination.subcoast) {
                potential_h2h_order = order_list[order.destination.id];
            } else {
                potential_h2h_order = order_list[order.destination.subcoast.id];
            }
            
            if (potential_h2h_order) {
                if (potential_h2h_order.type === 'move') {      
                    if (potential_h2h_order.destination.subcoast) {
                        if (potential_h2h_order.destination.subcoast.id === order.unit.loc.subcoast.id) {
                            order.h2h = true;
                        }
                    } else if  (potential_h2h_order.destination.id === order.unit.loc.id) {
                        order.h2h = true;
                    }
                }
            }
            
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