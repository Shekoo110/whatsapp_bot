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

    shield1: {
        type: Number,
        default: 0
    },

    shield2: {
        type: Number,
        default: 0
    },

    team1: {
        type: Array,
        default: []
    },

    team2: {
        type: Array,
        default: []
    },

    burn: {
        player1: {
            type: Number,
            default: 0
        },
        player2: {
            type: Number,
            default: 0
        }
    },

    poison: {
        player1: {
            type: Number,
            default: 0
        },
        player2: {
            type: Number,
            default: 0
        }
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

module.exports =
    mongoose.models.PvP ||
    mongoose.model('PvP', pvpSchema)
