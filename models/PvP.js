const mongoose = require('mongoose')

const pvpSchema = new mongoose.Schema({

    player1: {
        type: String,
        required: true
    },

    player2: {
        type: String,
        required: true
    },

    hp1: {
        type: Number,
        default: 10000
    },

    hp2: {
        type: Number,
        default: 10000
    },

    turn: {
        type: String,
        required: true
    },

    active: {
        type: Boolean,
        default: true
    },

    lastMove: {
        type: Date,
        default: Date.now
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('PvP', pvpSchema)
