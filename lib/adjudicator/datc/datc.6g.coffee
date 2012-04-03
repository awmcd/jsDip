define ->
    tests =

        g1:
            id: '6.G.1'
            what: 'TWO UNITS CAN SWAP PLACES BY CONVOY'
            orders:
                eng: ['A nwy-swe', 'F ska C A nwy-swe']
                rus: ['A swe-nwy'];
            expect:
                nwy:
                    result: true
                swe:
                    result: true
                    
        g2:
            id: '6.G.2'
            what: 'KIDNAPPING AN ARMY'
            orders:
                eng: ['A nwy-swe']
                rus: ['F swe-nwy']
                ger: ['F ska C A nwy-swe']
            expect:
                nwy:
                    result: false
                swe:
                    result: false
                    
        g3:
            id: '6.G.3'
            what: 'KIDNAPPING WITH A DISRUPTED CONVOY'
            orders:
                fra: ['F bre-eng', 'A pic-bel', 'A bur S A pic-bel', 'F mid S F bre-eng']
                eng: ['F eng C A pic-bel']
            expect:
                pic:
                    result: true