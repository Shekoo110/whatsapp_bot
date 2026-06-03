function getTotalStats(player) {

    let atk = 0
    let hp = player.hp || 0

    let crit = player.crit || 0
    let dodge = player.dodge || 0

    let defense = 0
    let accuracy = 0
    let critRate = 0
    let critDamage = 0
    let shield = 0
    let lifesteal = 0

    const eq = player.equipment || {}

    const items = [
        eq.weapon,
        eq.armor,
        eq.accessory
    ]

    for (const item of items) {

        if (!item) continue

        atk += item.attack || 0
        hp += item.hp || 0

        crit += item.crit || 0
        dodge += item.dodge || 0

        defense += item.defense || 0
        accuracy += item.accuracy || 0
        critRate += item.critRate || 0
        critDamage += item.critDamage || 0
        shield += item.shield || 0
        lifesteal += item.lifesteal || 0
    }

    return {
        attack: atk,
        hp,
        dodge,
        defense,
        accuracy,
        critRate,
        critDamage,
        shield,
        lifesteal
    }
}
