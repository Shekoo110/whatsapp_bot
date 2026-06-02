function getSkillDamage(type, attacker) {

    const base = Math.floor(Math.random() * 500) + 300

    // ⚔️ Normal
    if (type === "normal") {
        return {
            damage: base,
            cooldown: 0
        }
    }

    // 🔵 Skill
    if (type === "skill") {

        const dmg = base + (attacker.level * 15)

        return {
            damage: dmg,
            cooldown: 3
        }
    }

    // 🔴 Ultimate
    if (type === "ultimate") {

        const chance = Math.random()

        if (chance < 0.7) {
            return {
                damage: base * 2 + 500,
                cooldown: 8
            }
        }

        // فشل المهارة
        return {
            damage: 0,
            failed: true,
            cooldown: 10
        }
    }
}

module.exports = {
    getSkillDamage
}
