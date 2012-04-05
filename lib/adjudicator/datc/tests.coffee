define ->
    tests =

        t1:
            id: 'T1'
            what: 'BASIC CONVOY EXPERIMENT'
            orders:
                rus: ['f den-nth', 'f hel s f den-nth']
                fra: ['F nat C A edi-lvp']
                eng: ['F nth C A edi-lvp', 'F nwg C A edi-lvp', 'F iri C A edi-lvp', 'F eng C A edi-lvp', 'a edi-lvp']
                aus: ['a lvp-edi']
            expect:
                lvp:
                    result: true
                edi:
                    result: true