const Beast = require('../database/Beast')

let sockInstance = null

function setSocket(sock) {

    sockInstance = sock
}

function getNextRespawn() {

    const now = new Date()

    const next = new Date(now)

    next.setMinutes(0)
    next.setSeconds(0)
    next.setMilliseconds(0)

    const currentHour =
        now.getHours()

    const nextHour =
        currentHour % 2 === 0
            ? currentHour + 2
            : currentHour + 1

    next.setHours(nextHour)

    return next
}

async function resetBeasts() {

    const beasts =
        await Beast.find({})

    if (beasts.length < 2)
        return

    const eggIndex =
        Math.floor(
            Math.random() * beasts.length
        )

    const respawnTime =
        getNextRespawn()

    for (
        let i = 0;
        i < beasts.length;
        i++
    ) {

        beasts[i].hp =
            beasts[i].maxHp

        beasts[i].rankings =
            {}

        beasts[i].eggCarrier =
            i === eggIndex

        beasts[i].currentAbility =
            null

        beasts[i].respawnAt =
            respawnTime

        await beasts[i].save()
    }

    console.log(
        '✅ Beasts Reset'
    )
}

async function checkRespawn() {

    const beasts =
        await Beast.find({})

    if (!beasts.length)
        return

    const now =
        Date.now()

    for (const beast of beasts) {

        if (
            beast.respawnAt &&
            now >=
            beast.respawnAt.getTime()
        ) {

            await resetBeasts()

            if (sockInstance) {

                const groups = [

                    "120363400448225715@g.us",

                    "120363020823525909@g.us"
                ]

                for (const groupId of groups) {

                    await sockInstance.sendMessage(
                        groupId,
                        {
                            image: {
                                url: 'https://files.catbox.moe/2zadbq.jpg'
                            },
                            caption:

`🦊 استيقظ كوراما

🔥 عاد الوحش العالمي

❤️ HP: 3,000,000

⚔️ استخدم:

.اقضي`
                        }
                    )

                    await sockInstance.sendMessage(
                        groupId,
                        {
                            image: {
                                url: 'https://files.catbox.moe/fdgy5g.webp'
                            },
                            caption:

`🌌 استيقظ الجوبي

☠️ عاد الوحش العالمي

❤️ HP: 3,000,000

⚔️ استخدم:

.اباده`
                        }
                    )
                }
            }

            break
        }
    }
}

module.exports = {

    getNextRespawn,

    resetBeasts,

    checkRespawn,

    setSocket
}
