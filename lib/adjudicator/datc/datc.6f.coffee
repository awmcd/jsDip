define ->
    tests =

        f1:
            id: '6.F.1'
            what: 'NO CONVOY IN COASTAL AREAS'
            orders:
                tur: ['A gre-sev', 'F aeg C A gre-sev', 'A con C A gre-sev', 'F bla C A gre-sev']
            expect:
                gre: result:false
                
        f2:
            id: '6.F.2'
            what: 'AN ARMY BEING CONVOYED CAN BOUNCE AS NORMAL'
            orders:
                eng: ['F eng C A lon-bre', 'A lon-bre']
                fra: ['A par-bre']
            expect:
                lon:
                    result:false
                par:
                    result:false
                    
        f3:
            id: '6.F.3'
            what: 'AN ARMY BEING CONVOYED CAN RECEIVE SUPPORT'
            orders:
                eng: ['F eng C A lon-bre', 'A lon-bre', 'F mid S A lon-bre']
                fra: ['A par-bre']
            expect:
                lon:
                    result:true
                par:
                    result:false
                    
        f4:
            id: '6.F.4'
            what: 'AN ATTACKED CONVOY IS NOT DISRUPTED'
            orders:
                eng: ['F nth C A lon-hol', 'A lon-hol']
                ger: ['F ska-nth']
            expect:
                lon:
                    result:true
                    
        f5:
            id: '6.F.5'
            what: 'A BELEAGUERED CONVOY IS NOT DISRUPTED'
            orders:
                eng: ['F nth C A lon-hol', 'A lon-hol']
                fra: ['F eng-nth', 'F bel S F eng-nth']
                ger: ['F ska-nth', 'F den S F ska-nth']
            expect:
                lon:
                    result:true
                    
        f6:
            id: '6.F.6'
            what: 'DISLODGED CONVOY DOES NOT CUT SUPPORT'
            orders:
                eng: ['F nth C A lon-hol', 'A lon-hol']
                ger: ['A hol S A bel', 'A bel S A hol', 'F hel S F ska-nth', 'F ska-nth']
                fra: ['A pic-bel', 'A bur S A pic-bel']
            expect:
                hol:
                    result:true
                pic:
                    result:false
                    
        #f7 Test Later - involved retreat
        
        f8:
            id: '6.F.8'
            what: 'DISLODGED CONVOY DOES NOT CAUSE A BOUNCE'
            orders:
                eng: ['F nth C A lon-hol', 'A lon-hol']
                ger: ['F hel S F ska-nth', 'F ska-nth', 'A bel-hol']
            expect:
                bel:
                    result:true
                    
        f9:
            id: '6.F.9'
            what: 'DISLODGE OF MULTI-ROUTE CONVOY'
            orders:
                eng: ['F eng C A lon-bel', 'F nth C A lon-bel', 'A lon-bel']
                fra: ['F bre S F mid-eng', 'F mid-eng']
            expect:
                mid:
                    result:true
                eng:
                    dislodged:true
                lon:
                    result:true
                    
        f10:
            id: '6.F.10'
            what: 'DISLODGE OF MULTI-ROUTE CONVOY WITH FOREIGN FLEET'
            orders:
                eng: ['F nth C A lon-bel', 'A lon-bel']
                ger: ['F eng C A lon-bel']
                fra: ['F bre S F mid-eng', 'F mid-eng']
            expect:
                lon:
                    result:true
                    
        f11:
            id: '6.F.11'
            what: 'DISLODGE OF MULTI-ROUTE CONVOY WITH ONLY FOREIGN FLEETS'
            orders:
                eng: ['A lon-bel']
                ger: ['F eng C A lon-bel']
                rus: ['f nth C A lon-bel']
                fra: ['F bre S F mid-eng', 'F mid-eng']
            expect:
                lon:
                    result:true
                    
        f12:
            id: '6.F.12'
            what: 'DISLODGED CONVOYING FLEET NOT ON ROUTE'
            orders:
                eng: ['F eng C A lon-bel', 'A lon-bel', 'F iri C A lon-bel']
                fra: ['F nat S F mid-iri', 'F mid-iri']
            expect:
                lon:
                    result:true
                    
        f13:
            id: '6.F.13'
            what: 'THE UNWANTED ALTERNATIVE'
            orders:
                eng: ['A lon-bel', 'F nth C A lon-bel']
                fra: ['F eng C A lon-bel']
                ger:['F hol S F den-nth', 'F den-nth']
            expect:
                lon:
                    result:true
                nth:
                    dislodged:true

        f14:
            id: '6.F.14'
            what: 'SIMPLE CONVOY PARADOX'
            orders:
                eng: ['F lon S F wal-eng', 'F wal-eng']
                fra: ['A bre-lon', 'F eng C A bre-lon']
            expect:
                eng:
                    dislodged:true
                    
        f15:
            id: '6.F.15'
            what: 'SIMPLE CONVOY PARADOX WITH ADDITIONAL CONVOY'
            orders:
                eng: ['F lon S F wal-eng', 'F wal-eng']
                fra: ['A bre-lon', 'F eng C A bre-lon']
                ita: ['F iri C A naf-wal', 'F mid C A naf-wal', 'A naf-wal']
            expect:
                wal:
                    result:true
                naf:
                    result:true
                    
        f16:
            id: '6.F.16'
            what: 'PANDIN\'S PARADOX'
            orders:
                eng: ['F lon S F wal-eng', 'F wal-eng']
                fra: ['A bre-lon', 'F eng C A bre-lon']
                ita: ['F nth S F bel-eng', 'F bel-eng']
            expect:
                lon:
                    result:true
                wal:
                    result:false
                bre:
                    result:false
                bel:
                    result:false
                    
        f17:
            id: '6.F.17'
            what: 'PANDIN\'S EXTENDED PARADOX'
            orders:
                eng: ['F lon S F wal-eng', 'F wal-eng']
                fra: ['A bre-lon', 'F eng C A bre-lon', 'F yor S A bre-lon']
                ita: ['F nth S F bel-eng', 'F bel-eng']
            expect:
                bre:
                    result:false
                wal:
                    result:false
                bel:
                    result:false
                    
        f18:
            id: '6.F.18'
            what: 'BETRAYAL PARADOX'
            orders:
                eng: ['F nth C A lon-bel', 'A lon-bel', 'F eng S A lon-bel']
                fra: ['F Bel S F nth']
                ita: ['F hel S F ska-nth', 'F ska-nth']
            expect:
                lon:
                    result: false
                ska:
                    result: false
                    
        f19:
            id: '6.F.19'
            what: 'MULTI-ROUTE CONVOY DISRUPTION PARADOX'
            orders:
                eng: ['A tun-nap', 'F ion C A tun-nap', 'F tyn C A tun-nap']
                ita: ['F nap S F rom-tyn', 'F rom-tyn']
            expect:
                nap:
                    result: false
                rom:
                    result: false