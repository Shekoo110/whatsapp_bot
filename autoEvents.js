const eventManager =
require('./eventManager')

const {
giveReward
} = require('./eventRewards')

const eventGroups = [

'120363020823525909@g.us',

'120363400448225715@g.us'

]
function startAutoEvents(sock) {

async function launchEvent() {

    try {

        const sharedEvent =
            eventManager.getRandomEvent()

        for (const groupId of eventGroups) {

            await eventManager.startEvent(
                sock,
                groupId,
                sharedEvent
            )
        }

    } catch (err) {

        console.log(
            'Auto Event Error:',
            err
        )
    }
}

// أول حدث مباشرة

launchEvent()

// حدث جديد كل 20 دقيقة

setInterval(
    launchEvent,
    20 * 60 * 1000
)

// فحص الأحداث المنتهية

setInterval(
    async () => {

        try {

            const expired =
                eventManager.getExpiredEvents()

            for (const event of expired) {

                if (
                    !event.participants.length
                ) {

                    eventManager.finishEvent(
                        event.jid
                    )

                    continue
                }

                const eventName =
                    event.event.name

                const winners =
                    eventManager.finishEvent(
                        event.jid
                    )
                if (!Array.isArray(winners)) {
    continue
                }

                let result =

`⏰ انتهى وقت الحدث

🎯 ${eventName}

🏆 الفائزون:

`

                for (const id of winners) {

                    const reward =
                        await giveReward(id)

                    result +=

`👑 @${id.split('@')[0]}
🎁 ${reward}

`
}

                await sock.sendMessage(
                    event.jid,
                    {
                        text: result,
                        mentions: winners
                    }
                )
            }

        } catch (err) {

            console.log(
                'Expired Event Error:',
                err
            )
        }

    },
    5000
)

}

module.exports =
startAutoEvents
