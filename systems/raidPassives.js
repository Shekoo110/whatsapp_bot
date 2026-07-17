// =========================
// RAID PASSIVE SKILLS
// =========================

module.exports = {

    // =====================
    // غضب
    // يزيد ضرر الزعيم
    // =====================
    rage(raid) {

        raid.bossAttack = Math.floor(
            raid.bossAttack * 1.20
        )

        return {
            text:
            "😡 غضب الزعيم! ازداد ضرره بنسبة 20%.",
            save: true
        }

    },

    // =====================
    // شفاء
    // =====================
    heal(raid) {

        const heal =
        Math.floor(
            raid.maxHp * 0.05
        )

        raid.hp = Math.min(
            raid.maxHp,
            raid.hp + heal
        )

        return {

            text:
            `💚 الزعيم استعاد ${heal.toLocaleString()} HP.`,

            save: true

        }

    },

    // =====================
    // درع
    // =====================
    shield(raid) {

        raid.shield =
        (raid.shield || 0) + 30000

        return {

            text:
            "🛡️ الزعيم كوّن درعاً بقيمة 30,000.",

            save: true

        }

    },

    // =====================
    // هجوم مضاد
    // =====================
    counter(raid) {

        raid.counter = true

        return {

            text:
            "⚔️ الزعيم أصبح جاهزاً للهجوم المضاد.",

            save: true

        }

    },

    // =====================
    // هيجان
    // =====================
    berserk(raid) {

        raid.bossAttack = Math.floor(
            raid.bossAttack * 2
        )

        return {

            text:
            "☠️ دخل الزعيم في طور الهيجان وتضاعف ضرره!",

            save: true

        }

    },

    // =====================
    // سم
    // =====================
    poison(raid) {

        raid.poison = true

        return {

            text:
            "☠️ الزعيم نشر السم في أرض المعركة.",

            save: true

        }

    },

    // =====================
    // حريق
    // =====================
    burn(raid) {

        raid.burn = true

        return {

            text:
            "🔥 الزعيم أشعل أرض المعركة.",

            save: true

        }

    },

    // =====================
    // برق
    // =====================
    lightning(raid) {

        raid.lightning = true

        return {

            text:
            "⚡ البرق يحيط بالزعيم.",

            save: true

        }

    },

    // =====================
    // استدعاء
    // =====================
    summon(raid) {

        raid.summon = true

        return {

            text:
            "👥 الزعيم استدعى مساعديه.",

            save: true

        }

    }

}
