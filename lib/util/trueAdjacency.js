define(["underscore"], function (_) {

var trueAdjacency = function (order, game) {
    
    // Adjacency check
    
    // is the order's destination adjacent?
    var adjacent;
    
    for (var x in game[order.unit.loc].adj) {
        if (x === order.destination) {
            adjacent = true;
            break;
        }
    }
    
    if (!adjacent) {
        return false;
    }
    
    if (order.unit.type === 'a' && game[order.destination].type !== 'sea') {
        return true;
    }
    
    if (order.unit.type === 'f' && game[order.destination].type === 'sea') {
        return true;
    }
    
    if (order.unit.type === 'f' && 
        game[order.unit.loc].type === 'coast' &&
        game[order.destination].type === 'coast') {
        
        var coasts_adjacent;
        
        _.each(game[order.unit.loc].adj, function(loc_adj){
            if (loc_adj.type === 'sea'){
                _.each(game[order.destination].adj, function (dest_adj){
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
    
    return false;
}

return trueAdjacency;

});