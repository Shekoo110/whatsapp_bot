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
    
    maxCharacters: {
    type: Number,
    default: 30
},

    // =========================
// HP SYSTEM (PvP CORE)
// =========================
hp: { type: Number, default: 10000 },
maxHp: { type: Number, default: 10000 },

critRate: { type: Number, default: 5 },
critDamage: { type: Number, default: 50 },

dodge: { type: Number, default: 3 },

defense: { type: Number, default: 0 },
accuracy: { type: Number, default: 100 },

shield: { type: Number, default: 0 },
lifesteal: { type: Number, default: 0 },

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

    skillCooldown: { type: Number, default: 0 },
ultimateCooldown: { type: Number, default: 0 },

    // =========================
    // DAILY SYSTEM
    // =========================
    fights: { type: Number, default: 5 },
    lastFightReset: { type: Number, default: Date.now },

// =========================
// BOSS SYSTEM
// =========================

bossDamage: {
    type: Number,
    default: 0
},

totalBossDamage: {
    type: Number,
    default: 0
},

bossHits: {
    type: Number,
    default: 0
},

lastBossAttack: {
    type: Number,
    default: 0
},

bossHp: {
    type: Number,
    default: 0
},

bossMaxHp: {
    type: Number,
    default: 0
},

bossDead: {
    type: Boolean,
    default: false
},

bossRespawn: {
    type: Date,
    default: null
},

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

critRateBonus: { type: Number, default: 0 },
critDamageBonus: { type: Number, default: 0 },

dodgeBonus: { type: Number, default: 0 },

accuracyBonus: { type: Number, default: 0 },
shieldBonus: { type: Number, default: 0 },

lifestealBonus: { type: Number, default: 0 },

reflectBonus: { type: Number, default: 0 },

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

critRate: { type: Number, default: 0 },
critDamage: { type: Number, default: 0 },

dodge: { type: Number, default: 0 },

accuracy: { type: Number, default: 0 },

shield: { type: Number, default: 0 },
lifesteal: { type: Number, default: 0 },

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
// BEAST SYSTEM
// =========================

eggTickets: {
    type: Number,
    default: 0
},

// عدد البيوض التي يملكها اللاعب
beastEggs: {
    type: Number,
    default: 0
},

// الوحوش المملوكة
ownedBeasts: {
    type: [String],
    default: []
},

// الوحش المجهز حالياً
equippedBeast: {
    type: String,
    default: null
},

// عدد البيوض المفتوحة
beastEggsOpened: {
    type: Number,
    default: 0
},

// عدد مرات المشاركة بقتل الوحوش العالمية
beastKills: {
    type: Number,
    default: 0
},
    beastCollection: {
    type: Number,
    default: 0
},
    

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
