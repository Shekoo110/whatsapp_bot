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
    },

    // القدرة الحالية المختارة للوحش
    currentAbility: {
        type: Object,
        default: null
    },

    // عدد مرات قتله
    kills: {
        type: Number,
        default: 0
    }

})

module.exports =
mongoose.model(
    'Beast',
    BeastSchema
)
