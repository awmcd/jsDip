require(["underscore", "adjudicator/App", "init/init_ref", "adjudicator/datc/execute_test",
         "cs!adjudicator/datc/datc.6a", "cs!adjudicator/datc/datc.6b"],
         function(_, adjudicator, init_ref, execute, datc6a, datc6b ) {
             
    window._ = _;
    window.jsDip = {};
    var jsDip = window.jsDip;
    jsDip.adjudicator = adjudicator;
    jsDip.init_ref = init_ref;
    
    jsDip.tests= {};
    jsDip.tests.datc6a = datc6a;
    jsDip.tests.datc6b = datc6b;

    jsDip.tests.execute = execute;
    
    
    jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
    jasmine.getEnv().execute();
});