const Clan = require('../models/Clan')
const Player = require('../models/Player')

async function updateClanPower(clanId) {

    const clan = await Clan.findOne({ clanId })

    if (!clan) return

    let totalPower = 0

    for (const memberId of clan.members) {

        const player = await Player.findOne({
            userId: memberId
        })

        if (!player) continue

        for (const ch of player.characters || []) {

            totalPower += Number(ch.power || 0)

        }

    }

    clan.power = totalPower

    await clan.save()

}

module.exports = updateClanPower
