define ->
    tests =

        t1:
            id: 'T1'
            what: 'BASIC CONVOY EXPERIMENT'
            orders:
                tur: ['A bre-nwy']
                rus: ['F mid C A bre-nwy', 'F nat C A bre-nwy', 'F nwg C A bre-nwy']
                fra: ['F nth C A bre-nwy', 'F eng C A bre-nwy']
            expect:
                bre:
                    result: true