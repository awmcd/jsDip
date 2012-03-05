describe("DATC Tests Init", function () {

    it("Found DATC Test Library", function () {
        expect(jsDip.tests).toNotEqual(undefined);
    });

    it("Found DATC Test Executer", function () {
        expect(jsDip.tests.execute).toNotEqual(undefined);
    });
});

describe("DATC Tests [BASIC CHECKS]", function () {
    var tests;

    var report = function (results, test) {
        if (results) {
            console.log(results);
        } else {
            console.log('----- ', test.id, ' ', test.what);
            console.log('-------- PASSED!');
            console.log(' ');
        }
    }
    
    beforeEach(function () {
        tests = jsDip.tests.datc6;
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
    
});