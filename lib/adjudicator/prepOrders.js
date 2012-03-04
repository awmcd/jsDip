/**

prepOrders
----------

- Checks for units without orders; assigns 'hold' order.
- Checks for orders with geographic limitations; resolves as failed.
   - Marks convoy dependant army moves.
- Checks for unmatched support and convoy orders; resolves as failed.
- Checks for head-to-head battles; labels as such.

**/

define(["underscore", "adjudicator/translateOrder"], function (_, translateOrder) {
    
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
               report.unassigned = report.unassigned || [];
               var hold_order_string = unit_loc+' H';
               var hold_order = translateOrder(hold_order_string);
               order_list[unit_loc] = hold_order;
               report.unassigned.push(unit_loc);
           }
           
       });
    });
    
    // Check for geographic limitations
    
    _.each(order_list, function (order) {
        
        // Only check unresolved moved and support orders.
        if ((order.resolved) || (order.type === 'convoy')) {
            return;
        }
        
        var geo_check;
        
        // is the order's destination adjacent?
        for (var x in game[order.unit].adj) {
            if (x === order.destination) {
                geo_check = true;
                break;
            }
        }
        
        // if not, is there a potentially-valid covoy path?
        if (!geo_check && game[order.unit].unit.type === 'a' && game[order.unit].type === 'coast' && order.type === 'move') {
            // ...
            // order.convoy_dependant = true;
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
        if ((order.resolved) || (!order.partner)) {
            return;
        }
        
        var partner = order.partner;
        
        // For Support-Hold orders...
        if (order.type === 'support_hold') {
            var hold_check;
            
            if (order_list[partner].type !== 'move') {
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
            
            if (order_list[partner].type === 'move' &&
                order_list[partner].destination === order.destination) {
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
            
            if (order_list[partner].type === 'move' &&
                order_list[partner].destination === order.destination) {
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
            if (game[order.destination].unit) {
                if (order_list[order.destination].type === 'move' &&
                    order_list[order.destination].destination === order.unit) {
                    order.h2h = true;
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

    
    
    
    
    //order_list._prepOrderReport = report;
    
    return order_list;
}

return prepOrders;

});