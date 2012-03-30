describe("DATC Tests", function () {

    describe("BASIC TESTS", function () {
        var tests;
    
        var report = function (results, test6a) {
            if (results) {
                console.log(results);
                console.log('----- ', test6a.id, ' ', test6a.what);
                console.log('-------- FFFFFFFFFFFFFAAIILL!');
                console.log('-----------------------------');
                console.log(' ');
            } else {
                console.log('----- Passed: ', test6a.id, ' ', test6a.what);
                console.log(' ');
                console.log(' ');
            }
        }
        
        beforeEach(function () {
            tests = jsDip.tests.mytests;
        });
            
        it('CONVOYZZ', function () {
            var test = tests.t1;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
    });
    
});