define(["text!json/std/ref.json", "underscore"], function (clean, _) {
    
    var build_ref = function () {
        
        console.log('Building reference from JSON');
        
        // Parse the JSON data
        var ref = JSON.parse(clean);
        
        // Create an empty game object
        var game = {};
        
        // Populate territory property
        _.each(ref.mapdata, function (country) {
            game[country.id] = country;
        });
        
        // Operationlize adjacencies and de-stringify booleans
        _.each(game, function (country) {
            country.temp_adj = {};
            
            _.each(country.adj, function (adj) {
                country.temp_adj[adj] = game[adj];
            });
            
            country.adj = country.temp_adj;
            delete country.temp_adj;
            
            if (country.center) {
                country.center = true;
            }
        });
        
        return game;
    };
    
    var operational_ref = build_ref();
    
    var output_ref = function () {
        var ref = build_ref();
        return ref;
    };
    
return output_ref;    

});