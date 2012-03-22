define ->
    tests =

        d1:
            id: '6.D.1'
            what: 'SUPPORTED HOLD CAN PREVENT DISLODGEMENT'
            orders:
                aus: ['F adr S A tri-ven', 'A tri-ven']
                ita: ['A ven H', 'A tyr S A ven']
            expect:
                tri: result:false
                    
        d2:
            id: '6.D.2'
            what: 'A MOVE CUTS SUPPORT ON HOLD'
            orders:
                aus: ['F adr S A tri-ven', 'A tri-ven', 'A vie-tyr'] 
                ita: ['A ven H', 'A tyr S A Ven']
            expect:
                ven:
                    dislodged:true
                tri:
                    result:true
                    
        d3:
            id: '6.D.3'
            what: 'A MOVE CUTS SUPPORT ON MOVE'
            orders:
                aus: ['F adr S A tri-ven', 'A tri-ven'] 
                ita: ['A ven H', 'F ion-adr']
            expect:
                adr:
                    result:false
                tri:
                    result:false
                    
        d4:
            id: '6.D.4'
            what: 'SUPPORT TO HOLD ON UNIT SUPPORTING A HOLD ALLOWED'
            orders:
                ger: ['A ber S F kie', 'A kie S A ber']
                rus: ['A bal S A pru-ber', 'A pru-ber']
            expect: pru: result:false
                
        d5:
            id: '6.D.5'
            what: 'SUPPORT TO HOLD ON UNIT SUPPORTING A MOVE ALLOWED'
            orders:
                ger: ['A ber S A mun-sil', 'F kie S A ber', 'A mun-sil']
                rus: ['F bal S A pru-ber', 'A pru-ber']
            expect: pru: result:false
        
        d6:
            id: '6.D.6'
            what: 'SUPPORT TO HOLD ON CONVOYING UNIT ALLOWED'
            orders:
                ger: ['A ber-swe', 'F bal C A ber-swe', 'F pru S F bal']
                rus: ['F lvn-bal', 'F gol S F lvn-bal']
            expect:
                lvn:
                    result:false
                ber:
                    result:true
                    
        d7:
            id: '6.D.7'
            what: 'SUPPORT TO HOLD ON MOVING UNIT NOT ALLOWED'
            orders:
                ger: ['F bal-swe', 'F pru S F bal']
                rus: ['F lvn-bal', 'F bot S F lvn-bal', 'A fin-swe']
            expect:
                pru:
                    result:false
                bal:
                    dislodged:true
                fin:
                    result:false
                    
        d8:
            id: '6.D.8'
            what: 'FAILED CONVOY CAN NOT RECEIVE HOLD SUPPORT'
            orders:
                aus: ['F ion H', 'A ser S A alb-gre', 'A alb-gre']
                tur: ['A gre-nap', 'A bul S A gre']
            expect:
                bul:
                    result:false
                gre:
                    dislodged:true
                    
        d9:
            id: '6.D.9'
            what: 'SUPPORT TO MOVE ON HOLDING UNIT NOT ALLOWED'
            orders:
                ita: ['A ven-tri', 'A tyr S A ven-tri']
                aus: ['A alb S A tri-ser', 'A tri H']
            expect:
                alb:
                    result:false
                tri:
                    dislodged:true
                    
        d10:
            id: '6.D.10'
            what: 'SELF DISLODGMENT PROHIBITED'
            orders:
                ger: ['A ber H', 'F kie-ber', 'A mun S F kie-ber']
            expect:
                kie:
                    result:false
                    
        d11:
            id: '6.D.11'
            what: 'NO SELF DISLODGMENT OF RETURNING UNIT'
            orders:
                ger: ['A ber-pru', 'F kie-ber', 'A mun S F kie-ber']
                rus: ['A war-pru']
            expect:
                ber:
                    result:false
                    
        d12:
            id: '6.D.12'
            what: 'SUPPORTING A FOREIGN UNIT TO DISLODGE OWN UNIT PROHIBITED'
            orders:
                aus: ['A tri H', 'A vie S A ven-tri']
                ita: ['A ven-tri']
            expect:
                ven:
                    result:false
                    
        d13:
            id: '6.D.13'
            what: 'SUPPORTING A FOREIGN UNIT TO DISLODGE A RETURNING OWN UNIT PROHIBITED'
            orders:
                aus: ['F tri-adr', 'A vie S A ven-tri']
                ita: ['A ven-tri', 'A apu-adr']
            expect:
                ven:
                    result:false
                    
        d14:
            id: '6.D.14'
            what: 'SUPPORTING A FOREIGN UNIT IS NOT ENOUGH TO PREVENT DISLODGEMENT'
            orders:
                aus: ['A tri H', 'A vie S a ven-tri']
                ita: ['A ven-tri', 'A tyr S A ven-tri', 'F adr S A ven-tri']
            expect:
                tri:
                    dislodged:true
                    
        d15:
            id: '6.D.15'
            what: 'DEFENDER CAN NOT CUT SUPPORT FOR ATTACK ON ITSELF'
            orders:
                rus: ['F con S F bla-ank', 'F bla-ank']
                ita: ['F ank-con']
            expect:
                con:
                    result:true
                ank:
                    dislodged:true
                    
        d16:
            id: '6.D.16'
            what: 'CONVOYING A UNIT DISLODGING A UNIT OF SAME POWER IS ALLOWED'
            orders:
                eng: ['A lon H', 'F nth C A bel-lon']
                fra: ['F eng S A bel-lon', 'A bel-lon']
            expect:
                lon:
                    dislodged:true
                bel:
                    result:true
                    
        d16:
            id: '6.D.16'
            what: 'CONVOYING A UNIT DISLODGING A UNIT OF SAME POWER IS ALLOWED'
            orders:
                eng: ['A lon H', 'F nth C A bel-lon']
                fra: ['F eng S A bel-lon', 'A bel-lon']
            expect:
                lon:
                    dislodged:true
                bel:
                    result:true
                    
        d17:
            id: '6.D.17'
            what: 'DISLODGEMENT CUTS SUPPORTS'
            orders:
                rus: ['F con S F bla-ank', 'F bla-ank']
                tur: ['F ank-con', 'A smy S F ank-con', 'A arm-ank']
            expect:
                con:
                    dislodged:true
                bla:
                    result:false
                    
        d18:
            id: '6.D.18'
            what: 'A SURVIVING UNIT WILL SUSTAIN SUPPORT'
            orders:
                rus: ['F con S F bla-ank', 'F bla-ank', 'A bul S F con']
                tur: ['F ank-con', 'A smy S F ank-con', 'A arm-ank']
            expect:
                bla:
                    result:true
                ank:
                    dislodged:true
                    
        d19:
            id: '6.D.19'
            what: 'EVEN WHEN SURVIVING IS IN ALTERNATIVE WAY'
            orders:
                rus: ['F con S F bla-ank', 'F bla-ank', 'A bul S F con']
                tur: ['A ank-con']
            expect:
                bla:
                    result:true
                ank:
                    dislodged:true
                    
        d20:
            id: '6.D.20'
            what: 'UNIT CAN NOT CUT SUPPORT OF ITS OWN COUNTRY'
            orders:
                eng: ['F lon S F nth-eng', 'F nth-eng', 'A yor-lon']
                fra: ['F eng H']
            expect:
                lon:
                    result:true
                eng:
                    dislodged:true
        d21:
            id: '6.D.21'
            what: 'DISLODGING DOES NOT CANCEL A SUPPORT CUT'
            orders:
                aus: ['tri H']
                ita: ['a ven-tri', 'A tyr S A ven-tri']
                ger: ['A mun-tyr']
                rus: ['A sil-mun', 'A ber S a sil-mun']
            expect:
                mun:
                    dislodged:true
                tyr:
                    result:false
                    
        d22:
            id: '6.D.22'
            what: 'IMPOSSIBLE FLEET MOVE CAN NOT BE SUPPORTED'
            orders:
                ger: ['F kie-mun', 'A bur S F kie-mun']
                rus: ['A mun-kie', 'A ber S A mun-kie']
            expect:
                kie:
                    dislodged:true
                    
        d23:
            id: '6.D.23'
            what: 'IMPOSSIBLE COAST MOVE CAN NOT BE SUPPORTED'
            orders:
                ita: ['F gol-spa_sc', 'F wes S F gol-spa_sc']
                fra: ['F spa_nc-gol', 'F mar S F spa_nc-gol']
            expect:
                spa:
                    result:false
                    dislodged:true
                mar:
                    result:false
                    
        d24:
            id: '6.D.24'
            what: 'IMPOSSIBLE ARMY MOVE CAN NOT BE SUPPORTED'
            orders:
                fra: ['A mar-gol', 'F spa_sc S A mar-gol']
                ita: ['F gol H']
                tur: ['F tyn S F wes-gol', 'F wes-gol']
            expect:
                mar:
                    result:false
                spa:
                    result:false
                gol:
                    dislodged:true
                    
        d25:
            id: '6.D.25'
            what: 'FAILING HOLD SUPPORT CAN BE SUPPORTED'
            orders:
                ger: ['A ber S A pru', 'F kie S A ber']
                rus: ['F bal S A pru-ber', 'A pru-ber']
            expect:
                ber:
                    result:false
                kie:
                    result:true
                pru:
                    result:false
                    
        d26:
            id: '6.D.26'
            what: 'FAILING MOVE SUPPORT CAN BE SUPPORTED'
            orders:
                ger: ['A ber S A pru-sil', 'F kie S A ber']
                rus: ['F bal S A pru-ber', 'A pru-ber']
            expect:
                ber:
                    result:false
                    
        d27:
            id: '6.D.27'
            what: 'FAILING CONVOY CAN BE SUPPORTED'
            orders:
                eng: ['F swe-bal', 'F den S F swe-bal']
                ger: ['A ber H']
                rus: ['F bal C A ber-lvn', 'F pru S F bal']
            expect:
                bal:
                    result:false
                pru:
                    result:true
                swe:
                    result:false
                    
        d28:
            id: '6.D.28'
            what: 'IMPOSSIBLE MOVE AND SUPPORT'
            orders:
                aus: ['A bud S F rum']
                rus: ['F rum-hol']
                tur: ['F bla-rum', 'A bul S F bla-rum']
            expect:
                bla:
                    result:false
                    
        d29:
            id: '6.D.29'
            what: 'MOVE TO IMPOSSIBLE COAST AND SUPPORT'
            orders:
                aus: ['A bud S F rum']
                rus: ['F rum-bul_sc']
                tur: ['F bla-rum', 'A bul S F bla-rum']
            expect:
                bla:
                    result:false
                    
        d30:
            id: '6.D.30'
            what: 'MOVE WITHOUT COAST AND SUPPORT'
            orders:
                ita: ['F aeg S F con']
                rus: ['F con-bul']
                tur: ['F bla-con', 'A bul S F bla-con']
            expect:
                bla:
                    result:false
                    
        # 6.D.31 : Not relevant to this implementation
        
        d32:
            id: '6.D.32'
            what: 'A MISSING FLEET'
            orders:
                ita: ['F edi S A lvp-yor', 'F lvp-yor']
                fra: ['F lon S A yor']
                ger: ['A yor-hol']
            expect:
                lvp:
                    result:false
                    
        d33:
            id: '6.D.33'
            what: 'UNWANTED SUPPORT ALLOWED'
            orders:
                aus: ['A ser-bud', 'A vie-bud']
                rus: ['A gal S A ser-bud']
                tur: ['A bul-ser']
            expect:
                bul:
                    result:true
                ser:
                    result:true
                    
        d34:
            id: '6.D.34'
            what: 'SUPPORT TARGETING OWN AREA NOT ALLOWED'
            orders:
                ger: ['A ber-pru', 'A sil S A ber-pru', 'F bal S A ber-pru']
                ita: ['A pru S lvn-pru']
                rus: ['A war S A lvn-pru', 'A lvn-pru']
            expect:
                pru:
                    result:false
                ber:
                    result:true