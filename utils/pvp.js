function calculateDamage(attacker, defender) {

    const baseDamage = Math.floor(Math.random() * 500) + 300

    const critChance = attacker.crit || 5
    const isCrit = Math.random() * 100 < critChance

    let damage = baseDamage

    if (isCrit) {
        damage *= 2
    }

    // تقليل الضرر حسب الدفاع
    const defense = defender.defenseBonus || 0
    damage = Math.max(50, damage - defense * 10)

    return {
        damage: Math.floor(damage),
        crit: isCrit
    }
}

module.exports = {
    calculateDamage
}
