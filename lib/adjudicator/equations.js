// Base Equations (baseEquations)
// http://www.diplom.org/Zine/S2009M/Kruijswijk/DipMath_Chp2.htm
// http://www.diplom.org/Zine/S2009M/Kruijswijk/DipMath_Chp4.htm


define(["underscore", "util/getConvoyPaths", "util/getRelevancies"],
        function (_, getConvoyPaths, getRelevancies) {

var equations = function (order_list, game) {

var dislodged, convoy, path, support, move, backup,
    hold_strength, attack_strength, defend_strength, prevent_strength;

// ----
// Move
// ----

move = function (order) {
    
    var order_attack_strength = attack_strength(order),
        defeated, undecided;
    
    // In a normal, non-h2h move . . .
    if (!order.h2h) {
        
        var opposing_hold_strength = hold_strength(order.destination.id.substring(0,3));
        
        console.log('!!!', order, order_attack_strength, opposing_hold_strength)
            
        if (order_attack_strength[0] > opposing_hold_strength[1]) {
                        
            preventCalculus();
            
        } else if (order_attack_strength[1] <= opposing_hold_strength[0]) {
            defeated = true;
        } else {
            undecided = true;
            preventCalculus();
        }
        
    // In a h2h conflict ...
    } else if (order.h2h) {
        
        var opposing_defend_strength = defend_strength(order_list[order.destination.id.substring(0,3)]);
        
        console.log('!!!', order, order_attack_strength, opposing_defend_strength)
        
        if (order_attack_strength[0] > opposing_defend_strength[1]) {
            
            preventCalculus();
            
        } else if (order_attack_strength[1] <= opposing_defend_strength[0]) {
            defeated = true;
        } else {
            undecided = true;
        }

    }
    
    function preventCalculus () {
        _.each(order_list, function (other_order) {
            
            if (other_order !== order &&
                other_order.type === 'move' &&
                other_order.destination.id.substring(0,3) ===
                order.destination.id.substring(0,3)) {
                
                var opposing_prevent_strength = prevent_strength(other_order);
                
                console.log('!!', order, order_attack_strength, opposing_prevent_strength);
                    
                if (opposing_prevent_strength === undefined) {
                    undecided = true;
                } else if (order_attack_strength[0] > opposing_prevent_strength[1]) {
                    // Atta boy!
                } else if (order_attack_strength[1] <= opposing_prevent_strength[0]) {
                    defeated = true;
                } else {
                    undecided = true;
                }
            }
        });
    }
    
    if (defeated === true) {
        return false;
    } else if (undecided === true) {
        return;
    } else {
        return true;
    }
    
};


// support
// -------
// Returns true or false

support = function (order) {
    
    var cut;
    
    // If dislodged ...
    if (dislodged(order) === true) {
        return false;
    } else if (dislodged(order) === undefined) {
        return;
    }
    
    _.each(order_list, function (other_order) {
        if (other_order.type === 'move' &&
            other_order.destination.id.substring(0,3) === order.unit.loc.id.substring(0,3) &&
            other_order.unit.loc.id.substring(0,3) !== order.destination.id.substring(0,3) &&
            other_order.unit.owner !== order.unit.owner) {

            if (path(other_order) === true) {
                cut = true;
            } else if (path(other_order) === undefined) {
                if (!cut) {
                    cut = 'unknown';
                }
            }
            
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

    if (cut === true) {
        return false;
    } else if (cut === 'unknown') {
        return;
    }  else {
        return true;
    }
};

// convoy
// ------
// Returns true or false

convoy = function (order) {
    
    if (dislodged(order) === false) {
        return true;
    } else if  (dislodged(order) === true){
        return false;
    } else {
        return;
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
        
        if (geo_check) {
            return true;
        } else if (!geo_check && !order.convoy_dependant) {
            return false;
        } else if (order.convoy_dependant && !order.szykman) {

            var bad_link, undetermined;
            
            _.each(order.convoy_dependant, function (convoy_order) {
                if (convoy_order.result === false) {
                    bad_link = true;
                } else if (!convoy_order.resolved) {
                    undetermined = true;
                }
            });
            
            if (bad_link) {
                var new_path = getConvoyPaths(order, order_list);
                
                if (new_path) {
                    order.convoy_dependant = new_path;
                } else {
                    return false;
                }
                
            } else if (undetermined) {
                return;
            } else {
                return true;
            }
        } else if (order.szykman) {
             return false;
        }
    }
    
};


// dislodged
// ---------
// Returns true or false

dislodged = function (order) {
    var result = false, undetermined;
    
    // Did unit stay in its spot?
    if (order.type !== 'move' || (order.type === 'move' && order.result === false)) {
             
        // Is there another unit attacking with succesful move? 
        _.each(order_list, function (other_order) {
            
            if (other_order.destination.id.substring(0,3) === order.unit.loc.id.substring(0,3) && other_order.type === 'move' &&
                other_order.result === true ) {
                result = true;
            }
            
            if (other_order.destination.id.substring(0,3) === order.unit.loc.id.substring(0,3) && other_order.type === 'move' &&
                !other_order.resolved) {
                undetermined = true;
            }
            
        });
    }
    
    if (result === true) {
        return true;
    } else if (undetermined === true) {
        return;
    } else {
        return false;
    }
};

// hold_strength
// -------------
// Applies to territory, takes territory_id

hold_strength = function (territory_id) {
    
    // If area is empty ...
    if (!game[territory_id].unit) {
        return [0, 0];
    }
    
    // If it contains an unit ordered to move ...
    if (order_list[territory_id].type === 'move') {
        var move_order = order_list[territory_id];

        if (move_order.result === true) {
            return [0, 0];
        } else if (move_order.illegal) {
        
        } else if (move_order.result === false) {
            return [1, 1];
        } else if (!move_order.resolved) {
            return [0, 1];
        }        
    }
    
    // In all other cases, count number of support orders...
    var min = 1, max = 1, order = order_list[territory_id];

    _.each(order_list, function (other_order){
        
        if (other_order.type === 'support_hold' &&
            other_order.partner === order.unit) {
            if (other_order.result === true) {
                min++;
                max++;
            } else if (!other_order.resolved) {
                max++;
            }     
        }
    
    });
    
    return [min, max];
};

// attack_strength
// ---------------

attack_strength = function (order) {
    
    var min = 0, max = 0;
    
    // If no path for a move order ...
    if (order.type === 'move' && path(order) === false) {
        return [0, 0];
    } else if (order.type === 'move' && path(order) === undefined) {
        var potential_convoy_strength = countSupports(order);
        potential_convoy_strength[0] = 0;
        return potential_convoy_strength;
    }
    
    function countSupports (order) {
        min++;
        max++;
        
        var destination_order = order_list[order.destination.id.substring(0,3)];
        
        _.each(order_list, function (other_order) {
            
            if (other_order.type === 'support_move' &&
                other_order.partner === order.unit) {
                    
                if (order.destination.unit) {
                    if (other_order.unit.owner === order.destination.unit.owner &&
                        !(destination_order.type === 'move' && destination_order.result === true)) {
                        return;
                    }
                }
                
                if (other_order.result === true) {
                    min++;
                    max++;
                } else if (!other_order.resolved) {
                    max++;
                }   
            }
            
        });
        
        return [min, max];
    }
    
    // If destination is empty ...
    if (!game[order.destination.id].unit) {
        
        return countSupports(order);
        
    // Else where there is no h2h battle and unit has a move order ... 
    } else if (!order.h2h) {
        return countSupports(order);
    }
    
    // If not and unit destination is of same nationality
    if (order.destination.unit) {
        if (order.destination.unit.owner === order.unit.owner) {
            return [0,0];
        }
    }
    
    // In all other cases ...

    return countSupports(order);
};


// defend_strength
// -------
// Returns integer

defend_strength = function (order) {
    
    var min = 0, max =0;
    
    if (order.type === 'move') {
        min++;
        max++;
        
        _.each(order_list, function (other_order) {
            
            if (other_order.type === 'support_move' &&
                other_order.partner === order.unit) {
                    
                if (other_order.result === true) {
                    min++;
                    max++;
                } else if (!other_order.resolved) {
                    max++;
                }  
            }
        });
        
        return [min, max];
    }
    
    return [0,0];
};

// prevent_strength
// -------
// Returns integer

prevent_strength = function (order) {
    
   var min = 1, max = 1;
        
    if (!path(order)) {
        return [0,0];
    } else if (order.h2h) {
        var destination_order = order_list[order.destination.id.substring(0,3)];
        
        if (destination_order.result === true) {
            return [0,0];
        } else if  (!destination_order.resolved) {
            return;
        }
    }
    
    _.each(order_list, function (other_order) {
        
        if (other_order.type === 'support_move' &&
            other_order.partner === order.unit) {
            
            if (other_order.result === true) {
                min++;
                max++;
            } else if (!other_order.resolved) {
                max++;
            }   
        }
    
    });
    
    return [min, max];
};

// backup
// ------
// Backup rule goodness

backup = function (order_list) {
    
    var convoy_paradox, unresolved_orders = {};
    
    // Build list of unresolved orders, with direct relevancies
    _.each(order_list, function (order, key) {
        if (!order.resolved) {
            getRelevancies(order, order_list);
            unresolved_orders[key] = order;
        }
    });
    
    //
    var unresolved_orders_nums = [];
    _.each(unresolved_orders, function (order, key) {
        order.relevancy_count = _.values(order.relevancies).length;
        var new_order = {};
        new_order[key] = order;
        unresolved_orders_nums.push(new_order);
    });
    
    var size = unresolved_orders_nums.length;
    
    var paradoxCore;
    
    for (var i=0; i<size-2; i++) {
        if (unresolved_orders_nums[i].relevancy_count > unresolved_orders_nums[i+1].relevancy_count) {
            paradoxCore = unresolved_orders_nums[i+1];
        } else {
            paradoxCore= unresolved_orders_nums[i];
        }
    }
    
    console.log('Paradox Core ::', paradoxCore)
    
    _.each(paradoxCore, function (order) {
        _.each(order.relevancies, function (relevancy) {
                if (relevancy.type === "support_move" || relevancy.type === "support_hold") {
                    _.each(relevancy.relevancies, function (rr) {
                        if (rr.convoy_dependant) {
                            convoy_paradox = true;
                        }
                    })
                }
        })
    })
    
    
    if (!convoy_paradox) {
        console.log('No convoy paradox, resolving circular movement...');
        // Circular movement only
        _.each(unresolved_orders, function (order) {
            order.result = true;
            order.resolved = true;
        })
        
        
    } else {
        console.log('Convoy paradox, applying Szykman\'s rule...');
        _.each(paradoxCore, function (order) {
            _.each(order.relevancies, function (relevancy) {
                if (relevancy.type === "support_move" || relevancy.type === "support_hold") {
                    _.each(relevancy.relevancies, function (rr) {
                        if (rr.convoy_dependant) {
                            rr.szykman = true;
                        }
                    })
                }
            })
        })
        
    }
    
};

this.dislodged = dislodged;
this.convoy = convoy;
this.path = path;
this.support = support;
this.move = move;
this.backup = backup;

};

function buildEquations (order_list, game) {
    return new equations(order_list, game);
}

return buildEquations;

});