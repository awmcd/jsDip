define(["underscore"], function (_) {
   
function getConvoyLegality (order, order_list) {
    
    var done;
    
    function getPath (link_order, result, results) {
        
        if (done) {
            return results;
        }
                   
        _.each(link_order.unit.loc.adj, function (ter) {               
            if (ter == order.destination) {
                var new_result = result.slice(0, result.length);
                results.push(new_result);
                done = true;
            } else
            
            if (ter.unit && 
                order_list[ter.id.substring(0,3)]) {
                
                var other_order = order_list[ter.id.substring(0,3)];
                
                // Look for next link
                if (other_order.unit.type === 'f') {
    
                    // If not a dupe, add it to result and recursively call neighbors
                    if (result.indexOf(other_order) === -1){
                        result.push(other_order);
                        result.concat(getPath(other_order, result, results, done));
                        result.pop().input
                    }
                }
            }
        });
        return results;
    }
    
    var final_result = getPath(order, [], []);
    
    if (final_result[0]) {
        return true;
    } else{
        return false;
    }
}
return getConvoyLegality;  
});