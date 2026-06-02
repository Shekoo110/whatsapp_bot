function calculateDamage(attacker, defender) {

    // 🔥 قاعدة ضرر أساسية
    let baseDamage = Math.floor(Math.random() * 600) + 300

    // 📈 تأثير المستوى
    baseDamage += (attacker.level || 1) * 8

    // 🎯 الكريت (crit)
    const critChance = (attacker.crit || 5) + (attacker.critBonus || 0)
    const isCrit = Math.random() * 100 < critChance

    if (isCrit) {
        baseDamage *= 2
    }

    // 🛡️ الدفاع يقلل الضرر
    const defense = (defender.defenseBonus || 0) + (defender.level || 1) * 3
    baseDamage -= defense * 6

    // ❤️ حد أدنى للضرر
    if (baseDamage < 50) baseDamage = 50

    // 🎯 احتمال تفادي بسيط (dodge check داخل القتال لاحقًا)
    const finalDamage = Math.floor(baseDamage)

    return {
        damage: finalDamage,
        crit: isCrit
    }
}

module.exports = {
    calculateDamage
}
