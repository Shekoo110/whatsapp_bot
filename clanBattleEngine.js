const useEXAbilities = require("./useEXAbilities")

function calculatePower(player) {

    let power = 0

    for (const character of player.characters) {

        // قوة الشخصية الأساسية
        power += character.power || 0

        // قدرات EX
        const ex = useEXAbilities(character)

        power += ex.attackBonus * 100
        power += ex.defenseBonus * 80

        power += ex.critRate * 60
        power += ex.critDamage * 40

        power += ex.dodge * 50

        power += ex.shield * 40

        power += ex.lifesteal * 50

        power += ex.reflect * 50

    }

    return Math.floor(power)

}

async function clanBattle(playerA, playerB) {

    const powerA = calculatePower(playerA)

    const powerB = calculatePower(playerB)

    const winner =
        powerA >= powerB
            ? playerA.userId
            : playerB.userId

    return {

        powerA,

        powerB,

        winner

    }

}

module.exports = clanBattle
