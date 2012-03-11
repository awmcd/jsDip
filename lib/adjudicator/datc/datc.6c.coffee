define ->
    tests =

        c1:
            id: '6.C.1'
            what: 'THREE ARMY CIRCULAR MOVEMENT'
            unit: [['tur', 'F', 'ank'], ['tur', 'A', 'con'], ['tur', 'A', 'smy']]
            orders: ['F Ank-Con', 'A Con-Smy', 'A Smy-Ank']
            expect:
                ank:
                    result:true
                con:
                    result:true
                smy:
                    result:true
                    
        
        c99:
            id: '6.C.1'
            what: 'TEST'
            unit: [['eng', 'F', 'nwg'], ['ger', 'F', 'ska'], ['ger', 'F', 'nth'],
                   ['rus', 'F', 'nwy']]
            orders: ['F nwg-nth', 'F ska S F nth-nwy', 'F nth-nwy', 'F nwy-nwg']
            expect:
                ska:
                    result:true
                nth:
                    result:true
                nwy:
                    result:true
                nwg:
                    result:true
                    