describe("DATC Tests Init", function () {

    it("Found DATC Test Library", function () {
        
    });

    it("Found DATC Test Executer", function () {
        
    });
});

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
            tests = jsDip.tests.datc6a;
        });
            
        it('6.A.1: MOVING TO AN AREA THAT IS NOT A NEIGHBOUR', function () {
            var test = tests.a1;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.A.2: MOVE ARMY TO SEA', function () {
            var test = tests.a2;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.A.3: MOVE FLEET TO LAND', function () {
            var test = tests.a3;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.A.4: MOVE TO OWN SECTOR', function () {
            var test = tests.a4;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.A.5: MOVE TO OWN SECTOR WITH CONVOY', function () {
            var test = tests.a5;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
                
        it('6.A.7: ONLY ARMIES CAN BE CONVOYED', function () {
            var test = tests.a7;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.A.8: SUPPORT TO HOLD YOURSELF IS NOT POSSIBLE', function () {
            var test = tests.a8;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.A.9: FLEETS MUST FOLLOW COAST IF NOT ON SEA', function () {
            var test = tests.a9;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
    
        it('6.A.10: SUPPORT ON UNREACHABLE DESTINATION NOT POSSIBLE', function () {
            var test = tests.a10;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.A.11: SIMPLE BOUNCE', function () {
            var test = tests.a11;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.A.12: BOUNCE OF THREE UNITS', function () {
            var test = tests.a12;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
    });
    
    describe("COASTAL ISSUES", function () {
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
            tests = jsDip.tests.datc6b;
        });
        
        it('6.B.1: MOVING WITH UNSPECIFIED COAST WHEN COAST IS NECESSARY', function () {
            var test = tests.b1;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.B.2: MOVING WITH UNSPECIFIED COAST WHEN COAST IS NOT NECESSARY', function () {
            var test = tests.b2;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.B.3: MOVING WITH WRONG COAST WHEN COAST IS NOT NECESSARY', function () {
            var test = tests.b3;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.B.4: SUPPORT TO UNREACHABLE COAST ALLOWED', function () {
            var test = tests.b4;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.B.5: SUPPORT FROM UNREACHABLE COAST NOT ALLOWED', function () {
            var test = tests.b5;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.B.6: SUPPORT CAN BE CUT WITH OTHER COAST', function () {
            var test = tests.b6;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.B.7: SUPPORTING WITH UNSPECIFIED COAST', function () {
            var test = tests.b7;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.B.8: SUPPORTING WITH UNSPECIFIED COAST WHEN ONLY ONE COAST IS POSSIBLE', function () {
            var test = tests.b8;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.B.9: SUPPORTING WITH WRONG COAST', function () {
            var test = tests.b9;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.B.10: UNIT ORDERED WITH WRONG COAST', function () {
            var test = tests.b10;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.B.11: COAST CAN NOT BE ORDERED TO CHANGE', function () {
            var test = tests.b11;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.B.12: ARMY MOVEMENT WITH COASTAL SPECIFICATION', function () {
            var test = tests.b12;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.B.13: COASTAL CRAWL NOT ALLOWED', function () {
            var test = tests.b13;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
    });
});