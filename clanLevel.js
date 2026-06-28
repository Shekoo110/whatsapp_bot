const Clan = require('./models/Clan')

const MAX_LEVEL = 25

function getRequiredXP(level) {

    return 1000 + ((level - 1) * 500)

}

async function addClanXP(clanId, amount) {

    const clan = await Clan.findOne({
        clanId
    })

    if (!clan) return null

    if (clan.level >= MAX_LEVEL)
        return clan

    clan.xp += amount

    let leveledUp = false

    while (
        clan.level < MAX_LEVEL &&
        clan.xp >= clan.nextLevelXp
    ) {

        clan.xp -= clan.nextLevelXp

        clan.level++

        clan.coins += 50

        clan.nextLevelXp =
            getRequiredXP(clan.level)

        leveledUp = true

    }

    await clan.save()

    return {
        clan,
        leveledUp
    }

}

module.exports = {

    MAX_LEVEL,

    getRequiredXP,

    addClanXP

}
