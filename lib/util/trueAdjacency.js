define(["underscore"], function (_) {

var trueAdjacency = function (order) {
    
    // Adjacency check
    
    // is the order's destination adjacent?
    var adjacent;
    
    for (var x in order.unit.loc.adj) {
        if (x === order.destination.id) {
            adjacent = true;
            break;
        }
    }
    
    if (!adjacent) {
        return false;
    }
    
    if (order.unit.type === 'a' && order.destination.type !== 'sea') {
        return true;
    }
    
    if (order.unit.type === 'f' && order.destination.type === 'sea') {
        return true;
    }
    
    // Special coastal issues
    
    if (order.unit.type === 'f') {
        
        // If moving coast-to-coast, and  not to a split coast country,
        // make sure coasts are fleet-adjacent.

        if (order.unit.loc.type === 'coast' &&
            order.destination.type === 'coast' &&
            !order.destination.coasts) {
            
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
        
        // If move to a split-coast country without a subcoast specified...
        
        if (order.destination.coasts) {
            
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