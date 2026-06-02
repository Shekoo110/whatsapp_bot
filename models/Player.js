const mongoose = require('mongoose')

const PlayerSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true,
        unique: true
    },

    // =========================
    // BASIC
    // =========================
    pulls: { type: Number, default: 5 },
    towerTickets: { type: Number, default: 0 },
    lastReset: { type: Number, default: Date.now },

    characters: {
        type: Array,
        default: []
    },

    // =========================
    // HP SYSTEM (PvP CORE)
    // =========================
    hp: { type: Number, default: 10000 },
    maxHp: { type: Number, default: 10000 },

    crit: { type: Number, default: 5 },
    dodge: { type: Number, default: 3 },

    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },

    money: { type: Number, default: 0 },

    // =========================
    // PvP SYSTEM
    // =========================
    mmr: { type: Number, default: 1000 },
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },

    rank: {
        type: String,
        default: "برونزي"
    },

    lastPvP: {
        type: Number,
        default: 0
    },

    // =========================
    // DAILY SYSTEM
    // =========================
    fights: { type: Number, default: 5 },
    lastFightReset: { type: Number, default: Date.now },

    // =========================
    // BOSS SYSTEM
    // =========================
    bossDamage: { type: Number, default: 0 },
    lastBossAttack: { type: Number, default: 0 },

    // =========================
    // TOWER SYSTEM
    // =========================
    towerFloor: { type: Number, default: 1 },

    usedCharacters: {
        type: Array,
        default: []
    },

    towerCompleted: {
        type: Boolean,
        default: false
    },

    // =========================
    // BONUSES (PvP Boosts)
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
    // EQUIPMENT SYSTEM 🔥
    // =========================
    equipment: {
        weapon: { type: Object, default: null },
        armor: { type: Object, default: null },
        accessory: { type: Object, default: null }
    },

    inventory: {
        type: [
            {
                id: String,
                name: String,
                type: String, // weapon / armor / accessory
                rarity: String,

                attack: { type: Number, default: 0 },
                defense: { type: Number, default: 0 },
                hp: { type: Number, default: 0 },
                crit: { type: Number, default: 0 },
                dodge: { type: Number, default: 0 },

                price: { type: Number, default: 0 }
            }
        ],
        default: []
    },

    maxInventory: { type: Number, default: 20 },

    // =========================
    // SHOP SYSTEM
    // =========================
    shop: {
        items: {
            type: Array,
            default: []
        },
        lastRefresh: {
            type: Number,
            default: 0
        }
    },

    // =========================
    // MISC
    // =========================
    maxCharacters: { type: Number, default: 30 },
    title: { type: String, default: null },

    // =========================
    // BOXES
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
