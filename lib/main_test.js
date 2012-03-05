require(["underscore", "adjudicator/App", "init/init_state", "adjudicator/datc/tests_6",
         "adjudicator/datc/execute_test"],
         function(_, adjudicator, new_game, datc6, execute) {
             
    window._ = _;
    window.jsDip = {};
    var jsDip = window.jsDip;
    jsDip.adjudicator = adjudicator;
    
    jsDip.tests= {};
    jsDip.tests.datc6 = datc6;
    jsDip.tests.execute = execute;
    
    
    jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
    jasmine.getEnv().execute();
});