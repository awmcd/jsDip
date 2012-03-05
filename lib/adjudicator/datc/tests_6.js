// DATC Tests spec
// http://web.inter.nl.net/users/L.B.Kruijswijk/

define(function () {
    var tests = {
        a1 : {
            id: '6.A.1',
            what: 'MOVING TO AN AREA THAT IS NOT A NEIGHBOUR',
            unit: [['eng', 'F', 'nth']],
            orders: ['F nth-pic'],
            expect: {nth: {result:false}}
        },
        a2 : {
            id: '6.A.2',
            what: 'MOVE ARMY TO SEA',
            unit: [['eng', 'A', 'lvp']],
            orders: ['A lvp-iri'],
            expect: {lvp: {result:false}}
        },
        a3 : {
            id: '6.A.3',
            what: 'MOVE FLEET TO LAND',
            unit: [['ger', 'F', 'kie']],
            orders: ['G kie-mun'],
            expect: {kie: {result:false}}
        },
        a4 : {
            id: '6.A.4',
            what: 'MOVE TO OWN SECTOR',
            unit: [['ger', 'F', 'kie']],
            orders: ['G kie-kie'],
            expect: {kie: {result:false}}
        },
        a5 : {
            id: '6.A.5',
            what: 'MOVE TO OWN SECTOR WITH CONVOY',
            unit: [['eng', 'F', 'nth'], ['eng', 'A', 'yor'], ['eng', 'A', 'lvp'],
                    ['ger', 'F', 'lon'], ['ger', 'A', 'wal']],
            orders: ['F nth C A yor-yor', 'A yor-yor', 'A lvp S A yor-yor',
                     'A lon-yor', 'A wal S F lon-yor'],
            expect: {yor: {result:false,dislodged:true}, lvp: {result:false},
                     lon: {result:true}}
        }
    };
    
    return tests;
});