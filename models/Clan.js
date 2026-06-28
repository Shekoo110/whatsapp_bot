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

nextLevelXp: {
    type: Number,
    default: 1000
},

coins: {
    type: Number,
    default: 0
},

shopRefresh: {
    type: String,
    default: ''
},

bossAvailable: {
    type: Boolean,
    default: false
},

bossPurchasedAt: {
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
},

shopPurchases: {
    type: Map,
    of: {
        type: Map,
        of: Number
    },
    default: {}
},

clanInventoryBonus: {
    type: Map,
    of: Number,
    default: {}
},

clanBuffs: {
    type: Object,
    default: {}
}

})

module.exports = mongoose.model(
    'Clan',
    clanSchema
)
