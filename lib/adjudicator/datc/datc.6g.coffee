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