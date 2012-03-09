define(["underscore"], function (_) {
    
function init_game (ref, state) {
    
    // For each power...
    
    _.each(state.board, function (power) {
        
        // Assign ownership
        _.each(power.owns, function (country) {
            ref[country].owner = power.id;
        });
        
        // Drop in units
        _.each(power.units, function (unit) {
            var type = unit[0], loc = unit[1], new_unit;
            
            new_unit = {
                type: type,
                loc: ref[loc],
                owner: power.id
            };
            
            ref[loc].unit = new_unit;
        });
        
        
    });
    
    var game = ref;
    
    return game;

}

    return init_game;
    
});