/**

checkAdjacency
--------------

Accepts an order, returns a boolean value indicating unit-specific adjacency.
(i.e., a sea is never unit-specific adjacent to an army)

1.) Check to see if territories are adjacent.

2.) If army, check and return.

3.) If fleet, check and return.
    NOTE: A lot of gory coastal details specific to this implementation are
    dealt with in this step. See code below.
    
**/

define(["underscore"], function (_) {

var checkAdjacency = function (order, order_list, game) {
    
    // 1.) Check to see if territories are adjacent.
    
    var adjacent;
    
    for (var x in order.unit.loc.adj) {
        if (x === order.destination.id) {
            adjacent = true;
            break;
        }
    }
    
    // 2.) Check and return adjacency for armies.
    
    if (order.unit.type === 'a') {
        
        if (adjacent && order.destination.type !== 'sea') {
            
            // Clean up subcoast for armies... not needed!
            if (order.destination.subcoast) {
                order.destination = order.destination.subcoast;
            }
            
            return true;
        } else {
            return false;
        }
    }
    
    // 3.) Check and return adjacency for fleets.
    
    if (order.unit.type === 'f') {
        
        if ((order.destination.type === 'sea' ||
            order.unit.loc.type === 'sea') &&
            adjacent) {
            return true;
            
        } else if (order.destination.type === 'land') {
            order.illegal = true;
            return false;
            
        } else if (adjacent) {
            
            // If a fleet is moving coast-to-coast, and a subcoast isn't,
            // involved, we should ensure there's an adjacent sea.
    
            if (order.unit.loc.type === 'coast' &&
                order.destination.type === 'coast' &&
                (!order.destination.coasts)) {
                
                var coasts_adjacent;
                
                _.each(order.unit.loc.adj, function(loc_adj){
                    if (loc_adj.type === 'sea'){
                        _.each(order.destination.adj, function (dest_adj){
                            if (dest_adj.id === loc_adj.id) {
                                coasts_adjacent = true;
                            }
                        });
                    }
                });
                
                if (coasts_adjacent) {
                    return true;
                }
            }
            
           // If support to a split-coast country without a subcoast specified...
            
            if (order.destination.coasts &&
                (order.type === 'support_move' ||
                 order.type === 'support_hold') ) {
                     
                var update;
                var partner_heading = order_list[order.partner.loc.id].destination;
                
                _.each (order.unit.loc.adj, function (adj) {
                    if (adj === partner_heading) {
                        update = partner_heading
                    }
                })
                
                if (update) {
                    order.destination = update;
                    return true;
                }
            }
            
            // If move to a split-coast country without a subcoast specified...
            
            if (order.destination.coasts && order.type === 'move') {
                
                var coast_options = [];
                
                _.each(order.destination.coasts, function(coast) {
                    _.each(coast.adj, function(adj) {
                        if (adj.id === order.unit.loc.id) {
                            coast_options.push(coast);
                        }
                    });
                });
                
                if (coast_options.length === 1) {
                    order.desination = coast_options[0];
                    return true;
                } else if (coast_options.length > 1) {
                    order.note = 'No coast specified; move failed.';
                    return false;
                }
            }

        } else if (!adjacent) {
            
            // If fleet has been ordered to support a split coast, then we have
            // to do a slightly more permissive adjacency check.
            
            if ((order.type === 'support_move' || order.type === 'support_hold') &&
                order.destination.id.split('_').length > 1) {
                
                var adj, parent_country = order.destination.id.split('_')[0];
                
                for (var x in game[parent_country].coasts) {
                    var subcoast = game[parent_country].coasts[x];
                    if (subcoast === order.destination) {
                        adj = true;
                        break;
                    }
                }
                
                if (adj) {
                    return true;
                } 
            } else {
                order.illegal = true;
                return false;
            }
        }
    }
    
    // Just in case...
    
    return false;
};

return checkAdjacency;

});