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
        prompt: 'Mostrami tutte le misure in Alert degli ultimi 6 mesi',
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
        prompt: 'Mostrami tutte le misure in Alert degli ultimi 6 mesi',
        reports: [
            {
                name: 'spike Gennaio',
                date: '12/02/2024'
            },
            {
                name: 'Misuratori spike 25',
                date: '12/02/2024'
            },
            {
                name: 'Misuratori spike 25',
                date: '12/02/2024'
            }
        ]
    }
]

reports.push({...reports[1], id: 'p2', name: 'Preset 02' })
reports.push({...reports[1], id: 'p3', name: 'Preset 03' })
reports.push({...reports[1], id: 'p4', name: 'Preset 04' })
reports.push({...reports[1], id: 'p5', name: 'Preset 05' })
reports.push({...reports[1], id: 'p6', name: 'Preset 06' })
reports.push({...reports[1], id: 'p7', name: 'Preset 07' })

export const mieiReports = [
    {
        name: 'report Misuratori 12012025',
        date: '12/02/2024',
        filters: [
            'Aree zonali: Nord',
            'Tensione: AT',
            'Modelli: D',
            'Protocolli: Tutti'
        ],
        prompt: 'Mostrami tutte le misure in Alert degli ultimi 6 mesi'
    },
    {
        name: 'Nome report 0',
        date: '12/02/2024',
        filters: [
            'Aree zonali: Sud',
            'Tensione: MT',
            'Modelli: A',
            'Protocolli: Tensione'
        ],
        prompt: 'Mostrami tutte le misure in Alert degli ultimi 6 mesi'
    }
]

let reportN = 1
export function aggiungiMioReport() {
    mieiReports.push({
            name: `Nome report ${reportN++}`,
            date: new Date().toLocaleDateString(),
            filters: [
                'Aree zonali: Sud',
                'Tensione: MT',
                'Modelli: A',
                'Protocolli: Tensione'
            ],
            prompt: 'Mostrami tutte le misure in Alert degli ultimi 6 mesi'
        }
    )
}
