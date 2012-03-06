require(["adjudicator/App", "init/init_ref"], function(adjudicator, init_ref) {
    window.jsDip = {};
    var app = window.jsDip;
    app.init = {};

    app.adjudicator = adjudicator;
    app.init.init_ref = init_ref;
    
    console.log('jsDip: ', app);
});