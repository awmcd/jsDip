define ->
    tests =

        c1:
            id: '6.C.1'
            what: 'THREE ARMY CIRCULAR MOVEMENT'
            orders:
                tur: ['F Ank-Con', 'A Con-Smy', 'A Smy-Ank']
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
            orders:
                tur: ['F Ank-Con', 'A Con-Smy', 'A Smy-Ank', 'A Bul S F Ank-Con']
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
            orders:
                tur: ['F Ank-Con', 'A Con-Smy', 'A Smy-Ank', 'A Bul-Con']
            expect:
                ank:
                    result:false
                con:
                    result:false
                smy:
                    result:false
                bul:
                    result:false
        
        c4:
            id: '6.C.4'
            what: 'A CIRCULAR MOVEMENT WITH ATTACKED CONVOY'
            orders:
                aus: ['A tri-ser', 'A ser-bul']
                tur: ['A bul-tri', 'F aeg C A bul-tri', 'F ion C A bul-tri', 'F adr C A bul-tri']
                ita: ['F nap-ion']
            expect:
                nap:
                    result:false
                tri:
                    result:true
                ser:
                    result:true
                bul:
                    result:true
                    
        c5:
            id: '6.C.5'
            what: 'A DISRUPTED CIRCULAR MOVEMENT DUE TO DISLODGED CONVOY'
            orders:
                aus: ['A tri-ser', 'A ser-bul']
                tur: ['A bul-tri', 'F aeg C A bul-tri', 'F ion C A bul-tri', 'F adr C A bul-tri']
                ita: ['F nap-ion', 'F tun S F nap-ion']
            expect:
                ion:
                    dislodged:true
                tri:
                    result:false
                ser:
                    result:false
                bul:
                    result:false
                    
        c6:
            id: '6.C.6'
            what: 'TWO ARMIES WITH TWO CONVOYS'
            orders:
                eng: ['F nth C A lon-bel', 'A lon-bel']
                fra: ['F eng C A bel-lon', 'A bel-lon']
            expect:
                nth:
                    result:true
                lon:
                    result:true
                eng:
                    result:true
                bel:
                    result:true
                    
        c7:
            id: '6.C.7'
            what: 'DISRUPTED UNIT SWAP'
            orders:
                eng: ['F nth C A lon-bel', 'A lon-bel']
                fra: ['F eng C A bel-lon', 'A bel-lon', 'a bur-bel']
            expect:
                lon:
                    result:false
                bel:
                    result:false
                bur:
                    result:false
                    