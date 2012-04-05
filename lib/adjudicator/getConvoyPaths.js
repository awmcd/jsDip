define(["underscore"], function (_) {
   
function getConvoyPaths (order, order_list) {
    
    function getPath (link_order, result, results) {
                   
        _.each(link_order.unit.loc.adj, function (ter) {
            //console.log('*******checking', ter.id);
               
            // If we're done, add **copy** of completed path to results
            if (ter == order.destination && result.length > 0) {
                var new_result = result.slice(0, result.length);
                results.push(new_result);
                //console.log('**********GOT A PATH');
                
            } else// Is there a unit here? with an order?
            if (ter.unit && 
                order_list[ter.id.substring(0,3)]) {
                
                var other_order = order_list[ter.id.substring(0,3)];
                
                // Look for next link
                if (other_order.type === 'convoy' &&
                    other_order.partner === order.unit &&
                    other_order.result !== false ) {
    
                    // If not a dupe, add it to result and recursively call neighbors
                    if (result.indexOf(other_order) === -1){
                        result.push(other_order);
                        //console.log(other_order.unit.loc.id, ' pushed. recursing.');
                        result.concat(getPath(other_order, result, results));
                        result.pop();
                    }
                }
            }
        });
        return results;
    }
    
    var final_result = getPath(order, [], []);
    
    if (final_result[0]) {
        return final_result;
    } else{
        return false;
    }
}
return getConvoyPaths;  
});