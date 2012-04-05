/**

translateOrder
--------------

Accepts order string(s) and returns  order object(s):

Formatting Guidelines:

1.) Input must be space delimited.
2.) Territories must be referenced with proper id (e.g., "con").
3.) Coasts must be underscore delimited (e.g., "bul_sc").
4.) Move orders must include two territories joined by a hyphen (i.e., "con-bul").
5.) Inclusion of "A" or "F" prefixes are optional. (If not included, order will be issued the unit in specified territory.)
6.) Orders are not case sensitive.
7.) Order types can be specified with a full word (e.g., "convoy") or one letter (e.g., "c").
8.) Explicit convoying (i.e., "via Convoy") can be ordered with adding "vC" to the end of a move order.

Examples of valid input:

    //move
    "A Par-Bre" or "Par-Bre"
    
    //support
    "A Par S F Bre" or "par support bre"
    
    //support move
    "A Par S A Bre-Gas" or "Par s Bre-Gas"
    
    //hold
    "A Par H" or "Par HOLD"
    
    //convoy
    "F Bla C A Ank-Sev" or "Bla C Ank-Sev"
    
    //move with explicit convoy
    "A ank-con vC"

**/

define(["underscore"], function (_) {

function translateOrder (order_string) {
    var order, order_array;
    
    // convert string to lower case letters
    order_string = order_string.toLowerCase();
    
    // break on spaces
    order_array = order_string.split(" ");
    
    // create empty order object
    order = {};
    
    // initialize as unresolved
    order.resolved = false;
    order.result = undefined;
    
    // memorialize original input
    order.input = order_string;
    
    // identify territory in which ordered unit resides
    // (this is kind of tricksy when coasts are used)
    
    (function () {
        var unit;
        
        unit = order_array[0];
        
        if (unit.length > 1) {
            
            // user did not include unit type
            if (unit.split('_').length > 1) {
                if (unit.split('-').length > 1) {
                    order.unit = unit.split('-')[0];
                } else {
                    order.unit = unit.slice(0,3);
                }
                
            } else {
                order.unit = unit.slice(0,3);
            }
            
        } else {
            
            // user has included unit type
            unit = order_array[1];
            
            if (unit.split('_').length > 1) {
                if (unit.split('-').length > 1) {
                    order.unit = unit.split('-')[0];
                } else {
                    order.unit = unit.slice(0,6);
                }
            } else {
                order.unit = unit.slice(0,3);
            }
            
        }
        
    })();
    
    // for move order
    if ((order_array[0].indexOf("-") > 0) || (order_array[1].indexOf("-") > 0)) {
        order.type = "move";
        
        if (order_array[0].indexOf("-") > 0) {
            order.destination = (order_array[0].split("-"))[1];
        } else if (order_array[1].indexOf("-") > 0) {
            order.destination = (order_array[1].split("-"))[1];
        } else {
             order.bug = "Couldn't parse move order.";
        }
        
        // see if an explicit convoy has been ordered
        
        if (order_array[order_array.length-1] === 'vc') {
            order.convoy_explicit = true;
        }
    }
    
    // for hold order
    if (((order_array[1] === "h") || (order_array[2] === "h")) ||
        ((order_array[1] === "hold") || (order_array[2] === "hold"))) {
        order.type = "hold";
        order.destination = order.unit;
        order.resolved = true;
        order.result = true;
    }
    
    // for convoy order
    if (((order_array[1] === "c") || (order_array[2] === "c")) ||
        ((order_array[1] === "convoy") || (order_array[2] === "convoy"))) {
        order.type = "convoy";
        
        (function () {
            var x = order_array.length;
            
            if (order_array[x-1].indexOf("-") > 0) {
                order.partner = (order_array[x-1].split("-"))[0];
                order.destination = (order_array[x-1].split("-"))[1];
            } else if (order_array[x-2].indexOf("-") > 0) {
                order.partner = (order_array[x-2].split("-"))[0];
                order.destination = (order_array[x-2].split("-"))[1];
            } else {
                order.bug = "Couldn't parse convoy order.";
            }
            
        })();
    }
    
    // for support orders
    if (((order_array[1] === "s") || (order_array[2] === "s")) ||
        ((order_array[1] === "support") || (order_array[2] === "support"))) {
        
        (function () {
            var x = order_array.length;
            
            if (order_array[x-1].indexOf("-") > 0) {
                order.type = "support_move";
                order.partner = (order_array[x-1].split("-"))[0];
                order.destination = (order_array[x-1].split("-"))[1];
            } else if (order_array[x-2].indexOf("-") > 0) {
                order.type = "support_move";
                order.partner = (order_array[x-2].split("-"))[0];
                order.destination = (order_array[x-2].split("-"))[1];
            } else {
                if (order_array[x-1].indexOf("-") < 0) {
                    order.type = "support_hold";
                    order.destination = order_array[x-1];
                    order.partner = order.destination;
                } else if (order_array[x-2].indexOf("-") < 0) {
                    order.type = "support_hold";
                    order.destination = order_array[x-2];
                    order.partner = order.destination;
                } else {
                    order.bug = "Couldn't parse support order.";
                }
            }
            
            
        })();
    }
    
    return order;

}

function entry (order_input) {
    
    if (typeof(order_input) === 'string') {
        return translateOrder(order_input);
    } else if (Array.isArray(order_input)) {
        var order_list = {}, bugged_count = 0;
        
        _.each(order_input, function(order) {
            
            // Translate order
            order = translateOrder(order);
            
            // Add to order list, keyed by unit territory
            var unit_loc = order.unit;
            
            if (unit_loc.split("_").length > 1) {
                // If a coast, use order_list key of parent country
                order_list[unit_loc.split("_")[0]] = order;
            } else {
                order_list[order.unit] = order;
            }
            
            // Increment bug count
            if (order.bug) {
                bugged_count++;
            }
            
        });
        
        // **********************
        // CONSOLE REPORTING CODE
        // **********************
        
        //console.log('Order Input Report');
        //console.log('-----------------');
        
        //console.log("Translated " + order_input.length + " orders; " + bugged_count + " bugged.");
        //console.log(order_list);
        //console.log(' ');
        
        return order_list;
    
    } else {
    return 'Invalid input';
}
    
    
}

return entry;

});