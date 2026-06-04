const mongoose = require('mongoose')

const PvPSchema = new mongoose.Schema({

    shield1: { type: Number, default: 0 },
shield2: { type: Number, default: 0 },

team1: {
    type: Array,
    default: []
},

team2: {
    type: Array,
    default: []
},

turn: { type: String, required: true },

active: { type: Boolean, default: false },

lastMove: { type: Date, default: Date.now },

    // =========================
    // 🔥 STATUS EFFECTS SYSTEM
    // =========================

    burn: {
        player1: { type: Number, default: 0 },
        player2: { type: Number, default: 0 }
    },

    poison: {
        player1: { type: Number, default: 0 },
        player2: { type: Number, default: 0 }
    },

    stun: {
        player1: { type: Number, default: 0 },
        player2: { type: Number, default: 0 }
    },

    freeze: {
        player1: { type: Number, default: 0 },
        player2: { type: Number, default: 0 }
    },

    createdAt: { type: Date, default: Date.now }

})

module.exports = mongoose.model('PvP', PvPSchema)
