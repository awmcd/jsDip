define(["underscore"], function (_) {
   
function getConvoyPaths (order, order_list) {
    
    console.log('GetConvoyPaths!')
    
    var paths = [], result;
    
    var first_links = nextLink(order);
    
    _.each(first_links, function (first_link) {
        paths.push([first_link]);
    });
    
    console.log('first links', paths);
    
    function onward (paths) {
        var something_happened;
        
        _.each(paths, function (path) {
            if (_.last(path) === true || _.last(path) === false) {
                return;
            }
            
            var next_links = nextLink(_.last(path));
            
            if (next_links === true) {
                path.push(next_links);
                return;
            }
            
            var length = next_links.length;
            
            if (length === 0) {
                path.push(false);
                return;
            } else {
                something_happened = true;
            }
            
            if (length === 1) {
                path.push(next_links[0]);
            } else {
                _.each(next_links, function (link, key) {
                    if (key+1 !== length) {
                        var new_path = [];
                        
                        _.each(path, function (links) {
                            new_path.push(links);
                        })
                        
                        new_path.push(link);
                        paths.push(new_path)
                    } else {
                        path.push(next_links[0]);
                    }
                })
            }
            
        });
        
        if (something_happened) {
            onward(paths);
        } else {
            return;
        }
    }

    onward(paths);
    console.log(paths);
    
    _.each(paths, function (path, key) {
        if (_.last(path) === false) {
            paths.splice(key)
        } else {
            path.splice(path.length-1)
        }
    })
    
    /**
    _.each(paths, function (path) {
        _.each(paths, function (other_path, key) {
            if (path !== other_path) {
                var intersection = _.intersection(path, other_path)
                if (intersection.length > 0) {
                    paths.splice(key)
                }
            }
            

        })
    })
    **/
    
    if (paths.length > 0) {
        return paths;
    } else {
        return false;
    }
    
    function nextLink (link_order) {
        
        // Are we done?
        var done;
        
        _.each(link_order.unit.loc.adj, function (adj) {
            if (adj === order.destination) {
                done = true;
            }
        });
        
        if (done) {
            console.log('Found a convoy path!')
            result = true;
            return true;
        }
        
        // Look at the last link's adjs for another link
        var new_link =[];
        _.each(link_order.unit.loc.adj, function (adj) {
            var adj_order = order_list[adj.id.substring(0,3)];
            
            //console.log('adj order ', adj_order)
            
            if (adj_order) {
                if (adj_order !== order &&
                    adj_order.type === 'convoy' &&
                    adj_order.partner === order.unit &&
                    adj_order.destination === order.destination &&
                    adj_order.result !== false) {
                        
                        if (!redundant(adj_order)) {
                            new_link.push(adj_order);
                        }
                }
            }
        });
        
        return new_link;
    }
    
    function redundant (new_link) {
        var isRedundant;
        
        _.each(paths, function (existing_link) {
            if (new_link === existing_link) {
                isRedundant = true;
            }
        });
        
        if (isRedundant) {
            return true;
        } else {
            return false;
        }
    }
    
}

return getConvoyPaths;   
   
});