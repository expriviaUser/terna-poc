export const reports = [
    {
        id: 'p0',
        name: 'Misuratori con più di 25 Spike nel mese',
        filters: [
            'Aree zonali: Nord',
            'Tensione: AT',
            'Modelli: D',
            'Protocolli: Tutti'
        ],
        prompts: [
            'Mostrami tutte le misure in Alert degli ultimi 3 mesi'
        ],
        reports: [
            {
                name: 'spike Febbraio',
                date: '12/02/2024'
            },
            {
                name: 'Misuratori spike 25',
                date: '12/02/2024'
            }
        ]
    },
    {
        id: 'p1',
        name: 'Preset 01',
        filters: [
            'Aree zonali: Sud',
            'Tensione: MT',
            'Modelli: A',
            'Protocolli: Tensione'
        ],
        prompts: [
            'Mostrami tutte le misure in Alert degli ultimi 6 mesi'
        ],
        reports: [
            {
                name: 'spike Gennaio',
                date: '12/02/2024'
            },
            {
                name: 'Misuratori spike 25',
                date: '12/02/2024'
            }
        ]
    }
]

