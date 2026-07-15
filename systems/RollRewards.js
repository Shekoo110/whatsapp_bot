const characters = require('../characters.json')
const urAbilities = require('./urAbilities')

function getRandomSSSCharacter() {

    const sssCharacters = characters.filter(
        c => c.rarity === 'SSS'
    )

    const random =
        JSON.parse(
            JSON.stringify(
                sssCharacters[
                    Math.floor(
                        Math.random() *
                        sssCharacters.length
                    )
                ]
            )
        )

    return random

}

function addRandomAbilities(character, count) {

    const pool = [...urAbilities]

    character.urAbilities = []

    while (
        character.urAbilities.length < count &&
        pool.length
    ) {

        const totalChance =
            pool.reduce(
                (sum, a) => sum + a.chance,
                0
            )

        let roll =
            Math.random() * totalChance

        let index = 0

        for (let i = 0; i < pool.length; i++) {

            roll -= pool[i].chance

            if (roll <= 0) {
                index = i
                break
            }

        }

        character.urAbilities.push(
            pool[index]
        )

        pool.splice(index, 1)

    }

    return character

}

async function createEXReward() {

    const character =
        getRandomSSSCharacter()

    character.rarity = 'SSS'
    character.power = 25000
    character.evolutionLevel = 6
    character.evolutionType = 'fixed'

    addRandomAbilities(
        character,
        7
    )

    return character

}

async function createURIIIReward() {

    const character =
        getRandomSSSCharacter()

    character.rarity = 'SSS'
    character.power = 19000
    character.evolutionLevel = 4
    character.evolutionType = 'fixed'

    addRandomAbilities(
        character,
        5
    )

    return character

}

async function createURIReward() {

    const character =
        getRandomSSSCharacter()

    character.rarity = 'SSS'
    character.power = 16000
    character.evolutionLevel = 3
    character.evolutionType = 'fixed'

    addRandomAbilities(
        character,
        4
    )

    return character

}

module.exports = {
    createEXReward,
    createURIIIReward,
    createURIReward
}
