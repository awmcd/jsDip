define ->
    tests =

        d1:
            id: '6.D.1'
            what: 'SUPPORTED HOLD CAN PREVENT DISLODGEMENT'
            unit: [['aus', 'F', 'adr'], ['aus', 'A', 'tri'], ['ita', 'A', 'ven'],
                   ['ita', 'A', 'tyr']]
            orders: ['F adr S A tri-ven', 'A tri-ven', 'A ven H', 'A tyr S A ven']
            expect:
                tri:
                    result:false
                    
        d2:
            id: '6.D.2'
            what: 'A MOVE CUTS SUPPORT ON HOLD'
            unit: [['aus', 'F', 'adr'], ['aus', 'A', 'tri'], ['aus', 'A', 'vie'],
                   ['ita', 'A', 'ven'], ['ita', 'A', 'tyr']]
            orders: ['F adr S A tri-ven', 'A tri-ven', 'A vie-tyr', 'A ven H', 'A tyr S A Ven']
            expect:
                ven:
                    dislodged:true
                tri:
                    result:true
                    
                    
        d3:
            id: '6.D.3'
            what: 'A MOVE CUTS SUPPORT ON MOVE'
            unit: [['aus', 'F', 'adr'], ['aus', 'A', 'tri'], ['ita', 'A', 'ven'],
                   ['ita', 'F', 'ion']]
            orders: ['F adr S A tri-ven', 'A tri-ven', 'A ven H', 'F ion-adr']
            expect:
                adr:
                    result:false
                tri:
                    result:false
                    
        d4:
            id: '6.D.4'
            what: 'SUPPORT TO HOLD ON UNIT SUPPORTING A HOLD ALLOWED'
            unit: [['ger', 'A', 'ber'], ['ger', 'F', 'kie'], ['rus', 'F', 'bal'],
                   ['rus', 'A', 'pru']]
            orders: ['A ber S F kie', 'A kie S A ber', 'A bal S A pru-ber', 'A pru-ber']
            expect:
                pru: result:false
                
        d5:
            id: '6.D.5'
            what: 'SUPPORT TO HOLD ON UNIT SUPPORTING A MOVE ALLOWED'
            unit: [['ger', 'A', 'ber'], ['ger', 'F', 'kie'], ['ger', 'A', 'mun'],
                   ['rus', 'F', 'bal'], ['rus', 'A', 'pru']]
            orders: ['A ber S A mun-sil', 'F kie S A ber', 'A mun-sil', 'F bal S A pru-ber',
                     'A pru-ber']
            expect:
                pru: result:false
