const events = require('./eventList')

let currentEvent = null

let participants = []

let eventRunning = false

function getRandomEvent() {

return events[
    Math.floor(
        Math.random() * events.length
    )
]

}

async function startEvent(
sock,
jid
) {

if (eventRunning)
    return

eventRunning = true

participants = []

currentEvent =
    getRandomEvent()

await sock.sendMessage(
    jid,
    {
        text:

`🎮 حدث جديد!

🎯 ${currentEvent.name}

📝 اكتب:
${currentEvent.command}

👥 المشاركون: 0/5

⏳ لديك 30 ثانية`
}
)

setTimeout(
    () => {

        eventRunning = false

        currentEvent = null

        participants = []

    },
    30000
)

}

function joinEvent(userId) {

if (!eventRunning)
    return false

if (
    participants.includes(userId)
)
    return false

if (
    participants.length >= 5
)
    return false

participants.push(userId)

return participants.length

}

function pickWinners() {

const shuffled =
    [...participants]
    .sort(
        () =>
            Math.random() - 0.5
    )

const winnerCount =
    Math.random() < 0.5
        ? 2
        : 3

return shuffled.slice(
    0,
    Math.min(
        winnerCount,
        shuffled.length
    )
)

}

module.exports = {

getRandomEvent,

startEvent,

joinEvent,

pickWinners,

get currentEvent() {
    return currentEvent
},

set currentEvent(value) {
    currentEvent = value
},

get participants() {
    return participants
},

set participants(value) {
    participants = value
},

get eventRunning() {
    return eventRunning
},

set eventRunning(value) {
    eventRunning = value
}

}
