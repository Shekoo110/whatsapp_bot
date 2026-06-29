function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5)
}

function useEXAbilities(character) {

    const abilities = character.urAbilities || []

    // جميع القدرات تعمل مهما كان عددها
    const selected = [...abilities]

    const result = {

        abilitiesUsed: [],

        attackBonus: 0,
        defenseBonus: 0,
        bossDamage: 0,
        critRate: 0,
        critDamage: 0,
        dodge: 0,
        shield: 0,
        lifesteal: 0,
        reflect: 0

    }

    for (const ability of selected) {

        result.abilitiesUsed.push(ability)

        switch (ability.type) {

            case 'attack':
                result.attackBonus += ability.value
                break

            case 'defense':
                result.defenseBonus += ability.value
                break

            case 'bossDamage':
                result.bossDamage += ability.value
                break

            case 'critRate':
                result.critRate += ability.value
                break

            case 'critDamage':
                result.critDamage += ability.value
                break

            case 'dodge':
                result.dodge += ability.value
                break

            case 'shield':
                result.shield += ability.value
                break

            case 'lifesteal':
                result.lifesteal += ability.value
                break

            case 'reflect':
                result.reflect += ability.value
                break

        }

    }

    return result
}

module.exports = useEXAbilities
