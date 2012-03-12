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
            id: 'Aaron\'s Test'
            what: 'Basic convoy situation'
            orders:
                fra: ['A spa-nwy']
                tur: ['F mid C A spa-nwy', 'F nat C A spa-nwy', 'F nwg C A spa-nwy']
            expect: spa: result:true
        
        
        d6real:
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
