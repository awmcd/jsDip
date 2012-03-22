define(["underscore"], function (_) {

var trueAdjacency = function (order, order_list, game) {
    
    // Adjacency check
    
    // is the order's destination adjacent?
    var adjacent;
    
    for (var x in order.unit.loc.adj) {
        if (x === order.destination.id) {
            adjacent = true;
            break;
        }
    }
    
    if (order.unit.type === 'a' && order.destination.type !== 'sea' && adjacent) {
        
        // Clean up subcoast for armies... not needed!
        if (order.destination.subcoast) {
            order.destination = order.destination.subcoast;
        }
        
        return true;
    }
    
    if (order.unit.type === 'f') {
        if ((order.destination.type === 'sea' ||
            order.unit.loc.type === 'sea') &&
            adjacent) {
            return true;
        }
        
        if (order.destination.type === 'land') {
            order.illegal = true;
            return false;
        }
        
    }
    
    if (!adjacent) {
        
        // If fleet is supporting to a split coast, adjacency rules are more
        // permissive...
        
        if ((order.type === 'support_move' || order.type === 'support_hold') &&
            order.destination.id.split('_').length > 1) {
            
            var adj, parent_country = order.destination.id.split('_')[0];

            _.each(game[parent_country].coasts, function(subcoast) {
                if (subcoast === order.destination) {
                    adj = true;
                }
            });
            
            if (adj) {
                return true;
            }
        }
        
        order.illegal = true;
        return false;
    }

    // Special coastal issues
    
    if (order.unit.type === 'f') {
        
        // If moving coast-to-coast, and not to a split coast country,
        // make sure coasts are fleet-adjacent.

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
                console.log('Didn\'t specify a coast, but only one option available. Move revised.');
                return true;
            } else if (coast_options.length > 1) {
                console.log('Didn\'t specify a coast!');
                return false;
            }
        }
        
    }
    
    return false;
};

return trueAdjacency;

});