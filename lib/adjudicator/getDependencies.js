
define(["underscore"], function (_) {

function getDependencies (order, order_list) {
    
    order.dependencies = {};
        
    if (order.type === 'move') {
        if (order.h2h) {
            
            _.each(order_list, function (other_order, key) {
                
                // all units supporting attack
                if (other_order.type === 'support_move' &&
                    other_order.partner === order.unit &&
                    (other_order.destination === order.destination ||
                     other_order.destination.subcoast === order.destination.subcoast)) {
                    
                    order.dependencies[key] = other_order;
                }
                
                // all units supporting the head-to-head nemesis
                if (other_order.type === 'support_move' &&
                    other_order.partner === order.destination.unit &&
                    other_order.destination === order.unit.loc) {
                    
                    order.dependencies[key] = other_order;
                }
            });
        }
        
        if (!order.h2h) {
            
            // if unit at destination is trying to move, we need to know...
            if (order.destination.unit) {
                if (order_list[order.destination.id].type === 'move') {
                    order.dependencies[order.destination.id] = order_list[order.destination.id];
                }
            }
            
            _.each(order_list, function (other_order, key) {
                // all units supporting attack
                if (other_order.type === 'support_move' &&
                    other_order.partner === order.unit &&
                    (other_order.destination === order.destination ||
                     other_order.destination.subcoast === order.destination.subcoast)) {
                    
                    order.dependencies[key] = other_order;
                }
                
                // all support hold orders to destination
                if (other_order.type === 'support_hold' &&
                    other_order.partner === order.destination.unit) {
                    order.dependencies[key] = other_order;
                }
                
                // support_moves of all other orders moving to destination
                if (other_order.type === 'support_move' &&
                    (other_order.destination === order.destination ||
                     other_order.destination.subcoast === order.destination.subcoast)) {
                    order.dependencies[key] = other_order;
                }
            });
        }
    }
    
    if (order.type === 'support_hold' || order.type === 'support_move') {
        
    }
    
    if (order.type === 'convoy') {
        
    }
    
    function isEmpty(ob){
        for(var i in ob){ if(ob.hasOwnProperty(i)){return false;}}
        return true;
    }
    
    if (isEmpty(order.dependencies)) {
        order.dependencies = false;
    }
}

return getDependencies;
 
});