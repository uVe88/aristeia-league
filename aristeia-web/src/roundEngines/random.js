export default async function createMatches(tournament, ranking) {
    const copy = [...ranking]
    const matches = []

    while(copy.length > 1) {
        const p1Index = getRandomInt(0, copy.length - 1)
        const p1 = copy.pop(p1Index)
        const p2Index = getRandomInt(0, copy.length - 1)
        const p2 = copy.pop(p1Index)
        matches.push({ player1: p1, player2: p2})
    }

    return matches
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}