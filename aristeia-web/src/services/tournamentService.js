import { Observable } from 'rxjs'

const data = [
    {
        id: 't1',
        name: 'tournament 1',
        type: 'free',
        description: 'aristeia tournament que mola mucho',
        players: [
            { 
                id: 'p1',
                name: 'player 1'
            },
            { 
                id: 'p2',
                name: 'player 2'
            },
            { 
                id: 'p3',
                name: 'player 3'
            },
            { 
                id: 'p4',
                name: 'player 4'
            },
        ],
        rounds: [
            {
                number: 1,
                games: [
                    {
                        id: 'g1',
                        player1: {
                            playerId: 'p1',
                            points: 1,
                            frags: 3,
                            firstBlood: false
                        },
                        player2: {
                            playerId: 'p3',
                            points: 5,
                            frags: 2,
                            firstBlood: true
                        }
                    }
                ]
            }
        ]
    },
    {
        id: 't2',
        name: 'tournament 2',
        type: 'free',
        description: 'aristeia tournament que mola mucho',
        players: [
            { 
                id: 'p1',
                name: 'player 1'
            },
            { 
                id: 'p2',
                name: 'player 2'
            },
            { 
                id: 'p3',
                name: 'player 3'
            },
            { 
                id: 'p4',
                name: 'player 4'
            },
        ],
        rounds: [
            {
                number: 1,
                games: [
                    {
                        id: 'g1',
                        player1: {
                            playerId: 'p1',
                            points: 1,
                            frags: 3,
                            firstBlood: false
                        },
                        player2: {
                            playerId: 'p3',
                            points: 5,
                            frags: 2,
                            firstBlood: true
                        }
                    }
                ]
            }
        ]
    }
]

export function getTournamentSummaryList() {
    const obs = Observable.create(
        (observer) => {
            const d = data.map(t => { return {
                id: t.id,
                name: t.name,
                description: t.description,
                type: t.type,
                totalPlayers: t.players.length
            }})

            observer.next(d)
            observer.complete()
        }
    )

    return obs
}

export function getTournamentById(id) {
    return Observable.create(
        (observer) => {
            const t = data.find(t  => t.id === id)
            observer.next(t)
            observer.complete()
        }
    ) 
}