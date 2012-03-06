var requirejs = require('requirejs');

requirejs.config({
    baseUrl: "lib",
    nodeRequire: require
});

var adjudicator;

requirejs(['adjudicator/App'],
    function   (delivery) {
    adjudicator = delivery;
});

console.log('Adjduciator: ', adjudicator);