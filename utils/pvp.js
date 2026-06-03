function calculateDamageAdvanced(attacker, defender) {

    // Accuracy
    const hitChance =
        (attacker.accuracy || 100) -
        (defender.dodge || 0)

    if (
        Math.random() * 100 >
        Math.max(5, hitChance)
    ) {
        return {
            damage: 0,
            crit: false,
            dodge: true
        }
    }

    let damage =
        Math.floor(
            Math.random() * 600
        ) + 300

    damage +=
        (attacker.level || 1) * 8

    // Defense
    damage -=
        (defender.defense || 0)

    if (damage < 50)
        damage = 50

    // Critical
    const critChance =
        attacker.critRate || 0

    const isCrit =
        Math.random() * 100 <
        critChance

    if (isCrit) {

        damage =
            Math.floor(
                damage *
                (
                    1 +
                    (attacker.critDamage || 50)
                    / 100
                )
            )
    }

    return {
        damage,
        crit: isCrit,
        dodge: false
    }
}

module.exports = {
    calculateDamageAdvanced
}
