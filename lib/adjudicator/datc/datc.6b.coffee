define ->
    tests =
        
        b1:
            id: '6.B.1'
            what: 'MOVING WITH UNSPECIFIED COAST WHEN COAST IS NECESSARY'
            orders:
                fra: ['F por-spa']
            expect: por: result:false
            
        b2:
            id: '6.B.2'
            what: 'MOVING WITH UNSPECIFIED COAST WHEN COAST IS NOT NECESSARY'
            orders:
                fra: ['F gas-spa']
            expect: gas: result:true
            
        b3:
            id: '6.B.3'
            what: 'MOVING WITH WRONG COAST WHEN COAST IS NOT NECESSARY'
            orders:
                fra: ['F gas-spa_sc']
            expect: gas: result:false
            
        b4:
            id: '6.B.4'
            what: 'SUPPORT TO UNREACHABLE COAST ALLOWED'
            orders:
                fra: ['F gas-spa_nc', 'F mar S F gas-spa_nc']
                ita: ['F wes-spa_sc']
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
            orders:
                fra: ['F mar-gol', 'F spa_nc S F mar-gol']
                ita: ['F gol H']
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
            orders:
                eng: ['F iri S F nat-mid', 'F nat-mid']
                fra: ['F spa_nc S F mid', 'F mid H']
                ita: ['F gol-spa_nc']
            expect:
                mid:
                    dislodged:true
                nat:
                    result:true
                    
        b7:
            id: '6.B.7'
            what: 'SUPPORTING WITH UNSPECIFIED COAST'
            orders:
                fra: ['F por S F mid-spa', 'F mid-spa_nc']
                ita: ['F gol S F wes-spa_sc', 'F wes-spa_sc']
            expect:
                wes:
                    result:false
                    
        b8:
            id: '6.B.8'
            what: 'SUPPORTING WITH UNSPECIFIED COAST WHEN ONLY ONE COAST IS POSSIBLE'
            orders:
                fra: ['F por S F gas-spa', 'F gas-spa_nc']
                ita: ['F gol S F wes-spa_sc', 'F wes-spa_sc']
            expect:
                por:
                    result:true
                wes:
                    result:false
                    
        b9:
            id: '6.B.9'
            what: 'SUPPORTING WITH WRONG COAST'
            orders:
                fra: ['F por S F gas-spa_nc', 'F mid-spa_sc']
                ita: ['F gol S F wes-spa_sc', 'F wes-spa_sc']
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
            orders:
                fra: ['F spa_nc-gol']
            expect:
                spa: result:false
        
        b11:
            id: '6.B.11'
            what: 'COAST CAN NOT BE ORDERED TO CHANGE'
            orders:
                fra: ['F spa_sc-gol']
            expect:
                spa: result:false
                
        b12:
            id: '6.B.12'
            what: 'ARMY MOVEMENT WITH COASTAL SPECIFICATION'
            orders:
                fra: ['A gas-spa_nc']
            expect:
                gas: result:true
                
        b13:
            id: '6.B.13'
            what: 'COASTAL CRAWL NOT ALLOWED'
            orders:
                tur: ['F bul_sc-con', 'F con-bul_ec']
            expect:
                bul:
                    result:false
                con:
                    result:false
                    
        # DATC 6.B.14 not relevant to this implementation