const eventManager =
require('./eventManager')

const eventGroups = [

'120363020823525909@g.us',

'120363400448225715@g.us',

'120363362807326585@g.us'

]

function startAutoEvents(sock) {

setInterval(
    async () => {

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

    },
    20 * 60 * 1000
)

}

module.exports =
startAutoEvents
