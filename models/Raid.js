const mongoose = require("mongoose")

const RaidSchema = new mongoose.Schema({

    // هل يوجد رايد يعمل الآن
    active: {
        type: Boolean,
        default: false
    },

    // اسم الأنمي
    anime: {
        type: String,
        default: ""
    },

    // اسم المملكة
    kingdom: {
        type: String,
        default: ""
    },

    // صورة الزعيم
    bossImage: {
        type: String,
        default: ""
    },

    // اسم الزعيم
bossName: {
    type: String,
    default: ""
},

// المرحلة الثانية
phase2: {
    type: Boolean,
    default: false
},

// المرحلة الثالثة
phase3: {
    type: Boolean,
    default: false
},

// مجموع الضرر
totalDamage: {
    type: Number,
    default: 0
},

// خريطة الضرر
damageMap: {
    type: Map,
    of: Number,
    default: {}
},

// وقت انتهاء الرايد
endedAt: {
    type: Number,
    default: 0
},

    // قدرة المملكة الحالية
    kingdomAbility: {
        type: String,
        default: ""
    },

    // قدرة الزعيم
    bossAbility: {
        type: String,
        default: ""
    },

    // المستوى
    level: {
        type: Number,
        default: 1
    },

    // صحة الزعيم
    hp: {
        type: Number,
        default: 0
    },

    maxHp: {
        type: Number,
        default: 0
    },

    // ضرر الزعيم
bossAttack: {
    type: Number,
    default: 0
},

    // دفاعه
    defense: {
        type: Number,
        default: 0
    },

    // نسبة الكريتيكال
    critRate: {
        type: Number,
        default: 10
    },

    // متى بدأ
    startedAt: {
        type: Number,
        default: 0
    },

    // متى ينتهي
    endsAt: {
        type: Number,
        default: 0
    },

    // آخر هجمة في الرايد (تبريد 30 ثانية)
    lastAttack: {
        type: Number,
        default: 0
    },

    // جميع المشاركين
    participants: [
        {

            userId: String,

            damage: {
                type: Number,
                default: 0
            },

            hits: {
                type: Number,
                default: 0
            },

            totalCritical: {
                type: Number,
                default: 0
            },

            totalDodges: {
                type: Number,
                default: 0
            },

            deadCharacters: {
                type: Number,
                default: 0
            }

        }
    ]

})

module.exports =
mongoose.model(
    "Raid",
    RaidSchema
)
