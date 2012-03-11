define(["underscore", "text!json/std/empty_game.json",
        "util/translateOrders", "adjudicator/App"], 
        function (_, ref, translateOrders, adjudicator) {

var execute = function (test) {
    
    // Grab an empty state
    var state = JSON.parse(ref);
    
    // Prepare to combine orders
    var combined_orders = [];

    // Update state, create combined order array
    _.each(test.orders, function (orders, key) {
        var power = key;
        
        _.each(orders, function (string) {
            combined_orders.push(string);
        });
        
        var order_list = translateOrders(orders);
        
        _.each(order_list, function (order) {
            state.board[power].units.push([order.input.substring(0,1).toLowerCase(),
                                           order.unit.toLowerCase().substring(0,3)]);
        });
    });

    // Create orders_list
    var order_list = translateOrders(combined_orders);
    
    // Add expectations to orders
    _.each(test.expect, function (result, key) {
        order_list[key].expect = result;
    });
    
    // Adjudicate!
    var returned_order_list = adjudicator.submit(state, order_list);
    
    var errors = false;
    
    // Check expectations
    _.each(returned_order_list, function (order) {
        _.each(order.expect, function (expectation, key) {
           if (expectation !== order[key]) {
               errors = 'ERROR: Expected ( '+key+ ' ' +expectation +') for: '+order.unit.loc.id+' in '+test.id;
           }
        });
    });
    
    return errors;
};

return execute;

});