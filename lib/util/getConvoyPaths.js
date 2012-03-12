define(["underscore"], function (_) {
   
function getConvoyPaths (order, order_list) {
    
    console.log('GetConvoyPaths!')
    
    var path, result;
    
    nextLink(order);
    
    if (result === true) {
        return path;
    } else {
        return false;
    }
    
    function nextLink (link_order) {
        
        //console.log('link order ', link_order)
        
        // Are we done?
        var done;
        
        _.each(link_order.unit.loc.adj, function (adj) {
            if (adj === order.destination) {
                done = true;
            }
        });
        
        if (done) {
            console.log('Found a convoy path!')
            result = true;
            return;
        }
        
        // Look at the last link's adjs for another link
        var new_link =[];
        _.each(link_order.unit.loc.adj, function (adj) {
            var adj_order = order_list[adj.id.substring(0,3)];
            
            //console.log('adj order ', adj_order)
            
            if (adj_order) {
                if (adj_order !== order &&
                    adj_order.type === 'convoy' &&
                    adj_order.partner === order.unit &&
                    adj_order.destination === order.destination &&
                    adj_order.result !== false) {
                        
                        if (!redundant(adj_order)) {
                            new_link.push(adj_order);
                        }
                }
            }
        });
        
        // If we found another link, add it, re-run nextLink
        if (new_link[0] !== undefined) {
            path = path || [];
            path.push(new_link[0]);
            //console.log('Path update ', path);
            nextLink(new_link[0]);
        }
    }
    
    function redundant (new_link) {
        var isRedundant;
        
        _.each(path, function (existing_link) {
            if (new_link === existing_link) {
                isRedundant = true;
            }
        });
        
        if (isRedundant) {
            return true;
        } else {
            return false;
        }
    }
    
}

return getConvoyPaths;   
   
});