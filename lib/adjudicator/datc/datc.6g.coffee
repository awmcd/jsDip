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
                    
        g4:
            id: '6.G.4'
            what: 'KIDNAPPING WITH A DISRUPTED CONVOY AND OPPOSITE MOVE'
            orders:
                fra: ['F bre-eng', 'A pic-bel', 'A bur S A pic-bel', 'F mid S F bre-eng']
                eng: ['F eng C A pic-bel', 'A bel-pic']
            expect:
                pic:
                    result: true
                    
        g5:
            id: '6.G.5'
            what: 'SWAPPING WITH INTENT'
            orders:
                ita: ['A rom-apu', 'F tyn C A apu-rom']
                tur: ['A apu-rom', 'F ion C A apu-rom']
            expect:
                rom:
                    result: true
                apu:
                    result: true
                    
        g6:
            id: '6.G.6'
            what: 'SWAPPING WITH UNINTENDED INTENT'
            orders:
                eng: ['A lvp-edi', 'F eng C A lvp-edi']
                ger: ['A edi-lvp']
                fra: ['F iri H', 'F nth H']
                rus: ['F nwg C A lvp-edi', 'F nat C A lvp-edi']
            expect:
                lvp:
                    result: true
                edi:
                    result: true
                    
        g7:
            id: '6.G.7'
            what: 'SWAPPING WITH ILLEGAL INTENT'
            orders:
                eng: ['F ska C A swe-nwy', 'F nwy-swe']
                rus: ['A swe-nwy', 'F bot C a swe-nwy']
            expect:
                nwy:
                    result: false
                swe:
                    result: false
        
        g8:
            id: '6.G.8'
            what: 'EXPLICIT CONVOY THAT ISN\'T THERE'
            orders:
                fra: ['A bel-hol vC']
                eng: ['F nth-hel', 'A hol-kie']
            expect:
                bel:
                    result: true
        
        g9:
            id: '6.G.9'
            what: 'SWAPPED OR DISLODGED?'
            orders:
                eng: ['A nwy-swe', 'F ska C A nwy-swe', 'F fin S A nwy-swe']
                rus: ['A swe-nwy']
            expect:
                nwy:
                    result: true
                swe:
                    result: true
                    
        g10:
            id: '6.G.10'
            what: 'SWAPPED OR AN HEAD TO HEAD BATTLE?'
            orders:
                eng: ['A nwy-swe vC', 'F den S A nwy-swe', 'F fin S A nwy-swe']
                ger: ['F ska C A nwy-swe']
                rus: ['A swe-nwy', 'F bar S A swe-nwy']
                fra: ['F nwg-nwy', 'F nth S F nwg-nwy']
            expect:
                nwg:
                    result: false
        
        g11:
            id: '6.G.11'
            what: 'A CONVOY TO AN ADJACENT PLACE WITH A PARADOX'
            orders:
                eng: ['F nwy S F nth-ska', 'F nth-ska']
                rus: ['A swe-nwy', 'F ska C A swe-nwy', 'F bar S A swe-nwy']
            expect:
                nth:
                    result: true
                ska:
                    dislodged: true
                swe:
                    result: false
                    
        g12:
            id: '6.G.12'
            what: 'SWAPPING TWO UNITS WITH TWO CONVOYS'
            orders:
                eng: ['A lvp-edi vC', 'F nat C A lvp-edi', 'F nwg C A lvp-edi']
                rus: ['A edi-lvp vC', 'F nth C A edi-lvp', 'F eng C A edi-lvp', 'F iri C A edi-lvp']
            expect:
                lvp:
                    result: true
                edi:
                    result: true
        
        g13:
            id: '6.G.13'
            what: 'SUPPORT CUT ON ATTACK ON ITSELF VIA CONVOY'
            orders:
                aus: ['F adr C A tri-ven', 'A tri-ven vC']
                ita: ['A ven S F alb-tri', 'F alb-tri']
            expect:
                alb:
                    result: true
                tri:
                    dislodged: true
        
        g14:
            id: '6.G.14'
            what: 'BOUNCE BY CONVOY TO ADJACENT PLACE'
            orders:
                eng: ['A nwy-swe', 'F den S A nwy-swe', 'F fin S A nwy-swe']
                fra: ['F nwg-nwy', 'F nth S F nwg-nwy']
                ger: ['F ska C A swe-nwy']
                rus: ['A swe-nwy vC', 'F bar S A swe-nwy']
            expect:
                nwg:
                    result: false
                swe:
                    result: false
                nwy:
                    result: true
        
        g15:
            id: '6.G.15'
            what: 'BOUNCE AND DISLODGE WITH DOUBLE CONVOY'
            orders:
                eng: ['F nth C A lon-bel', 'A hol S A lon-bel', 'A yor-lon', 'A lon-bel vC']
                fra: ['F eng C A bel-lon', 'A bel-lon vC']
            expect:
                yor:
                    result: false
                lon:
                    result: true
                bel:
                    dislodged: true
        
        g16:
            id: '6.G.16'
            what: 'THE TWO UNIT IN ONE AREA BUG, MOVING BY CONVOY'
            orders:
                eng: ['A nwy-swe', 'A den S A nwy-swe', 'F bal S A nwy-swe', 'F nth-nwy']
                rus: ['A swe-nwy vC', 'F ska C A swe-nwy', 'F nwg S A swe-nwy']
            expect:
                nwy:
                    result: true
                swe:
                    result: true
                nth:
                    result: false
        
        g17:
            id: '6.G.17'
            what: 'THE TWO UNIT IN ONE AREA BUG, MOVING OVER LAND'
            orders:
                eng: ['A nwy-swe vC', 'A den S A nwy-swe', 'F bal S A nwy-swe', 'F ska C A nwy-swe', 'F nth-nwy']
                rus: ['A swe-nwy', 'F nwg S A swe-nwy']
            expect:
                swe:
                    result: true
                nwy:
                    result: true
                nth:
                    result: false
        
        g18:
            id: '6.G.18'
            what: 'THE TWO UNIT IN ONE AREA BUG, WITH DOUBLE CONVOY'
            orders:
                eng: ['F nth C A lon-bel', 'A hol S A lon-bel', 'A yor-lon', 'A lon-bel', 'A ruh S A lon-bel']
                fra: ['F eng C A bel-lon', 'A bel-lon', 'A wal S A bel-lon']
            expect:
                bel:
                    result: true
                lon:
                    result: true
                yor:
                    result: false