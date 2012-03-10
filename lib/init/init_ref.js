define(["text!json/std/ref.json", "underscore"], function (clean, _) {
    
    var build_ref = function () {
        
        // Parse the JSON data
        var ref = JSON.parse(clean);
        
        // Create an empty game object
        var game = {};
        
        // Populate territory property
        _.each(ref.mapdata, function (country) {
            game[country.id] = country;
        });
        
        // Operationlize adjacencies, de-stringify booleans
        _.each(game, function (country) {
            country.temp_adj = {};
            
            _.each(country.adj, function (adj) {
                
                if (game[adj]) {
                    country.temp_adj[adj] = game[adj];
                } else {
                    // Operationalize coast adjacency
                    var split = adj.split("_"),
                        location = split[0],
                        coast = split[1];
                        
                    country.temp_adj[adj] = game[location].coasts[coast];
                }
                
            });
            
            country.adj = country.temp_adj;
            delete country.temp_adj;
            
            if (country.coasts) {
                
                _.each(country.coasts, function (coast) {
                    country.temp_adj = {};
                    
                    _.each(coast.adj, function (adj) {
                        country.temp_adj[adj] = game[adj];
                    });
                    
                    coast.adj = country.temp_adj;
                    delete country.temp_adj;
                    
                    // CREATE SUBCOAST SHORTCUT TO PARENT
                    coast.subcoast = game[coast.subcoast];
                });
                
                // CREATE COAST SHORTCUTS AT ROOT 
                _.each(country.coasts, function (coast){
                    var coast_id = coast.id.split('_')[1];
                    game[coast.id] = game[country.id].coasts[coast_id];
                });
            }

            if (country.center) {
                country.center = true;
            }
        });
        
        return game;
    };
    
    var output_ref = function () {
        var ref = build_ref();
        return ref;
    };
    
return output_ref;    

});