/**

inputOrders
-----------

Simply marches an array of order strings through translateOrder to build
properly keyed, operationalized order_list for adjudication.

**/

define(["underscore", "util/translateOrder"], function (_, translateOrder) {
    
function inputOrders (order_array) {
    var order_list, bugged_count = 0;
    
    order_list = {};
    
    _.each(order_array, function(order) {
        
        // Translate order
        order = translateOrder(order);
        
        // Add to order list, keyed by unit territory
        order_list[order.unit] = order;
        
        // Increment bug count if necessary
        if (order.bug) {
            bugged_count++;
        }
        
    });
    
    // **********************
    // CONSOLE REPORTING CODE
    // **********************
    
    console.log('inputOrders Report');
    console.log('-----------------');
    
    console.log("Translated " + order_array.length + " orders; " + bugged_count + " bugged.");
    console.log(' ');
	
    return order_list;
}

return inputOrders;

});