function calculateDamageAdvanced(attacker, defender) {

    let baseDamage = Math.floor(Math.random() * 600) + 300

    baseDamage += (attacker.level || 1) * 8

    const critChance = (attacker.crit || 5) + (attacker.critBonus || 0)
    const isCrit = Math.random() * 100 < critChance

    if (isCrit) baseDamage *= 2

    const defense = (defender.defenseBonus || 0) + (defender.level || 1) * 3
    baseDamage -= defense * 6

    if (baseDamage < 50) baseDamage = 50

    return {
        damage: Math.floor(baseDamage),
        crit: isCrit
    }
}

module.exports = {
    calculateDamageAdvanced
}
