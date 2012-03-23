require(["underscore", "adjudicator/App", "init/init_ref", "adjudicator/datc/execute_test",
         "cs!adjudicator/datc/datc.6a", "cs!adjudicator/datc/datc.6b",
         "cs!adjudicator/datc/datc.6c", "cs!adjudicator/datc/datc.6d",
         "cs!adjudicator/datc/datc.6e","cs!adjudicator/datc/datc.6f"],
         function(_, adjudicator, init_ref, execute, datc6a, datc6b, datc6c, datc6d, datc6e, datc6f) {
             
    window._ = _;
    window.jsDip = {};
    var jsDip = window.jsDip;
    jsDip.adjudicator = adjudicator;
    jsDip.init_ref = init_ref;
    
    jsDip.tests = {};
    jsDip.tests.datc6a = datc6a;
    jsDip.tests.datc6b = datc6b;
    jsDip.tests.datc6c = datc6c;
    jsDip.tests.datc6d = datc6d;
    jsDip.tests.datc6e = datc6e;
    jsDip.tests.datc6f = datc6f

    jsDip.tests.execute = execute;
    
    
    jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
    jasmine.getEnv().execute();
});