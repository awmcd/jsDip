define ->
    tests =
        
        a1:
            id: '6.A.1'
            what: 'MOVING TO AN AREA THAT IS NOT A NEIGHBOUR'
            orders:
                eng: ['F nth-pic']
            expect: nth: result:false
                   
        a2:
            id: '6.A.2'
            what: 'MOVE ARMY TO SEA'
            orders:
                eng: ['A lvp-iri']
            expect: lvp: result:false
    
        a3:
            id: '6.A.3',
            what: 'MOVE FLEET TO LAND'
            orders:
                ger: ['G kie-mun']
            expect: kie: result:false
        
        a4:
            id: '6.A.4'
            what: 'MOVE TO OWN SECTOR'
            orders:
                ger: ['G kie-kie']
            expect: kie: result:false
                
        a5:
            id: '6.A.5'
            what: 'MOVE TO OWN SECTOR WITH CONVOY'
            unit: [['eng', 'F', 'nth'], ['eng', 'A', 'yor'], ['eng', 'A', 'lvp'],
                    ['ger', 'F', 'lon'], ['ger', 'A', 'wal']]
            orders:
                eng: ['F nth C A yor-yor', 'A yor-yor', 'A lvp S A yor-yor']
                ger: ['A lon-yor', 'A wal S F lon-yor']
            expect:
                yor:
                    result:false, dislodged:true
                lvp:
                    result:false
                lon:
                    result:true
            
        # test 6.A.6 is not applicable to this implementation
          
        a7:
            id: '6.A.7'
            what: 'ONLY ARMIES CAN BE CONVOYED'
            orders:
                eng: ['F lon-bel', 'F nth C A lon-bel']
            expect: lon: result:false
    
        
        a8:
            id: '6.A.8'
            what: 'SUPPORT TO HOLD YOURSELF IS NOT POSSIBLE'
            orders:
                ita: ['A ven-tri', 'A tyr S A ven-tri']
                aus: ['F tri S F tri']
            expect: tri: dislodged:true
                
        a9:
            id: '6.A.9'
            what: 'FLEETS MUST FOLLOW COAST IF NOT ON SEA'
            orders:
                ita: ['F rom-ven']
            expect: rom: result:false
                
        a10 :
            id: '6.A.10'
            what: 'SUPPORT ON UNREACHABLE DESTINATION NOT POSSIBLE'
            orders:
                aus: ['A ven H']
                ita: ['F Rom S A Apu-Ven', 'A Apu-Ven']
            expect: rom: result:false
    
        a11: 
            id: '6.A.11'
            what: 'SIMPLE BOUNCE'
            orders:
                aus: ['A vie-tyr']
                ita: ['A ven-tyr']
            expect:
                vie:
                    result:false
                ven:
                    result:false
                    
        a12: 
            id: '6.A.12'
            what: 'BOUNCE OF THREE UNITS'
            orders:
                aus: ['A vie-tyr']
                ger: ['A munt-tyr']
                ita: ['A ven-tyr']
            expect:
                vie:
                    result:false
                mun:
                    result:false
                ven:
                    result:false