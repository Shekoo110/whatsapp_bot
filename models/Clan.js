const mongoose = require('mongoose')

const clanSchema = new mongoose.Schema({

    clanId: {
        type: String,
        unique: true,
        required: true
    },

    name: {
        type: String,
        required: true,
        unique: true
    },

    emoji: {
        type: String,
        default: '🏴'
    },

    leader: {
        type: String,
        required: true
    },

    members: {
        type: [String],
        default: []
    },

    level: {
        type: Number,
        default: 1
    },

    xp: {
        type: Number,
        default: 0
    },

    coins: {
        type: Number,
        default: 0
    },

    wins: {
        type: Number,
        default: 0
    },

    losses: {
        type: Number,
        default: 0
    },

    invites: {
    type: [String],
    default: []
},

power: {
    type: Number,
    default: 0
},

warCooldown: {
    type: Number,
    default: 0
},

rankPoints: {
    type: Number,
    default: 1000
},

createdAt: {
    type: Date,
    default: Date.now
}

})

module.exports = mongoose.model(
    'Clan',
    clanSchema
)
