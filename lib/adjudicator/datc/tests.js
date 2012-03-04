// DATC Tests spec
// http://web.inter.nl.net/users/L.B.Kruijswijk/

define(function () {
    var tests = [
        {
            id: '6.A.1',
            what: 'MOVING TO AN AREA THAT IS NOT A NEIGHBOUR',
            unit: [['Eng', 'F', 'nth']],
            orders: [['F nth-pic', {result:false}]]
        },
        {
            id: '6.A.2',
            what: 'MOVE ARMY TO SEA',
            unit: [['Eng', 'A', 'liv']],
            orders: [['F liv-iri', {result:false}]]
        }
    ];
    
    return tests;
});