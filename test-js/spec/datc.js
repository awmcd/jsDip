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
    
    describe("CIRCULAR MOVEMENT", function () {
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
            tests = jsDip.tests.datc6c;
        });
        
        it('6.C.1: THREE ARMY CIRCULAR MOVEMENT', function () {
            var test = tests.c1;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.C.2: THREE ARMY CIRCULAR MOVEMENT WITH SUPPORT', function () {
            var test = tests.c2;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.C.3: A DISRUPTED THREE ARMY CIRCULAR MOVEMENT', function () {
            var test = tests.c3;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.C.4: A CIRCULAR MOVEMENT WITH ATTACKED CONVOY', function () {
            var test = tests.c4;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.C.5: A DISRUPTED CIRCULAR MOVEMENT DUE TO DISLODGED CONVOY', function () {
            var test = tests.c5;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.C.6: TWO ARMIES WITH CONVOYS', function () {
            var test = tests.c6;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.C.7: DISRUPTED UNIT SWAP', function () {
            var test = tests.c7;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
    });

describe("SUPPORTS AND DISLODGES", function () {
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
            tests = jsDip.tests.datc6d;
        });

        it('6.D.1: SUPPORTED HOLD CAN PREVENT DISLODGEMENT', function () {
            var test = tests.d1;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.D.2: A MOVE CUTS SUPPORT ON HOLD', function () {
            var test = tests.d2;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.D.3: A MOVE CUTS SUPPORT ON MOVE', function () {
            var test = tests.d3;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.D.4: SUPPORT TO HOLD ON UNIT SUPPORTING A HOLD ALLOWED', function () {
            var test = tests.d4;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });

        
        it('6.D.5: SUPPORT TO HOLD ON UNIT SUPPORTING A MOVE ALLOWED', function () {
            var test = tests.d5;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.D.6: SUPPORT TO HOLD ON CONVOYING UNIT ALLOWED', function () {
            var test = tests.d6;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.D.7: SUPPORT TO HOLD ON MOVING UNIT NOT ALLOWED', function () {
            var test = tests.d7;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.D.8: FAILED CONVOY CAN NOT RECEIVE HOLD SUPPORT', function () {
            var test = tests.d8;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.D.9: SUPPORT TO MOVE ON HOLDING UNIT NOT ALLOWED', function () {
            var test = tests.d9;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.D.10: SELF DISLODGMENT PROHIBITED', function () {
            var test = tests.d10;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.D.11: NO SELF DISLODGMENT OF RETURNING UNIT', function () {
            var test = tests.d11;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.D.12: SUPPORTING A FOREIGN UNIT TO DISLODGE OWN UNIT PROHIBITED', function () {
            var test = tests.d12;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.D.13: SUPPORTING A FOREIGN UNIT TO DISLODGE A RETURNING OWN UNIT PROHIBITED', function () {
            var test = tests.d13;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.D.14: SUPPORTING A FOREIGN UNIT IS NOT ENOUGH TO PREVENT DISLODGEMENT', function () {
            var test = tests.d14;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.D.15: DEFENDER CAN NOT CUT SUPPORT FOR ATTACK ON ITSELF', function () {
            var test = tests.d15;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.D.16: CONVOYING A UNIT DISLODGING A UNIT OF SAME POWER IS ALLOWED', function () {
            var test = tests.d16;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.D.17: CONVOYING A UNIT DISLODGING A UNIT OF SAME POWER IS ALLOWED', function () {
            var test = tests.d17;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.D.18: A SURVIVING UNIT WILL SUSTAIN SUPPORT', function () {
            var test = tests.d18;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.D.19: EVEN WHEN SURVIVING IS IN ALTERNATIVE WAY', function () {
            var test = tests.d19;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.D.20: UNIT CAN NOT CUT SUPPORT OF ITS OWN COUNTRY', function () {
            var test = tests.d20;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.D.21: DISLODGING DOES NOT CANCEL A SUPPORT CUT', function () {
            var test = tests.d21;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.D.22: IMPOSSIBLE FLEET MOVE CAN NOT BE SUPPORTED', function () {
            var test = tests.d22;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.D.23: IMPOSSIBLE COAST MOVE CAN NOT BE SUPPORTED', function () {
            var test = tests.d23;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.D.24: IMPOSSIBLE ARMY MOVE CAN NOT BE SUPPORTED', function () {
            var test = tests.d24;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.D.25: FAILING HOLD SUPPORT CAN BE SUPPORTED', function () {
            var test = tests.d25;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.D.26: FAILING MOVE SUPPORT CAN BE SUPPORTED', function () {
            var test = tests.d26;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.D.27: FAILING CONVOY CAN BE SUPPORTED', function () {
            var test = tests.d27;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.D.28: IMPOSSIBLE MOVE AND SUPPORT', function () {
            var test = tests.d28;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.D.29: MOVE TO IMPOSSIBLE COAST AND SUPPORT', function () {
            var test = tests.d29;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.D.30: MOVE WITHOUT COAST AND SUPPORT', function () {
            var test = tests.d29;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.D.32: A MISSING FLEET', function () {
            var test = tests.d32;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.D.33: UNWANTED SUPPORT ALLOWED', function () {
            var test = tests.d33;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.D.34: SUPPORT TARGETING OWN AREA NOT ALLOWED', function () {
            var test = tests.d34;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
    });
    
    describe("HEAD TO HEAD BATTLES AND BELEAGUERED GARRISON", function () {
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
            tests = jsDip.tests.datc6e;
        });
        
        it('6.E.1:DISLODGED UNIT HAS NO EFFECT ON ATTACKERS AREA', function () {
            var test = tests.e1;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.E.2:NO SELF DISLODGEMENT IN HEAD TO HEAD BATTLE', function () {
            var test = tests.e2;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.E.3:NO HELP IN DISLODGING OWN UNIT', function () {
            var test = tests.e3;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.E.4:NON-DISLODGED LOSER HAS STILL EFFECT', function () {
            var test = tests.e4;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.E.5:LOSER DISLODGED BY ANOTHER ARMY HAS STILL EFFECT', function () {
            var test = tests.e5;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.E.6:NOT DISLODGE BECAUSE OF OWN SUPPORT HAS STILL EFFECT', function () {
            var test = tests.e6;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.E.7:NO SELF DISLODGEMENT WITH BELEAGUERED GARRISON', function () {
            var test = tests.e7;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.E.8:NO SELF DISLODGEMENT WITH BELEAGUERED GARRISON AND HEAD TO HEAD BATTLE', function () {
            var test = tests.e8;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.E.9:ALMOST SELF DISLODGEMENT WITH BELEAGUERED GARRISON', function () {
            var test = tests.e9;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.E.10:ALMOST CIRCULAR MOVEMENT WITH NO SELF DISLODGEMENT WITH BELEAGUERED GARRISON', function () {
            var test = tests.e10;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.E.11:NO SELF DISLODGEMENT WITH BELEAGUERED GARRISON, UNIT SWAP WITH ADJACENT CONVOYING AND TWO COASTS', function () {
            var test = tests.e11;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.E.12:SUPPORT ON ATTACK ON OWN UNIT CAN BE USED FOR OTHER MEANS', function () {
            var test = tests.e12;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.E.13:THREE WAY BELEAGUERED GARRISON', function () {
            var test = tests.e13;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.E.14:ILLEGAL HEAD TO HEAD BATTLE CAN STILL DEFEND', function () {
            var test = tests.e14;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.E.15:THE FRIENDLY HEAD TO HEAD BATTLE', function () {
            var test = tests.e15;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
    });
    
    describe("CONVOYS", function () {
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
            tests = jsDip.tests.datc6f;
        });
        
        it('6.F.1:NO CONVOY IN COASTAL AREAS', function () {
            var test = tests.f1;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.F.2:AN ARMY BEING CONVOYED CAN BOUNCE AS NORMAL', function () {
            var test = tests.f2;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.F.3:AN ARMY BEING CONVOYED CAN RECEIVE SUPPORT', function () {
            var test = tests.f3;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.F.4:AN ATTACKED CONVOY IS NOT DISRUPTED', function () {
            var test = tests.f4;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.F.5:A BELEAGUERED CONVOY IS NOT DISRUPTED', function () {
            var test = tests.f5;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.F.6:DISLODGED CONVOY DOES NOT CUT SUPPORT', function () {
            var test = tests.f6;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.F.8:DISLODGED CONVOY DOES NOT CAUSE A BOUNCE', function () {
            var test = tests.f8;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.F.9:DISLODGE OF MULTI-ROUTE CONVOY', function () {
            var test = tests.f9;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.F.10:DISLODGE OF MULTI-ROUTE CONVOY WITH FOREIGN FLEET', function () {
            var test = tests.f10;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.F.11:DISLODGE OF MULTI-ROUTE CONVOY WITH ONLY FOREIGN FLEETS', function () {
            var test = tests.f11;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.F.12:DISLODGED CONVOYING FLEET NOT ON ROUTE', function () {
            var test = tests.f12;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.F.13:THE UNWANTED ALTERNATIVE', function () {
            var test = tests.f13;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.F.14:SIMPLE CONVOY PARADOX', function () {
            var test = tests.f14;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.F.15:SIMPLE CONVOY PARADOX WITH ADDITIONAL CONVOY', function () {
            var test = tests.f15;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.F.16:PANDIN\'S PARADOX', function () {
            var test = tests.f16;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.F.17:PANDIN\'S EXTENDED PARADOX', function () {
            var test = tests.f17;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.F.18:BETRAYAL PARADOX', function () {
            var test = tests.f18;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.F.19:MULTI-ROUTE CONVOY DISRUPTION PARADOX', function () {
            var test = tests.f19;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.F.20:UNWANTED MULTI-ROUTE CONVOY PARADOX', function () {
            var test = tests.f20;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.F.21:DAD\'S ARMY CONVOY', function () {
            var test = tests.f21;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.F.22:SECOND ORDER PARADOX WITH TWO RESOLUTIONS', function () {
            var test = tests.f22;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.F.23:SECOND ORDER PARADOX WITH TWO EXCLUSIVE CONVOYS', function () {
            var test = tests.f23;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.F.24:SECOND ORDER PARADOX WITH NO RESOLUTION', function () {
            var test = tests.f23;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
    });
    
    describe("CONVOYING TO ADJACENT PLACES", function () {
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
            tests = jsDip.tests.datc6g;
        });
        
        it('6.G.1:TWO UNITS CAN SWAP PLACES BY CONVOY', function () {
            var test = tests.g1;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.G.2:KIDNAPPING AN ARMY', function () {
            var test = tests.g2;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.G.3:KIDNAPPING WITH A DISRUPTED CONVOY', function () {
            var test = tests.g3;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.G.4:KIDNAPPING WITH A DISRUPTED CONVOY AND OPPOSITE MOVE', function () {
            var test = tests.g4;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.G.5:SWAPPING WITH INTENT', function () {
            var test = tests.g5;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.G.6:SWAPPING WITH UNINTENDED INTENT', function () {
            var test = tests.g6;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.G.7:SWAPPING WITH ILLEGAL INTENT', function () {
            var test = tests.g7;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.G.8:EXPLICIT CONVOY THAT ISN\'T THERE', function () {
            var test = tests.g8;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.G.9:SWAPPED OR DISLODGED?', function () {
            var test = tests.g9;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.G.10:SWAPPED OR AN HEAD TO HEAD BATTLE?', function () {
            var test = tests.g10;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.G.11:A CONVOY TO AN ADJACENT PLACE WITH A PARADOX', function () {
            var test = tests.g11;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.G.12:SWAPPING TWO UNITS WITH TWO CONVOYS', function () {
            var test = tests.g12;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.G.13:SUPPORT CUT ON ATTACK ON ITSELF VIA CONVOY', function () {
            var test = tests.g13;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.G.14:BOUNCE BY CONVOY TO ADJACENT PLACE', function () {
            var test = tests.g14;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.G.15:BOUNCE AND DISLODGE WITH DOUBLE CONVOY', function () {
            var test = tests.g15;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.G.16:THE TWO UNIT IN ONE AREA BUG, MOVING BY CONVOY', function () {
            var test = tests.g16;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.G.17:THE TWO UNIT IN ONE AREA BUG, MOVING OVER LAND', function () {
            var test = tests.g17;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
        
        it('6.G.18:THE TWO UNIT IN ONE AREA BUG, WITH DOUBLE CONVOY', function () {
            var test = tests.g18;
            var results = jsDip.tests.execute(test);
            report(results, test);
            expect(results).toEqual(false);
        });
    });
});