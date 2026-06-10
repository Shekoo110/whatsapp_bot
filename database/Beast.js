const mongoose = require('mongoose')

const BeastSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    image: {
        type: String,
        default: ''
    },

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

    // القدرة الحالية للوحش
    currentAbility: {
        type: Object,
        default: null
    },

    // عدد مرات القتل
    kills: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
})

module.exports =
mongoose.model(
    'Beast',
    BeastSchema
)
