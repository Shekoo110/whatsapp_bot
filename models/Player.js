const mongoose = require('mongoose')

const PlayerSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true,
        unique: true
    },

    pulls: {
        type: Number,
        default: 5
    },

    lastReset: {
        type: Number,
        default: Date.now
    },

    characters: {
        type: Array,
        default: []
    },

    hp: {
        type: Number,
        default: 10000
    },

    crit: {
        type: Number,
        default: 5
    },

    dodge: {
        type: Number,
        default: 3
    },

    xp: {
        type: Number,
        default: 0
    },

    level: {
        type: Number,
        default: 1
    },

    money: {
        type: Number,
        default: 0
    },

    dailyBattles: {
        type: Number,
        default: 5
    },

    lastBattleReset: {
        type: Number,
        default: Date.now
    }

})

module.exports = mongoose.model('Player', PlayerSchema)
