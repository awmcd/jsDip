define(["underscore"], function (_) {

// The EQUATIONS, based heavily on this: http://www.diplom.org/Zine/S2009M/Kruijswijk/DipMath_Chp2.htm

var equations = function (order_list) {

var dislodged, convoy, path, support, hold_strength, attack_strength,
    defend_strength, prevent_strength, move;

// dislodged
// ---------
// Returns true or false

dislodged = function (order) {
    var result = false;
    
    // Did unit stay in its spot?
    if (order.type !== 'move' || (order.type === 'move' && order.result === false)) {
             
        // Is there another unit attacking with succesful move? 
        _.each(order_list, function (other_order) {
            
            if (other_order.destination.id === order.unit.loc.id && other_order.type === 'move' &&
                other_order.result === true ) {
                result = true;
            }
        });
    }
    
    return result;
};

// convoy
// ------
// Returns true or false

convoy = function (order) {
    
    if (!dislodged(order)) {
        return true;
    } else {
        return false;
    }
};

// path
// ----
// Returns true or false

path = function (order) {
    
    if (order.type === 'move') {
        
        // is the order's destination adjacent?
        var geo_check;
        
        for (var x in order.unit.loc.adj) {
            if (x === order.destination.id) {
                geo_check = true;
                break;
            }
        }
        
        if (!geo_check) {
            return false;
        }
        
        if (!order.convoy_dependant) {
            return true;
        }
        
        if (order.convoy_dependant) {
            //if there is a convoy chain, each link of which is succesful
                // return true;
            //else return false
        }
        
        return true;
    }
    
};

// support
// -------
// Returns true or false

support = function (order) {
    
    var cut;
    
    if (order.type === 'support_move' && !path(order_list[order.partner.loc.id])) {
        return false;
    }
    
    if (dislodged(order)) {
        return false;
    }
    
    _.each(order_list, function (other_order) {
        if (other_order.type === 'move' &&
            other_order.destination.id === order.unit.loc.id &&
            other_order.unit.owner !== order.unit.owner &&
            path(other_order)) {
            
            cut = true;
        }
        
        // Addresses special case where support is cut from other split coast.
        // See DATC 6.B.6
        
        if (other_order.type === 'move' &&
            other_order.destination.subcoast &&
            (other_order.destination.subcoast === order.unit.loc.id ||
             other_order.destination.subcoast === order.unit.loc.subcoast)) {
                 
            cut = true;
        }
    });
    
    if (cut) {
        return false;
    } else {
        return true;
    }
};

// hold_strength
// -------
// Returns integer
// Applies to country, takes country

hold_strength = function (country) {
    
    // If the area is empty...
    if (!country.unit) {
        return 0;
    }
    
    // If the area contains a unit trying to move...
    if (order_list[country.id]) {
        if (order_list[country.id].type === 'move') {
            // If it succeeds ....
            if (order_list[country.id].result === true) {
                return 0;
            } else if (order_list[country.id].result === false){
                return 1;
            }
            
        }
    }

    // Else...
    
    var strength = 1;
    
    _.each(order_list, function (other_order) {
        
        if (other_order.type === 'support_hold' &&
            other_order.destination.id === order_list[country.id].destination.id &&
            other_order.result === true) {
        
            strength++;
        }
    
    });
    
    return strength;   
};

// attack_strength
// -------
// Returns integer

attack_strength = function (order) {
    
    // If no path, then return 0
    if (!path(order)) {
        return 0;
    }
    
    // If desination empty, or no h2h and destination unit succesfully moves
    if (!order_list[order.destination.id] ||
        (!order.h2h && (order_list[order.destination.id].type === 'move' &&
                        order_list[order.destination.id].result === true))) {
        
        var strength = 1;
        
        _.each(order_list, function (other_order) {
            
            if (other_order.type === 'support_move' &&
                other_order.destination === order.destination &&
                other_order.partner === order.unit &&
                other_order.result === true) {
            
                strength++;
            }
        });
        
        return strength;
    }
    
    // If not and unit destination is of same nationality
    if (order.destination.unit) {
        if (order.destination.unit.owner === order.unit.owner) {
            return 0;
        }
    }
    
    // In all other cases...
    var strength = 1;
        
    _.each(order_list, function (other_order) {
        
        if (other_order.type === 'support_move' &&
            other_order.destination === order.destination &&
            other_order.partner === order.unit &&
            other_order.result === true) {
        
            strength++;
        }
    });
    
    return strength;
};

// defend_strength
// -------
// Returns integer

defend_strength = function (territory_id) {
    
    var order;
    
    if (territory_id.split('_').length > 1) {
        order = order_list[territory_id.split('_')[0]];
    } else {
        order = order_list[territory_id];
    }
    
    if (order.type === 'move') {
        var strength = 1;
        
        _.each(order_list, function (other_order) {
            
            if (other_order.type === 'support_move' &&
                other_order.destination === order.destination &&
                other_order.partner === order.unit &&
                other_order.result === true) {
            
                strength++;
            }
        });
        
        return strength;
    }
};

// prevent_strength
// -------
// Returns integer

prevent_strength = function (order) {
    if (!path(order)) {
        return 0;
    }
    
    if (order.h2h && order_list[order.destination.id].result === true) {
        return 0;
    }
    
    var strength = 1;
    
    _.each(order_list, function (other_order) {
        
        if (other_order.type === 'support_move' &&
            other_order.destination === order.destination &&
            other_order.partner === order.unit &&
            other_order.result === true) {
        
            strength++;
        }
    });
    
    return strength;
};

// move
// -------
// Returns true or false

move = function (order) {
    var outcome;
    
    if (order.h2h) {
        if (attack_strength(order) > defend_strength(order.destination.id)) {
            outcome = true;
            
            _.each(order_list, function (other_order) {
                if (other_order !== order &&
                    other_order.type === 'move' &&
                    other_order.destination === order.destination) {
                    if (prevent_strength(other_order) >= attack_strength(order)) {
                        outcome = false;
                    }
                }
            });
            
            return outcome;
        }
    }
    
    if (!order.h2h) {

        if (attack_strength(order) > hold_strength(order.destination)) {
            outcome = true;
            

            _.each(order_list, function (other_order) {
                if (other_order !== order &&
                    other_order.type === 'move' &&
                    (other_order.destination === order.destination ||
                     other_order.destination.subcoast === order.destination.id ||
                     other_order.destination.subcoast === order.destination.subcoast)) {
                    if (prevent_strength(other_order) >= attack_strength(order)) {
                        outcome = false;
                    }
                }
            });
            
            return outcome;
        }
    }
    
    return false;

};

this.dislodged = dislodged;
this.convoy = convoy;
this.path = path;
this.support = support;
this.hold_strength = hold_strength;
this.attack_strength = attack_strength;
this.defend_strength = defend_strength;
this.prevent_strength = prevent_strength;
this.move = move;

};

function buildEquations (order_list) {
    return new equations(order_list);
}

return buildEquations;

});