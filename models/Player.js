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

    towerTickets: {
        type: Number,
        default: 0
    },

    lastReset: {
        type: Number,
        default: Date.now
    },

    characters: {
        type: Array,
        default: []
    },

    // =========================
    // HP SYSTEM (PvP)
    // =========================

    hp: {
        type: Number,
        default: 10000
    },

    maxHp: {
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

    // =========================
    // PvP System
    // =========================

    mmr: {
        type: Number,
        default: 1000
    },

    wins: {
        type: Number,
        default: 0
    },

    losses: {
        type: Number,
        default: 0
    },

    rank: {
        type: String,
        default: "برونزي"
    },

    // =========================
    // Daily fights
    // =========================

    fights: {
        type: Number,
        default: 5
    },

    lastFightReset: {
        type: Number,
        default: Date.now
    },

    lastPvP: {
        type: Number,
        default: 0
    },

    // =========================
    // Boss system
    // =========================

    bossDamage: {
        type: Number,
        default: 0
    },

    lastBossAttack: {
        type: Number,
        default: 0
    },

    // =========================
    // Tower system
    // =========================

    towerFloor: {
        type: Number,
        default: 1
    },

    usedCharacters: {
        type: Array,
        default: []
    },

    towerCompleted: {
        type: Boolean,
        default: false
    },

    // =========================
    // Bonuses
    // =========================

    attackBonus: { type: Number, default: 0 },
    defenseBonus: { type: Number, default: 0 },
    hpBonus: { type: Number, default: 0 },
    critBonus: { type: Number, default: 0 },
    dodgeBonus: { type: Number, default: 0 },
    reflectBonus: { type: Number, default: 0 },
    lifestealBonus: { type: Number, default: 0 },
    bossDamageBonus: { type: Number, default: 0 },

    specialAbilities: {
        type: [String],
        default: []
    },

    // =========================
    // EQUIPMENT SYSTEM (NEW 🔥)
    // =========================

    equipment: {
        weapon: { type: Object, default: null },
        armor: { type: Object, default: null },
        accessory: { type: Object, default: null }
    },

    inventory: {
        type: Array,
        default: []
    },

    maxInventory: {
        type: Number,
        default: 20
    },

    maxCharacters: {
        type: Number,
        default: 30
    },

    title: {
        type: String,
        default: null
    },

    // =========================
    // Boxes
    // =========================

    boxes: {
        basic: { type: Number, default: 0 },
        rare: { type: Number, default: 0 },
        epic: { type: Number, default: 0 },
        legendary: { type: Number, default: 0 },
        sss_chance: { type: Number, default: 0 },
        sss_high: { type: Number, default: 0 }
    }

})

module.exports = mongoose.model('Player', PlayerSchema)
