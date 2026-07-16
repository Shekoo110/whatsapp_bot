const abilities = {

    // =========================
    // One Piece
    // =========================

    'هاكي الملك': {
        chance: 20,
        damageMultiplier: 1.8,
        message:
        '👑 أطلق البوس هاكي الملك! ارتفع الضرر بشكل هائل!'
    },

    'ضربة غريفون': {
        chance: 18,
        damageMultiplier: 2,
        message:
        '⚔️ غريفون شق السماء وأصاب الجميع!'
    },

    'إرهاب الهاكي': {
        chance: 15,
        damageMultiplier: 1.6,
        stun: true,
        message:
        '😱 هيبة الهاكي أخرت الهجوم التالي!'
    },

    'قبضة الماغما': {
        chance: 20,
        damageMultiplier: 2.1,
        burn: true,
        message:
        '🌋 قبضة الماغما أحرقت شخصياتك!'
    },

    'حمم بركانية': {
        chance: 18,
        damageMultiplier: 1.9,
        message:
        '🔥 أمطار من الحمم البركانية!'
    },

    'عدالة مطلقة': {
        chance: 10,
        damageMultiplier: 2.5,
        message:
        '⚖️ العدالة المطلقة سحقت الجميع!'
    },

    'غضب العمالقة': {
        chance: 20,
        damageMultiplier: 1.8,
        message:
        '🪓 غضب العمالقة يهز أرض المعركة!'
    },

    'تحطيم الأرض': {
        chance: 18,
        damageMultiplier: 2,
        message:
        '💥 الأرض تحطمت تحت أقدامكم!'
    },

    'صرخة إلباف': {
        chance: 15,
        damageMultiplier: 1.7,
        message:
        '📢 صرخة إلباف أضعفت الجميع!'
    },

    'سم قاتل': {
        chance: 20,
        poison: true,
        damageMultiplier: 1.6,
        message:
        '☠️ السم بدأ ينتشر!'
    },

    'هيدرا السامة': {
        chance: 18,
        poison: true,
        damageMultiplier: 1.9,
        message:
        '🐍 هيدرا السامة هاجمت!'
    },

    'ضباب السم': {
        chance: 15,
        poison: true,
        damageMultiplier: 1.5,
        message:
        '🌫️ الضباب السام يغطي المكان!'
    },

    // =========================
    // Bleach
    // =========================

    'لهب الشمس': {
        chance: 20,
        burn: true,
        damageMultiplier: 2.2,
        message:
        '☀️ لهب الشمس أحرق الجميع!'
    },

    'زانباكتو النار': {
        chance: 18,
        damageMultiplier: 2,
        message:
        '🔥 الزانباكتو اشتعل بالكامل!'
    },

    'حرق شامل': {
        chance: 10,
        damageMultiplier: 2.8,
        message:
        '💀 حريق شامل التهم كل شيء!'
    },

    'لانزا ديل ريلامباغو': {
        chance: 20,
        damageMultiplier: 2,
        message:
        '⚡ لانزا ديل ريلامباغو أصابت الهدف!'
    },

    'ريسيون': {
        chance: 15,
        healBoss: 0.05,
        message:
        '🪽 البوس استعاد جزءاً من قوته!'
    },

    'سيرو أوسكوراس': {
        chance: 15,
        damageMultiplier: 2.3,
        message:
        '🌑 سيرو أوسكوراس دمر كل شيء!'
    },

    // =========================
    // Generic
    // =========================

    'برق الشيطان': {
        chance: 20,
        damageMultiplier: 2,
        message:
        '⚡ البرق الأسود ضرب الجميع!'
    },

    'سيف البرق': {
        chance: 18,
        damageMultiplier: 1.8,
        message:
        '⚔️ سيف البرق اخترق الدفاعات!'
    },

    'عاصفة الجحيم': {
        chance: 10,
        damageMultiplier: 2.7,
        message:
        '🌪️ عاصفة الجحيم اجتاحت الميدان!'
    }

}

module.exports = abilities
