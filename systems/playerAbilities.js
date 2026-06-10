// systems/playerAbilities.js

const playerAbilities = [

    // =====================
    // عادية (50%)
    // =====================

    {
        name: '⚔️ ضربة قوية',
        rarity: 'عادي',
        chance: 50,
        type: 'damage',
        multiplier: 1.20
    },

    {
        name: '🔥 غضب المحارب',
        rarity: 'عادي',
        chance: 50,
        type: 'damage',
        multiplier: 1.30
    },

    {
        name: '💨 سرعة البرق',
        rarity: 'عادي',
        chance: 50,
        type: 'dodge'
    },

    {
        name: '🛡️ دفاع حديدي',
        rarity: 'عادي',
        chance: 50,
        type: 'defense',
        value: 30
    },

    {
        name: '🎯 تركيز كامل',
        rarity: 'عادي',
        chance: 50,
        type: 'damage',
        multiplier: 1.25
    },

    {
        name: '⚡ طاقة المعركة',
        rarity: 'عادي',
        chance: 50,
        type: 'damage',
        multiplier: 1.35
    },

    // =====================
    // نادرة (30%)
    // =====================

    {
        name: '👁️ الشارينغان',
        rarity: 'نادر',
        chance: 30,
        type: 'damage',
        multiplier: 1.50
    },

    {
        name: '⚔️ هاكي التصلب',
        rarity: 'نادر',
        chance: 30,
        type: 'damage',
        multiplier: 1.60
    },

    {
        name: '🌊 تنفس الماء',
        rarity: 'نادر',
        chance: 30,
        type: 'damage',
        multiplier: 1.50
    },

    {
        name: '🔥 تنفس اللهب',
        rarity: 'نادر',
        chance: 30,
        type: 'damage',
        multiplier: 1.70
    },

    {
        name: '🩸 امتصاص الحياة',
        rarity: 'نادر',
        chance: 30,
        type: 'lifesteal',
        value: 10
    },

    {
        name: '⚡ الغريزة القتالية',
        rarity: 'نادر',
        chance: 30,
        type: 'damage',
        multiplier: 1.80
    },

    // =====================
    // أسطورية (15%)
    // =====================

    {
        name: '💀 سوسانو',
        rarity: 'أسطوري',
        chance: 15,
        type: 'damage',
        multiplier: 2
    },

    {
        name: '👑 هاكي الملوك',
        rarity: 'أسطوري',
        chance: 15,
        type: 'damage',
        multiplier: 2
    },

    {
        name: '☄️ قوة الكواكب',
        rarity: 'أسطوري',
        chance: 15,
        type: 'damage',
        multiplier: 2
    },

    {
        name: '🌌 الصحوة الكاملة',
        rarity: 'أسطوري',
        chance: 15,
        type: 'damage',
        multiplier: 2.5
    },

    {
        name: '⚔️ بانكاي',
        rarity: 'أسطوري',
        chance: 15,
        type: 'damage',
        multiplier: 2
    },

    {
        name: '🔥 أماتيراسو',
        rarity: 'أسطوري',
        chance: 15,
        type: 'damage',
        multiplier: 2
    },

    // =====================
    // ملحمية (4%)
    // =====================

    {
        name: '⚙️ جير 5',
        rarity: 'ملحمي',
        chance: 4,
        type: 'damage',
        multiplier: 3
    },

    {
        name: '🟣 رينيغان',
        rarity: 'ملحمي',
        chance: 4,
        type: 'damage',
        multiplier: 3
    },

    {
        name: '🌟 قوة البطل',
        rarity: 'ملحمي',
        chance: 4,
        type: 'damage',
        multiplier: 3
    },

    {
        name: '⚡ الغريزة الفائقة',
        rarity: 'ملحمي',
        chance: 4,
        type: 'damage',
        multiplier: 3
    },

    {
        name: '👹 نمط الوحش',
        rarity: 'ملحمي',
        chance: 4,
        type: 'damage',
        multiplier: 3
    },

    // =====================
    // كونية (1%)
    // =====================

    {
        name: '🌌 كسر الحدود',
        rarity: 'كوني',
        chance: 1,
        type: 'damage',
        multiplier: 5
    },

    {
        name: '👑 ملك الأكوان',
        rarity: 'كوني',
        chance: 1,
        type: 'damage',
        multiplier: 6
    },

    {
        name: '☀️ قوة الخالق',
        rarity: 'كوني',
        chance: 1,
        type: 'damage',
        multiplier: 7
    },

    {
        name: '♾️ اللانهاية',
        rarity: 'كوني',
        chance: 1,
        type: 'damage',
        multiplier: 8
    },

    {
        name: '🐉 تنين الأساطير',
        rarity: 'كوني',
        chance: 1,
        type: 'damage',
        multiplier: 10
    }

]

module.exports = {
    playerAbilities
}
