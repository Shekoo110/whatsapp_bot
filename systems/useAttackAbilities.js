const PLAYER_SKILLS = {

"👁️ شارينغان": {
    chance: 100,
    multiplier: 1.8,
    text: "👁️ شارينغان ×1.8"
},

"⚔️ عين الصقر": {
    chance: 90,
    multiplier: 1.25,
    text: "⚔️ عين الصقر +25%"
},

"💀 سوسانو": {
    chance: 85,
    multiplier: 1.20,
    text: "💀 سوسانو +20%"
},

"🐉 تنين الأساطير": {
    chance: 80,
    multiplier: 1.30,
    text: "🐉 تنين الأساطير +30%"
},

"☄️ قوة الكواكب": {
    chance: 75,
    multiplier: 1.35,
    text: "☄️ قوة الكواكب +35%"
},

"⚔️ سيد المعارك": {
    chance: 70,
    multiplier: 1.50,
    text: "⚔️ سيد المعارك +50%"
},

"👹 قوة الشياطين": {
    chance: 65,
    multiplier: 1.45,
    text: "👹 قوة الشياطين +45%"
},

"🌟 الحاكم المطلق": {
    chance: 60,
    multiplier: 2.0,
    text: "🌟 الحاكم المطلق ×2"
}

}

function useAttackAbilities({ player, character, damage }) {

    let randomText = ''
    let playerText = ''

    const roll = Math.random() * 100

    const critChance =
        (player.critRate || 0) +
        (player.critRateBonus || 0)

    if (roll <= critChance) {

        damage *= 2

        randomText += `
🔥 قدرة مفعلة

⚡ ضربة حرجة

📖 ضاعف الضرر ×2`

    } else if (roll <= 25) {

        damage = Math.floor(damage * 1.5)

        randomText += `
👑 قدرة مفعلة

⚡ هاكي الملك

📖 زاد الضرر 50%`

    } else if (roll <= 33) {

        damage = Math.floor(damage * 1.4)

        randomText += `
✨ قدرة مفعلة

⚡ استيقاظ

📖 زاد الضرر 40%`

    } else if (roll <= 45) {

        damage *= 2

        randomText += `
⚡ قدرة مفعلة

⚡ سرعة خارقة

📖 ضاعف الضرر ×2`

    } else if (roll <= 55) {

        damage = Math.floor(damage * 1.8)

        randomText += `
🍀 قدرة مفعلة

🍀 ضربة الحظ

📖 زاد الضرر ×1.8`

    } else if (roll <= 68) {

        damage = Math.floor(damage * 2.2)

        randomText += `
⚔️ قدرة مفعلة

⚔️ سلسلة الضربات

📖 زاد الضرر ×2.2`

    } else if (roll <= 78) {

        damage = Math.floor(damage * 3)

        randomText += `
💥 قدرة مفعلة

💥 الضربة الساحقة

📖 زاد الضرر ×3`

    } else if (roll <= 86) {

        damage = Math.floor(damage * 2)

        randomText += `
🔥 قدرة مفعلة

🔥 غضب المحارب

📖 زاد الضرر ×2`

    } else if (roll <= 92) {

        damage = Math.floor(damage * 3.5)

        randomText += `
👑 قدرة مفعلة

👑 إرادة المنتصر

📖 زاد الضرر ×3.5`

} else if (roll <= 97) {

    damage = Math.floor(damage * 5)

    randomText += `
🌠 قدرة مفعلة

🌠 ضربة القدر

📖 زاد الضرر ×5`

} else if (roll <= 99) {

    damage = Math.floor(damage * 6)

    randomText += `
💀 قدرة مفعلة

💀 إبادة كاملة

📖 زاد الضرر ×6`

} else {

    damage = Math.floor(damage * 4)

    randomText += `
🐲 قدرة مفعلة

🐲 روح التنين

📖 زاد الضرر ×4`
}

    const abilityRoll = Math.random() * 100

    const addSkill = (name) => {

        const skill = PLAYER_SKILLS[name]

        if (!skill) return

        if (
            player.specialAbilities?.includes(name) &&
            abilityRoll <= skill.chance
        ) {

            damage = Math.floor(
                damage * skill.multiplier
            )

            playerText += `${skill.text}\n`
        }

    }

    addSkill("👁️ شارينغان")
    addSkill("⚔️ عين الصقر")
    addSkill("💀 سوسانو")
    addSkill("🐉 تنين الأساطير")
    addSkill("☄️ قوة الكواكب")
    addSkill("⚔️ سيد المعارك")
    addSkill("👹 قوة الشياطين")
    addSkill("🌟 الحاكم المطلق")

    return {
        damage,
        randomText,
        playerText
    }

}

module.exports = useAttackAbilities
