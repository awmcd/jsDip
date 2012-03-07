define(["underscore", "text!json/std/empty_game.json",
        "util/translateOrders"], function (_, ref, translateOrders) {

var execute = function (test) {
    
    var state = JSON.parse(ref);
    
    // Update state
    _.each(test.unit, function (unit) {
        state.board[unit[0]].units.push([unit[1], unit[2]]);
    });
    
    var order_list = translateOrders(test.orders);
    
    // Build orders and expectations
    _.each(test.expect, function (result, key) {
        order_list[key].expect = result;
    });
    
    var returned_order_list = jsDip.adjudicator.submit(state, order_list);
    
    var errors = false;
    
    _.each(returned_order_list, function (order) {
        _.each(order.expect, function (expectation, key) {
           if (expectation !== order[key]) {
               errors = 'ERROR: Expected ( '+key+ ' ' +expectation +') for: '+order.unit+' in '+test.id;
           }
        });
    });
    
    return errors;
}

return execute;

});