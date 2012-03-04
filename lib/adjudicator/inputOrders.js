define(["adjudicator/translateOrder"], function (translateOrder) {
    
function inputOrders (order_array) {
    var x,stats, order_list;
    
    stats = {};
    stats.bugged = 0;
    
    // run translateOrder
    for (x in order_array) {
        order_array[x] = translateOrder(order_array[x]);
    }
    
    // build order list (just indexes orders by territory name)
    order_list = {};
    
    for (x in order_array) {
        var entry = order_array[x];
        order_list[entry.unit] = entry;
    }
    
    // generate stats
    for (x in order_list) {
        if (order_list[x].bug) {
            stats.bugged += 1;
        }
    }
    
    // **********************
    // CONSOLE REPORTING CODE
    // **********************
    
    console.log('inputOrders Report');
    console.log('-----------------');
    
    console.log("Translated " + order_array.length + " orders; " + stats.bugged + " bugged.");
    console.log(' ');
	
    return order_list;
}

return inputOrders;

});