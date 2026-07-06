const mongoose = require('mongoose')

// =========================
// CHARACTER
// =========================

const CharacterSchema = new mongoose.Schema({

    name: String,

    power: Number,

    hp: Number,

    maxHp: Number,

    shield: {
        type: Number,
        default: 0
    },

    alive: {
        type: Boolean,
        default: true
    },

    urAbilities: {
        type: Array,
        default: []
    },

    omegaAbility: {
        type: Object,
        default: null
    }

}, { _id: false })

// =========================
// PLAYER
// =========================

const RaidPlayerSchema = new mongoose.Schema({

    userId: String,

    name: String,

    damage: {
        type: Number,
        default: 0
    },

    totalDamage: {
        type: Number,
        default: 0
    },

    currentCharacter: {
        type: Number,
        default: 0
    },

    finished: {
        type: Boolean,
        default: false
    },

    characters: {
        type: [CharacterSchema],
        default: []
    }

}, { _id: false })

// =========================
// LEADERBOARD
// =========================

const LeaderboardSchema = new mongoose.Schema({

    userId: String,

    name: String,

    damage: Number

}, { _id: false })

// =========================
// CO-OP
// =========================

const CoOpSchema = new mongoose.Schema({

    // =========================
    // STATUS
    // =========================

    active: {
        type: Boolean,
        default: false
    },

    // idle / waiting / battle / finished
    status: {
        type: String,
        default: "idle"
    },

    // =========================
    // TIMERS
    // =========================

    nextSpawn: {
        type: Number,
        default: 0
    },

    joinEnd: {
        type: Number,
        default: 0
    },

    turnEnd: {
        type: Number,
        default: 0
    },

    // =========================
    // TURN SYSTEM
    // =========================

    round: {
        type: Number,
        default: 1
    },

    currentTurn: {
        type: Number,
        default: 0
    },

    // =========================
    // BOSS
    // =========================

    boss: {

        id: String,

        name: String,

        anime: String,

        rank: String,

        image: String,

        hp: Number,

        maxHp: Number,

        shield: {
            type: Number,
            default: 0
        },

        phase: {
            type: Number,
            default: 1
        },

        skills: {
            type: Array,
            default: []
        },

        buffs: {
            type: Array,
            default: []
        },

        debuffs: {
            type: Array,
            default: []
        }

    },

    // =========================
    // PLAYERS
    // =========================

    players: {
        type: [RaidPlayerSchema],
        default: []
    },

    // =========================
    // DAMAGE RANKING
    // =========================

    leaderboard: {
        type: [LeaderboardSchema],
        default: []
    },

    // =========================
    // BATTLE LOG
    // =========================

    battleLog: {
        type: [String],
        default: []
    },

    // =========================
    // REWARDS
    // =========================

    rewardsClaimed: {
        type: [String],
        default: []
    }

})

module.exports = mongoose.model("CoOp", CoOpSchema)
