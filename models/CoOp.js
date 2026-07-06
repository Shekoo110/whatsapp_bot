const mongoose = require('mongoose')

const CoOpSchema = new mongoose.Schema({

    // =========================
    // CO-OP STATUS
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

        type: Array,

        default: []

    },

    // كل لاعب سيكون بالشكل التالي

    /*
    {

        userId,

        name,

        damage,

        totalDamage,

        currentCharacter,

        finished,

        characters:[

            {

                name,

                power,

                hp,

                maxHp,

                shield,

                alive,

                urAbilities,

                omegaAbility

            }

        ]

    }
    */

    // =========================
    // DAMAGE RANKING
    // =========================

    leaderboard: {

        type: Array,

        default: []

    },

    // =========================
    // BATTLE LOG
    // =========================

    battleLog: {

        type: Array,

        default: []

    },

    // =========================
    // REWARDS
    // =========================

    rewardsClaimed: {

        type: Array,

        default: []

    }

})

module.exports = mongoose.model("CoOp", CoOpSchema)
