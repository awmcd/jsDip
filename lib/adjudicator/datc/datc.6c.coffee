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
                    
        c2:
            id: '6.C.2'
            what: 'THREE ARMY CIRCULAR MOVEMENT WITH SUPPORT'
            unit: [['tur', 'F', 'ank'], ['tur', 'A', 'con'], ['tur', 'A', 'smy'],
                   ['tur', 'A', 'bul']]
            orders: ['F Ank-Con', 'A Con-Smy', 'A Smy-Ank', 'A Bul S F Ank-Con']
            expect:
                ank:
                    result:true
                con:
                    result:true
                smy:
                    result:true
                bul:
                    result:true
                    
        c3:
            id: '6.C.3'
            what: 'A DISRUPTED THREE ARMY CIRCULAR MOVEMENT'
            unit: [['tur', 'F', 'ank'], ['tur', 'A', 'con'], ['tur', 'A', 'smy'],
                   ['tur', 'A', 'bul']]
            orders: ['F Ank-Con', 'A Con-Smy', 'A Smy-Ank', 'A Bul-Con']
            expect:
                ank:
                    result:false
                con:
                    result:false
                smy:
                    result:false
                bul:
                    result:false
        
        # UNFINISHED!