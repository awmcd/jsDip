require(["adjudicator/App", "util/translateOrders", "init/init_ref",
        "cs!adjudicator/datc/datc.6a"],
        function(adjudicator, translateOrder, init_ref) {
    window.jsDip = {};
    var app = window.jsDip;
    app.util = {};
    
    app.adjudicator = adjudicator;
    app.util.translateOrders = translateOrder;
    app.util.initRef = init_ref;
    
    console.log('jsDip: ', app);
});