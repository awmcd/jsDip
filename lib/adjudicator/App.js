define(["underscore", "init/init_ref", "init/init_game", "adjudicator/inputOrders",
        "adjudicator/prepOrders", "adjudicator/equations"],
        function (_, ref, init_game, inputOrders, prepOrders, equations) {
    
var Adjudicator = function () {  
    
    this.util = {
        inputOrders: inputOrders
    };
    
    var resolve, adjudicate, e;
    
    resolve = function (order) {
        if (order.resolved) {
            return;
        }
        
        // look if resolution dependent on other orders
        if (order.dependencies === undefined) {
            //generate dependencies
        }
        
        if (order.dependencies) {
            _.each(order.dependencies, function (order) {
                resolve(order);
            });
        }
        
        adjudicate(order);
    };
    
    adjudicate = function (order) {
        var type = order.type, result;
        
        if (type === 'move') {
            result = e.move(order);
        }
        
        if (type === 'support_hold' || type === 'support_move') {
            result = e.support(order);
        }
        
        order.resolved = true;
        order.result = result;
        
        console.log('input: ', order.input, '|', result);
        
    };
        
    // Entry point
    this.submit = function (state, order_list) {
        
        var game = init_game(ref, state);

        e = new equations(game, order_list);
        
        // Shortcut for debugging (!temp?)
        this.ref = ref;
        this.game = game;
        this.state = state;
        this.order_list = order_list;
        
        // Prep orders
        order_list = prepOrders(game, state, order_list);
        console.log(' ');
        console.log('order_list: ', this.order_list);
        console.log('state: ', this.state);
        console.log('game: ', this.game);
        console.log('e: ', e);
        console.log(' ');
        console.log('Proceeding to adjudication...');
        
        // Adjudicate!
        _.each(order_list, function (order) {
            resolve(order);
        });
        
        // Check for dislodges
        _.each(order_list, function (order) {
            var dislodged = e.dislodged(order);
            if (dislodged) {
                order.dislodged = true;
            }
        });
        
        return order_list;
        
    };
};
    
    var adjudicator = new Adjudicator ();
    
    return adjudicator;
});