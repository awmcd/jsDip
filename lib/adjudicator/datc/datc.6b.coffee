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