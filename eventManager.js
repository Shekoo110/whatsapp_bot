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

module.exports = {

    getRandomEvent,

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
