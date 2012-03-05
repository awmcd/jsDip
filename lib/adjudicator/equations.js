define(["underscore"], function (_) {

// The EQUATIONS, based heavily on this: http://www.diplom.org/Zine/S2009M/Kruijswijk/DipMath_Chp2.htm

var equations = function (game, order_list) {

var dislodged, convoy, path, support, hold_strength, attack_strength,
    defend_strength, prevent_strength, move;

// dislodged
// ---------
// Returns true or false

dislodged = function (order) {
    var result = false;
    
    // Did unit stay in its spot?
    if ((order.type === 'hold' || order.type === 'convoy' ||
         order.type === 'move') && order.result === false) {
             
        // Is there another unit attacking with succesful move? 
        _.each(order_list, function (other_order) {
            
            if (other_order.destination === order.unit && other_order.type === 'move' &&
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
        
        for (var x in game[order.unit].adj) {
            if (x === order.destination) {
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
    }
    
};

// support
// -------
// Returns true or false

support = function (order) {
    
    var cut;
    
    if (order.type === 'support_move' && !path(order.partner)) {
        return false;
    }
    
    if (dislodged(order)) {
        return false;
    }
    
    _.each(order_list, function (other_order) {
        if (other_order.type === 'move' &&
            other_order.destination === order.unit &&
            game[other_order.unit].unit.owner !== game[order.unit].unit.owner &&
            path(other_order)) {
            
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
// Applies to country, takes country_id

hold_strength = function (country) {
    
    if (!order_list[country] ||
        (order_list[country].type === 'move' && order_list[country].result === true)) {
        
        return 0;
    } else if (order_list[country].type === 'move' && order_list[country].result === false) {
        return 1;
    } else {
        
        var strength = 1;
        
        _.each(order_list, function (order) {
            
            if (order.type === 'support_hold' &&
                order.destination === country &&
                order.result === true) {
            
                strength++;
            }
        
        });
        
        return strength;   
    }
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
    if (!order_list[order.destination] ||
        (!order.h2h && (order_list[order.destination].type === 'move' &&
                        order_list[order.destination].result === true))) {
        
        var strength = 1;
        
        _.each(order_list, function (other_order) {
            
            if (other_order.type === 'support_move' &&
                other_order.destination === order.destination &&
                other_order.result === true) {
            
                strength++;
            }
        });
        
        return strength;
    }
    
    // If not and unit destination is of same nationality
    if (game[order.destination].unit) {
        if (game[order.destination].unit.owner === game[order.unit].unit.owner) {
            return 0;
        }
    }
    
    // In all other cases...
    var strength = 1, destination_owner = game[order.destination].unit.owner;
        
    _.each(order_list, function (other_order) {
        
        if (other_order.type === 'support_move' &&
            other_order.destination === order.destination &&
            game[other_order.destination].unit.owner !== destination_owner &&
            other_order.result === true) {
        
            strength++;
        }
    });
    
    return strength;
};

// defend_strength
// -------
// Returns integer

defend_strength = function (order) {
    if (order.type === 'move') {
        var strength = 1;
        
        _.each(order_list, function (other_order) {
            
            if (other_order.type === 'support_move' &&
                other_order.destination === order.destination &&
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
    
    if (order.h2h && order_list[order.destination].result === true) {
        return 0;
    }
    
    var strength = 0;
    
    _.each(order_list, function (other_order) {
        
        if (other_order.type === 'support_move' &&
            other_order.destination === order.destination &&
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
    
    if (order.h2h) {
        if (attack_strength(order) > defend_strength(order_list[order.destination])) {
            var outcome = true;
            
            _.each(order_list, function (other_order) {
                if (other_order.type === 'move' &&
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
        if (attack_strength(order) > hold_strength(order_list[order.destination])) {
            var outcome = true;
            
            _.each(order_list, function (other_order) {
                if (other_order.type === 'move' &&
                    other_order.destination === order.destination) {
                    if (prevent_strength(other_order) >= attack_strength(order)) {
                        outcome = false;
                    }
                }
            });
            
            return outcome;
        }
    }

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

return equations;

});