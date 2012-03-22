define ->
    tests =

        e1:
            id: '6.E.1'
            what: 'DISLODGED UNIT HAS NO EFFECT ON ATTACKERS AREA'
            orders:
                ger: ['A ber-pru', 'F kie-ber', 'A sil S A ber-pru']
                rus: ['A pru-ber']
            expect:
                kie: result:true
                
        e2:
            id: '6.E.2'
            what: 'NO SELF DISLODGEMENT IN HEAD TO HEAD BATTLE'
            orders:
                ger: ['A ber-kie', 'F kie-ber', 'A mun S A ber-kie']
                rus: ['A pru-ber']
            expect:
                kie:
                    result:false
                ber:
                    result:false
                
        e3:
            id: '6.E.3'
            what: 'NO HELP IN DISLODGING OWN UNIT'
            orders:
                ger: ['A ber-kie', 'A mun S F kie-ber']
                eng: ['F kie-ber']
            expect:
                kie:
                    result:false
                ber:
                    result:false
                    
        e4:
            id: '6.E.4'
            what: 'NON-DISLODGED LOSER STILL HAS EFFECT'
            orders:
                ger: ['F hol-nth', 'F hel S F hol-nth', 'F ska S F hol-nth']
                fra: ['F nth-hol', 'F bel S F nth-hol']
                eng: ['F edi S F nwg-nth', 'F yor S F nwg-nth','F nwg-nth']
                aus: ['A kie S A ruh-hol', 'A ruh-hol']
            expect:
                ruh:
                    result:false
                    
        e5:
            id: '6.E.5'
            what: 'LOSER DISLODGED BY ANOTHER ARMY STILL HAS EFFECT'
            orders:
                ger: ['F hol-nth', 'F hel S F hol-nth', 'F ska S F hol-nth']
                fra: ['F nth-hol', 'F bel S F nth-hol']
                eng: ['F edi S F nwg-nth', 'F yor S F nwg-nth', 'F nwg-nth', 'F lon S F nwg-nth']
                aus: ['A kie S A ruh-hol', 'A ruh-hol']
            expect:
                nth:
                    dislodged:true
                ruh:
                    result:false
                    
        e6:
            id: '6.E.6'
            what: 'NOT DISLODGE BECAUSE OWN SUPPORT STILL HAS EFFECT'
            orders:
                ger: ['F hol-nth', 'F hel S F hol-nth']
                fra: ['F nth-hol', 'F bel S F nth-hol', 'F eng S F hol-nth']
                aus: ['A kie S A ruh-hol', 'A ruh-hol']
            expect:
                ruh:
                    result:false
                    
        e7:
            id: '6.E.7'
            what: 'NO SELF DISLODGEMENT WITH BELEAGUERED GARRISON'
            orders:
                eng: ['F nth H', 'F yor S F nwy-nth']
                ger: ['F hol S F hel-nth', 'F hel-nth']
                rus: ['F ska S F nwy-nth', 'F nwy-nth']
            expect:
                nwy:
                    result:false
                    
        e8:
            id: '6.E.8'
            what: 'NO SELF DISLODGEMENT WITH BELEAGUERED GARRISON AND HEAD TO HEAD BATTLE'
            orders:
                eng: ['F nth-nwy', 'F yor S F nwy-nth']
                ger: ['F hol S F hel-nth', 'F hel-nth']
                rus: ['F ska S F nwy-nth', 'F nwy-nth']
            expect:
                nwy:
                    result:false
                nth:
                    result:false
                hel:
                    result:false
                    
        e9:
            id: '6.E.9'
            what: 'ALMOST SELF DISLODGEMENT WITH BELEAGUERED GARRISON'
            orders:
                eng: ['F nth-nwg', 'F yor S F nwy-nth']
                ger: ['F hol S F hel-nth', 'F hel-nth']
                rus: ['F ska S F nwy-nth', 'F nwy-nth']
            expect:
                nwy:
                    result:true
                nth:
                    result:true
                    
        e10:
            id: '6.E.10'
            what: 'ALMOST CIRCULAR MOVEMENT WITH NO SELF DISLODGEMENT WITH BELEAGUERED GARRISON'
            orders:
                eng: ['F nth-den', 'F yor S F nwy-nth']
                ger: ['F hol S F hel-nth', 'F hel-nth', 'F den-hel']
                rus: ['F ska S F nwy-nth', 'F nwy-nth']
            expect:
                nwy:
                    result:false
                nth:
                    result:false
                hel:
                    result:false
                den:
                    result:false
                    
        #e11: Wait for "via Convoy" implementation
        
        e12:
            id: '6.E.12'
            what: 'SUPPORT ON ATTACK ON OWN UNIT CAN BE USED FOR OTHER MEANS'
            orders:
                aus: ['A bud-rum', 'A ser S A vie-bud']
                ita: ['A vie-bud']
                rus: ['A gal-bud', 'A rum S A gal-bud']
            expect:
                bud:
                    result:false
                vie:
                    result:false
                gal:
                    result:false
                    
        e13:
            id: '6.E.13'
            what: 'THREE WAY BELEAGUERED GARRISON'
            orders:
                eng: ['F edi S F yor-nth', 'F yor-nth']
                fra: ['F bel-nth', 'F eng S F bel-nth']
                ger: ['F nth H']
                rus: ['F nwg-nth', 'F nwy S F nwg-nth']
            expect:
                yor:
                    result:false
                bel:
                    result:false
                nwg:
                    result:false
                    
        e14:
            id: '6.E.14'
            what: 'ILLEGAL HEAD TO HEAD BATTLE CAN STILL DEFEND'
            orders:
                eng: ['F lvp-edi']
                rus: ['F edi-lvp']
            expect:
                lvp:
                    result:false
                edi:
                    result:false
                    
        e15:
            id: '6.E.15'
            what: 'THE FRIENDLY HEAD TO HEAD BATTLE'
            orders:
                eng: ['F hol S a ruh-kie', 'A ruh-kie']
                fra: ['A kie-ber', 'A mun S A kie-ber', 'A sil S A kie-ber']
                ger: ['A ber-kie', 'F den S A ber-kie', 'F hel S A ber-kie']
                rus: ['F bal S A pru-ber', 'A pru-ber']
            expect:
                ruh:
                    result:false
                kie:
                    result:false
                ber:
                    result:false
                pru:
                    result:false