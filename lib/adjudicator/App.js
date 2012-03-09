define(["underscore", "init/init_ref", "init/init_game", 
        "adjudicator/prepOrders", "adjudicator/equations"],
        function (_, init_ref, init_game, prepOrders, equations) {
    
var Adjudicator = function () {  
    
    var resolve, adjudicate, e;
    
    // .submit :: Entry point for the Adjudicator

    this.submit = function (state, order_list) {
        
        // Get a clean reference model, build game.
        var game = init_game(init_ref(), state);

        // Prep orders
        order_list = prepOrders(game, state, order_list);
        
        // Initialize equation environment
        e = equations(order_list);
        
        // Debugging reporting
        debug(game, order_list); //Temporary
        
        // Adjudicate!
        _.each(order_list, function (order) {
            resolve(order);
        });
        
        // Check for dislodges, update orders
        _.each(order_list, function (order) {
            var dislodged = e.dislodged(order);
            
            if (dislodged) {
                order.dislodged = true;
            }
        });
        
        return order_list;
    };
    
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
        
        if (type === 'convoy') {
            result = e.convoy(order);
        }
        
        order.resolved = true;
        order.result = result;
        
        console.log('input: ', order.input, '|', result);
        
    };
    
    var debug = function (game, order_list) {
        console.log('game: ', game);
        console.log('order_list: ', order_list);
        console.log(' ');
        console.log('Proceeding to adjudication...');
    };
    
};
    
    var adjudicator = new Adjudicator ();
    
    return adjudicator;
});