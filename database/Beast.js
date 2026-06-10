const mongoose = require('mongoose')

const BeastSchema = new mongoose.Schema({

    name: String,

    hp: {
        type: Number,
        default: 3000000
    },

    maxHp: {
        type: Number,
        default: 3000000
    },

    respawnAt: {
        type: Date,
        default: null
    },

    eggCarrier: {
        type: Boolean,
        default: false
    },

    rankings: {
        type: Map,
        of: Number,
        default: {}
    },

    lastKilledAt: {
        type: Date,
        default: null
    }

})

module.exports =
mongoose.model(
    'Beast',
    BeastSchema
)
