define(["underscore", "init/init_ref", "init/init_game", 
        "adjudicator/prepOrders", "adjudicator/getRelevancies",
        "adjudicator/equations"],
        function (_, init_ref, init_game, prepOrders, getRelevancies, equations) {
    
var Adjudicator = function () {  
    
    var feeder, resolve, adjudicate, e;
    
    // .submit :: Entry point for the Adjudicator

    this.submit = function (state, order_list) {
        
        // Get a clean reference model, build game.
        var game = init_game(init_ref(), state);

        // Prep orders
        order_list = prepOrders(game, state, order_list);
        
        // Initialize equation environment
        e = equations(order_list, game);
        
        // Debugging reporting
        debug(game, order_list); //Temporary
        
        // Generate relevancies
        _.each(order_list, function (order) {
            if (order.result === undefined) {
                getRelevancies(order, order_list);
            }
        });
        
        // First pass!
       _.each(order_list, function (order) {
            if (!order.relevancies && order.type !== 'move') {
                resolve(order);
            }
        });
        
        // Adjudicate!
       feeder(order_list);
        
        // Check for dislodges, update orders
        _.each(order_list, function (order) {
            var dislodged;
            
            if (!order.invalid) {
                dislodged = e.dislodged(order);
            }
            
            if (dislodged) {
                order.dislodged = true;
            }
        });
        
        return order_list;
    };
    
    feeder = function (order_list, count, manifest) {
        
        // Set loop count
        var loop_count = count || 1;
        
        // Build a new manifest
        var new_manifest = {};
        
        _.each(order_list, function (order, key){
            new_manifest[key] = order.resolved;
        });
        
        // Compare manifests to check for recursion        
        if (_.isEqual(manifest, new_manifest)) {
            console.log('Recursion detected, passing orders to backups...');
            e.backup(order_list);
        }
        
        console.log('Loop Count: ', loop_count);
        
        _.each(order_list, function (order) {
            if (!order.resolved) {
                resolve(order);
            }
        });
        
        var done;
        
        _.each(order_list, function (order) {
            if (!order.resolved) {
                done = false;
            }
        });
        
        if (done === false && loop_count < 20) {
            loop_count++;
            feeder(order_list, loop_count, new_manifest);
        } else if (loop_count >= 20) {
            console.log('!!! CRASH !!!');
        }
        
    };
    
    resolve = function (order) {        
        if (order.resolved) {
            return;
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
        
        if (result === true || result === false) {
            order.resolved = true;
            order.result = result;
            console.log('input: ', order.input, '|', result);
        } else {
            console.log('input: ', order.input, '|', 'inconclusive');
        }
    };
    
    var debug = function (game, order_list) {
        console.log('game: ', game);
        console.log('order_list: ', order_list);
        console.log(' ');
        console.log('Adjucation Report');
        console.log('-----------------');
    };
    
};
    
    var adjudicator = new Adjudicator ();
    
    return adjudicator;
});