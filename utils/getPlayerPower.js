function getPlayerPower(player) {

    let power = 0

    for (const ch of player.characters || []) {

        power += Number(ch.power || 0)

    }

    return power

}

module.exports = getPlayerPower
