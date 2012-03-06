require(["adjudicator/App"], function(adjudicator) {
    window.jsDip = {};
    var app = window.jsDip;
    app.adjudicator = adjudicator;
    
    console.log('jsDip: ', app);
});