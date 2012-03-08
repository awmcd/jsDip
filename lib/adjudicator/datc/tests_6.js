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
        },
        //test 6.A.6 is not applicable to this implementation,
        a7 : {
            id: '6.A.7',
            what: 'ONLY ARMIES CAN BE CONVOYED',
            unit: [['eng', 'F', 'lon'], ['eng', 'F', 'nth']],
            orders: ['F lon-bel', 'F nth C A lon-bel'],
            expect: {lon: {result:false}}
        },
        a8 : {
            id: '6.A.8',
            what: 'SUPPORT TO HOLD YOURSELF IS NOT POSSIBLE',
            unit: [['ita', 'A', 'ven'], ['ita', 'A', 'tyr'], ['aus', 'F', 'tri']],
            orders: ['A ven-tri', 'A tyr S A ven-tri', 'F tri S F tri'],
            expect: {tri: {dislodged:true}}
        },
        a9 : {
            id: '6.A.9',
            what: 'FLEETS MUST FOLLOW COAST IF NOT ON SEA',
            unit: [['ita', 'F', 'rom']],
            orders: ['F rom-ven'],
            expect: {rom: {result:false}}
        },
        a10 : {
            id: '6.A.10',
            what: 'SUPPORT ON UNREACHABLE DESTINATION NOT POSSIBLE',
            unit: [['aus', 'A', 'ven'], ['ita', 'F', 'rom'], ['ita', 'A', 'apu']],
            orders: ['A ven H', 'F Rom A Apu-Ven', 'A Apu-Ven'],
            expect: {rom: {result:false}}
        },
        a11 : {
            id: '6.A.11',
            what: 'SIMPLE BOUNCE',
            unit: [['aus', 'A', 'vie'], ['ita', 'A', 'ven']],
            orders: ['A vie-tyr', 'A ven-tyr'],
            expect: {vie: {result:false}, ven: {result:false}}
        }
    };
    
    return tests;
});