const Clan = require('./models/Clan')
const Player = require('./models/Player')

const MAX_LEVEL = 25

function getRequiredXP(level) {

    return 1000 + ((level - 1) * 500)

}

async function addClanXP(clanId, amount) {

    const clan = await Clan.findOne({
        clanId
    })

    if (!clan) return null

    if (clan.level >= MAX_LEVEL) {

        return {
            clan,
            leveledUp: false
        }

    }

    clan.xp += amount

    let leveledUp = false

    while (

        clan.level < MAX_LEVEL &&
        clan.xp >= clan.nextLevelXp

    ) {

        clan.xp -= clan.nextLevelXp

        clan.level++

        // مكافأة كل عضو

        for (const memberId of clan.members) {

            await Player.updateOne(

                {
                    userId: memberId
                },

                {
                    $inc: {

                        money: 250000,

                        clanCoins: 50

                    }

                }

            )

        }

        if (clan.level >= MAX_LEVEL) {

            clan.level = MAX_LEVEL
            clan.xp = 0
            clan.nextLevelXp = 0

            break

        }

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
