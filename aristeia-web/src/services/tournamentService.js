
import uuid from 'uuid/v4'
let data = null;

const initialData = [
    {
        id: 't1',
        name: 'tournament 1',
        type: 'aristeia',
        status: 'open',
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
        ]
    },
    {
        id: 't2',
        name: 'tournament 2',
        type: 'aristeia',
        status: 'open',
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
            // {
            //     id: 1,
            //     number: 1,
            //     games: [
            //         {
            //             id: 'g1',
            //             player1: {
            //                 playerId: 'p1',
            //                 points: 1,
            //                 frags: 3,
            //                 firstBlood: false
            //             },
            //             player2: {
            //                 playerId: 'p3',
            //                 points: 5,
            //                 frags: 2,
            //                 firstBlood: true
            //             }
            //         },
            //         {
            //             id: 'g2',
            //             player1: {
            //                 playerId: 'p2',
            //                 points: 6,
            //                 frags: 3,
            //                 firstBlood: false
            //             },
            //             player2: {
            //                 playerId: 'p4',
            //                 points: 5,
            //                 frags: 2,
            //                 firstBlood: true
            //             }
            //         }
            //     ]
            // }
        ]
    }
]

export async function getTournamentSummaryList() {
    
    const tournament = data.map(t => { return {
            id: t.id,
            name: t.name,
            description: t.description,
            type: t.type,
            totalPlayers: t.players ? t.players.length : 0
        }})
    return tournament
}

export async function getTournamentById(id) {
    const tournament = data.find(t  => t.id === id)        
    return tournament
}

export async function createNewTournament(tournament) {
    const createNewTournament = { id: uuid(), status: 'open', rounds: [], players: [], ...tournament }
    data.push(createNewTournament)
    storeData()
    return createNewTournament.id
}

export async function getRankingTournament(tournament) {
    
    if(!tournament.players) {
        return []
    }
    
    const playerResultsMap = {}

    tournament.players.forEach(player => { 
        playerResultsMap[player.id] = { player, points: 0, frags: 0, firstBlood: 0}
        console.log(playerResultsMap[player.id])
    })

    tournament.rounds.forEach(rounds => {
        rounds.games.forEach(game => {
            playerResultsMap[game.player1.playerId].points += game.player1.points
            playerResultsMap[game.player1.playerId].frags += game.player1.frags
            game.player1.firstBlood && playerResultsMap[game.player1.playerId].firstBlood++

            playerResultsMap[game.player2.playerId].points += game.player2.points
            playerResultsMap[game.player2.playerId].frags += game.player2.frags
            game.player2.firstBlood && playerResultsMap[game.player2.playerId].firstBlood++
        })
    });

    const ranking = Object.values(playerResultsMap).sort((stats1, stats2) => {
        if (stats1.points > stats2.points) { return -1 }
        if (stats1.points < stats2.points) { return 1 }

        if (stats1.frags > stats2.frags) { return -1 }
        if (stats1.frags < stats2.frags) { return 1 }

        if (stats1.firstBlood > stats2.firstBlood) { return -1 }
        if (stats1.firstBlood < stats2.firstBlood) { return 1 }
    })
    
    return ranking
}

export async function deletePlayer(tournamentId, player) {
    const tournament = await getTournamentById(tournamentId)
    tournament.players.pop(p => p.id === player.id)
    storeData()
    return tournament
}

export async function createPlayer(tournamentId, playerName) {
    const tournament = await getTournamentById(tournamentId)
    
    if (!tournament.players) {
        tournament.players = []
    }

    tournament.players.push({id: uuid(), name: playerName })
    storeData()
    return tournament
}

export async function startTournament(tournamentId) {
    const tournament = await getTournamentById(tournamentId)
    tournament.status = 'started'
    storeData()
}

export async function deleteLastRound(tournamentId) {
    const tournament = await getTournamentById(tournamentId)
    tournament.rounds.pop()
    storeData()
}

export async function createNewRound(tournamentId, engine) {
    const tournament = await getTournamentById(tournamentId)
    const ranking = await getRankingTournament(tournament)
    const matches = await engine.createMatches(tournament, ranking)

    const round = {
        id: uuid(),
        number: tournament.rounds.length + 1,
        games: matches.map(m => {
            return {
                id: uuid(),
                player1: {
                    playerId: m.player1.player.id,
                    points: null,
                    frags: null,
                    firstBlood: null
                },
                player2: {
                    playerId: m.player2.player.id,
                    points: null,
                    frags: null,
                    firstBlood: null
                },
                isEnded() {
                    return this.player1.points && this.player1.frags && this.player1.firstBlood
                        && this.player2.points && this.player2.frags && this.player2.firstBlood
                }
            }
        })
    }

    tournament.rounds.push(round)
    storeData()
}

function storeData(d) {
    if (!data) {
        data = d
    }
    window.localStorage.setItem('data', JSON.stringify(data))
}

function getData() {
    return JSON.parse(window.localStorage.getItem('data'))
}

function init() {
    data = getData()

    if (!data) {
        storeData(initialData)
    }
    
    data = getData()
}

init()