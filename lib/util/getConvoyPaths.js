define(["underscore"], function (_) {
   
function getConvoyPaths (order, order_list) {
    
    console.log('Starting some shit!')
    
    var rezults = [];

        
    function getPath (link_order, rezult) {
        console.log('MY rezult IS BLAN!?', rezult)
        var incomplete_rezult = rezult;
        
        _.each(link_order.unit.loc.adj, function (adj) {
            
            // If we're done, add completed path
            if (adj === order.destination) {
                rezults.push(rezult);
                console.log('GOT A PATH!', rezult, adj.id, order.destination.id)
            }
            
            console.log('Not done')
            
            // Is there a unit here?
            if (!adj.unit) {
                return;
            }
            
            console.log('Checking order list')
                        
            // Is there an order to consider?
            if (order_list[adj.unit.loc.id.substring(0,3)]) {
                var other_order = order_list[adj.unit.loc.id.substring(0,3)];
                
                
    
                // Look for next link
                if (other_order.type === 'convoy' &&
                    other_order.partner === order.unit &&
                    other_order.rezult !== false) {
                    console.log('Found a potential link')
                    // Dupe check that shit
                    var dupe_check;
                    
                    _.each(incomplete_rezult, function (other_link) {
                        if (order_list[adj.unit.loc.id.substring(0,3)] === other_link) {
                            dupe_check = true;
                            console.log('DOOP')
                        }
                    });
                    
                    if (dupe_check) {
                        return;
                    } else {
                        rezult.push(other_order);
                        console.log('recursing with', other_order, incomplete_rezult)
                        rezult.push(getPath(other_order, rezult));
                    }
                
                
                }
            }
            rezult = incomplete_rezult;
        });
    }
    
    getPath(order, [1]);
    
    console.log('GETCONVOY rezultS:', rezults)
    
    if (rezults[0] === undefined) {
        return false;
    } else {
        return rezults;
    }


}

return getConvoyPaths;   
   
});

        
        
        
       