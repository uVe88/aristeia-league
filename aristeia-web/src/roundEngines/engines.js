import swissEngine from './swiss'
import randomEngine from './random'

const roundTypes = {
    random: {
        id: 'random',
        name: "Sistema Aleatorio",
        description: "Este sistema hace los emparejamientos lalalalala",
        createMatches: randomEngine
    },
    // swiss: {
    //     id: 'swiss',
    //     name: "Sistema Suizo",
    //     description: "Este sistema hace los emparejamientos lalalalala",
    //     createMatches: swissEngine
    // }
}

export const engineTypes = Object.values(roundTypes)