/**

prepOrders
----------

Prepares orders for adjudcation equations.

1.) Assigns hold orders for units on board receiving no orders.

2.) IMPORTANT: "Operationalize" all order objects with real units and
    destination variables. Mark invalid orders (i.e., orders with no unit).
    
3.) Check legality of convoy orders.
    (This must be done first, since it impacts legality of other order types.)

4.) Check legality and geographic limitations for move and support orders.

5.) Check for unmatched support and convoy orders.

6.) Mark head-to-head (h2h) orders.

**/

define(["underscore", "util/translateOrders", "adjudicator/checkAdjacency",
        "adjudicator/getConvoyPaths", "adjudicator/getConvoyLegality"],
        function (_, translateOrders, checkAdjacency, getConvoyPaths,
                  getConvoyLegality) {
    
function prepOrders (game, state, order_list) {
    
    // 1.) ASSIGN HOLD ORDERS FOR UNITS RECEIVING NO ORDERS
    
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
               order_list[unit_loc].unordered = "No order received; holding.";
               order_list[unit_loc].note = "No order received; holding.";
           }
           
       });
    });

    // 2.) !!! UPDATE UNIT OBJECTS !!!
    
    _.each(order_list, function (order) {
        
        // If this order has a unit associated with it ...
        if (game[order.unit].unit) {
            
            // Assign it the appropriate unit object
            order.unit = game[order.unit].unit;
            
            // Assign it the appropriate partner unit object
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
        
        // If there is no unit associated with the order, it's trash, and we
        // mark it as invalid.
        } else {
            order.resolved = true;
            order.result = false;
            order.invalid = true;
            order.note = 'Invalid Order: Unit does not exist!';
        }
        
    });

    // 3.) Check legality of convoy orders
    
    _.each(order_list, function (order) {
        if (order.type === 'convoy') {
            var illegal;
            
            if (order.unit.loc.type !== 'sea') {
                illegal = true;
            } else if (!getConvoyLegality(order, order_list)) {
                illegal = true;
            }
            
            if (illegal) {
                order.illegal = true;
                order.result = false;
                order.resolved = true;
            }
        }
    });
    
    // 4.) Check legality and geographic limitations for move and support orders.
    
    _.each(order_list, function (order) {
        
        // Sift out convoys, holds, and resolved orders to save CPU.
        if ((order.type === 'move' || order.type === 'support_move' ||
             order.type === 'support_hold') && !order.resolved) {
                // Continue checking
            } else {
                return;
            }
        
        // Moving to your own location is illegal
        if (order.destination === order.unit.loc) {
            order.illegal = true;
            order.result = false;
            order.resolved = true;
            return;
        }
        
        // Run through geographic checks
        var geo_check = checkAdjacency(order, order_list, game);
        
        var convoy_potential;
        
        // If an army ...
        if (order.unit.type === 'a' && order.type === 'move') {
        
            // ... is geographically adjacent to target ...
            if (geo_check) {
                
                // ... if both land and sea routes available, check convoy intent.
                // SEE DATC 4.A.3(d)
                if (order.unit.loc.type === 'coast' &&
                    order.destination.type === 'coast') {
                    
                    // If unit has been explicitly ordered to convoy ...
                    if (order.convoy_explicit) {
                        var convoyPaths = getConvoyPaths(order, order_list);
                        
                        if (convoyPaths) {
                            order.convoy_dependant = getConvoyPaths(order, order_list);
                        }
                    
                    // Else check for imputed intent to convoy ...
                    } else {
                        
                        for (var x in order_list) {
                            var other_order = order_list[x];
                            
                            if (other_order.type === 'convoy' &&
                                other_order.unit.owner === order.unit.owner &&
                                other_order.partner === order.unit &&
                                !other_order.illegal) {
                                    order.convoy_dependant = getConvoyPaths(order, order_list);
                                    break;
                            }
                            
                        }
                        
                    }
                        
                }
                
            // ... is NOT geographically adjacent to target ...
            } else {
                
                // See if a convoy is available
                if (order.unit.loc.type === 'coast' &&
                    order.destination.type !== 'sea') {
                    
                    convoy_potential = true;
                        
                    var checkConvoyPaths = getConvoyPaths(order, order_list);
                    
                    if (checkConvoyPaths) {
                        order.convoy_dependant = checkConvoyPaths;
                        order.illegal = false;
                        geo_check = true;
                    }
                }
            }
        }
        
        // If unit still not geographically OK'ed, then it's done for.
        if (!geo_check) {
            
            // Distinguish between illegal/impossible moves.
            // See DATC 4.E.1
            
            if (convoy_potential) {
                order.illegal = false;
            } else {
                order.illegal = true;
            }
            
            order.resolved = true;
            order.result = false;
            order.note = 'Geographically impossible!';
        }
        
    });
    
    // 5.) Check for unmatched support and convoy orders.
    
    _.each(order_list, function(order) {
        
        // Only check unresolved orders
        if ((order.resolved)) {
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
                order.illegal = true;
                order.resolved = true;
                order.result = false;
                order.note = 'Order not matched by partner unit.';
            }
        } else
        
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
                order.illegal = true;
                order.resolved = true;
                order.result = false;
                order.note = 'Order not matched by partner unit.';
            }
        } else
        
        // For Convoy orders...
        if (order.type === 'convoy') {
            var convoy_check;
            
            if (order_list[partner.loc.id].type === 'move' &&
                order_list[partner.loc.id].destination === order.destination) {
                    convoy_check = true;
            }
            
            if (!convoy_check) {
                order.illegal = true;
                order.resolved = true;
                order.result = false;
                order.note = 'Order not matched by partner unit.';
            }
        }
    });
    
    // 6.) Mark head-to-head (h2h) orders.

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
    
    return order_list;
}

return prepOrders;

});