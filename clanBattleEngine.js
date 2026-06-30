const useEXAbilities = require("./utils/useEXAbilities")

function calculatePower(player) {

    let totalPower = 0

    for (const character of player.characters) {

        let power = character.power || 0

        const ex = useEXAbilities(character)

        power += ex.attackBonus * 100
        power += ex.defenseBonus * 80
        power += ex.critRate * 60
        power += ex.critDamage * 40
        power += ex.dodge * 50
        power += ex.shield * 40
        power += ex.lifesteal * 50
        power += ex.reflect * 50

        totalPower += power

    }

    return Math.floor(totalPower)

}

async function clanBattle(playerA, playerB) {

    const powerA = calculatePower(playerA)
    const powerB = calculatePower(playerB)

    return {

        powerA,
        powerB,

        winner:
            powerA >= powerB
                ? playerA.userId
                : playerB.userId

    }

}

module.exports = clanBattle
