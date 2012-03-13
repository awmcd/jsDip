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
                ger: ['kie-mun', 'A bur S F kie-mun']
                rus: ['a mun-kie', 'A ber S A mun-kie']
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