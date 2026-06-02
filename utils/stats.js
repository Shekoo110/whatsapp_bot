function getTotalStats(player) {

    let atk = 0
    let hp = player.hp || 0
    let crit = player.crit || 0
    let dodge = player.dodge || 0

    const eq = player.equipment || {}

    const items = [eq.weapon, eq.armor, eq.accessory]

    for (const item of items) {
        if (!item) continue

        atk += item.attack || 0
        hp += item.hp || 0
        crit += item.crit || 0
        dodge += item.dodge || 0
    }

    return {
        attack: atk,
        hp,
        crit,
        dodge
    }
}

module.exports = {
    getTotalStats
}
