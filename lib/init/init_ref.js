define(["text!json/std/ref.json", "underscore"], function (ref, _) {
    
    // Parse the JSON data
    var ref = JSON.parse(ref);
    
    // Create an empty game object
    var game = {};
    
    // Create an empty 'territory' property
    game.t = {};
    
    // Populate territory property
    _.each(ref.mapdata, function (country) {
        game.t[country.id] = country;
    });
    
    // Operationlize adjacencies and de-stringify booleans
    _.each(game.t, function (country) {
        country.temp_adj = {};
        
        _.each(country.adj, function (adj) {
            country.temp_adj[adj] = game.t[adj];
        });
        
        country.adj = country.temp_adj;
        delete country.temp_adj;
        
        if (country.center) {
            country.center = true;
        }
    });
    
    return game.t;
});