const Clan = require('../models/Clan')
const Player = require('../models/Player')
const getPlayerPower = require('./getPlayerPower')

async function updateClanPower(clanId) {

    const clan = await Clan.findOne({ clanId })

    if (!clan) return

    let totalPower = 0

    for (const memberId of clan.members) {

        const player = await Player.findOne({
            userId: memberId
        })

        if (!player) continue

        totalPower += getPlayerPower(player)

    }

    clan.power = totalPower

    await clan.save()

    return totalPower

}

module.exports = updateClanPower
