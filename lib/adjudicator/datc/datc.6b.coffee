define ->
    tests =
        
        b1:
            id: '6.B.1'
            what: 'MOVING WITH UNSPECIFIED COAST WHEN COAST IS NECESSARY'
            unit: [['fra', 'F', 'por']]
            orders: ['F por-spa']
            expect: por: result:false
            
        b2:
            id: '6.B.2'
            what: 'MOVING WITH UNSPECIFIED COAST WHEN COAST IS NOT NECESSARY'
            unit: [['fra', 'F', 'gas']]
            orders: ['F gas-spa']
            expect: gas: result:true
            
        b3:
            id: '6.B.3'
            what: 'MOVING WITH WRONG COAST WHEN COAST IS NOT NECESSARY'
            unit: [['fra', 'F', 'gas']]
            orders: ['F gas-spa_sc']
            expect: gas: result:false
            
        b4:
            id: '6.B.4'
            what: 'SUPPORT TO UNREACHABLE COAST ALLOWED'
            unit: [['fra', 'F', 'gas'], ['fra', 'F', 'mar'], ['ita', 'F', 'wes']]
            orders: ['F gas-spa_nc', 'F mar S F gas-spa_nc', 'F wes-spa_sc']
            expect:
                gas:
                    result:true
                mar:
                    result:true
                wes:
                    result:false
                    
        b5:
            id: '6.B.5'
            what: 'SUPPORT FROM UNREACHABLE COAST NOT ALLOWED'
            unit: [['fra', 'F', 'mar'], ['fra', 'F', 'spa_nc'], ['ita', 'F', 'gol']]
            orders: ['F mar-gol', 'F spa_nc S F mar-gol', 'F gol H']
            expect:
                mar:
                    result:false
                spa:
                    result:false
                gol:
                    result:true 
                    
        b6:
            id: '6.B.6'
            what: 'SUPPORT CAN BE CUT WITH OTHER COAST'
            unit: [['eng', 'F', 'iri'], ['eng', 'F', 'nat'], ['fra', 'F', 'spa_nc'],
                    ['fra', 'F', 'mid'], ['ita', 'F', 'gol']]
            orders: ['F iri S F nat-mid', 'F nat-mid', 'F spa_nc S F mid',
                     'F mid H', 'F gol-spa_nc']
            expect:
                mid:
                    dislodged:true
                nat:
                    result:true
                    
        b7:
            id: '6.B.7'
            what: 'SUPPORTING WITH UNSPECIFIED COAST'
            unit: [['fra', 'F', 'por'], ['fra', 'F', 'mid'], ['ita', 'F', 'gol'],
                    ['ita', 'F', 'wes']]
            orders: ['F por S F mid-spa', 'F mid-spa_nc', 'F gol S F wes-spa_sc',
                     'F wes-spa_sc']
            expect:
                wes:
                    result:false
                    
        b8:
            id: '6.B.8'
            what: 'SUPPORTING WITH UNSPECIFIED COAST WHEN ONLY ONE COAST IS POSSIBLE'
            unit: [['fra', 'F', 'por'], ['fra', 'F', 'gas'], ['ita', 'F', 'gol'],
                    ['ita', 'F', 'wes']]
            orders: ['F por S F gas-spa', 'F gas-spa_nc', 'F gol S F wes-spa_sc',
                     'F wes-spa_sc']
            expect:
                por:
                    result:true
                wes:
                    result:false
                    
        b9:
            id: '6.B.9'
            what: 'SUPPORTING WITH WRONG COAST'
            unit: [['fra', 'F', 'por'], ['fra', 'F', 'mid'], ['ita', 'F', 'gol'],
                    ['ita', 'F', 'wes']]
            orders: ['F por S F gas-spa_nc', 'F mid-spa_sc', 'F gol S F wes-spa_sc',
                     'F wes-spa_sc']
            expect:
                por:
                    result:false
                wes:
                    result:true
        
        # I have purposefully left explicitly-ordered incorrect coasts failing,
        # even though it is not the preferred DATC method.
        
        b10:
            id: '6.B.10'
            what: 'UNIT ORDERED WITH WRONG COAST'
            unit: [['fra', 'F', 'spa_sc']]
            orders: ['F spa_nc-gol']
            expect:
                spa: result:false
        
        b11:
            id: '6.B.11'
            what: 'COAST CAN NOT BE ORDERED TO CHANGE'
            unit: [['fra', 'F', 'spa_nc']]
            orders: ['F spa_sc-gol']
            expect:
                spa: result:false
                
        b12:
            id: '6.B.12'
            what: 'ARMY MOVEMENT WITH COASTAL SPECIFICATION'
            unit: [['fra', 'A', 'gas']]
            orders: ['A gas-spa_nc']
            expect:
                gas: result:true
                
        b13:
            id: '6.B.13'
            what: 'COASTAL CRAWL NOT ALLOWED'
            unit: [['tur', 'F', 'bul_sc'], ['tur', 'F', 'con']]
            orders: ['F bul_sc-con', 'F con-bul_ec']
            expect:
                bul:
                    result:false
                con:
                    result:false