const raidAbilities =
require('./raidAbilities')

// =========================
// قدرات هجومية عشوائية
// =========================

const RAID_ATTACK_ABILITIES = [

{
    chance: 18,
    multiplier: 1.5,
    text:
    "⚔️ ضربة خاطفة ×1.5"
},

{
    chance: 15,
    multiplier: 1.8,
    text:
    "🔥 انفجار الطاقة ×1.8"
},

{
    chance: 13,
    multiplier: 2,
    text:
    "💥 الضربة الساحقة ×2"
},

{
    chance: 10,
    multiplier: 2.5,
    text:
    "👑 إرادة البطل ×2.5"
},

{
    chance: 8,
    multiplier: 3,
    text:
    "🌌 استيقاظ كامل ×3"
},

{
    chance: 6,
    multiplier: 3.5,
    text:
    "🐉 غضب التنين ×3.5"
},

{
    chance: 5,
    multiplier: 4,
    text:
    "⚡ سرعة البرق ×4"
},

{
    chance: 4,
    multiplier: 4.5,
    text:
    "☄️ سقوط النيزك ×4.5"
},

{
    chance: 3,
    multiplier: 5,
    text:
    "💀 إبادة كاملة ×5"
},

{
    chance: 2,
    multiplier: 6,
    text:
    "🌠 ضربة القدر ×6"
},

{
    chance: 1,
    multiplier: 8,
    text:
    "👑 القوة المطلقة ×8"
}

]

// =========================
// حساب ضرر اللاعب
// =========================

function calculatePlayerDamage(player){

    let totalDamage = 0

    let crit = false
    let dodge = false

    let abilityText = ''

    if(
        !player.characters ||
        !player.characters.length
    ){

        return {

            damage:0,

            crit:false,

            dodge:false,

            abilityText:''

        }

    }

    for(
        const character of player.characters
    ){

        if(character.dead)
            continue

        if(
            character.currentHp !== undefined &&
            character.currentHp <= 0
        ){
            continue
        }

        let damage =
        character.power || 0

        // =====================
        // التطوير
        // =====================

        damage +=
        (character.evolutionLevel || 0)
        *500

        // =====================
        // قدرات UR
        // =====================

        if(character.urAbilities){

            for(
                const skill
                of character.urAbilities
            ){

                if(skill.damageBonus){

                    damage +=
                    skill.damageBonus

                }

                if(skill.damageMultiplier){

                    damage *=
                    skill.damageMultiplier

                }

            }

        }

        totalDamage += damage

    }
      // =====================
    // الكريتيكال
    // =====================

    const critChance =
        (player.critRate || 0) +
        (player.critRateBonus || 0)

    if (
        Math.random() * 100 <=
        critChance
    ) {

        crit = true

        const critDamage =
            (player.critDamage || 50) +
            (player.critDamageBonus || 0)

        totalDamage *=
            1 + (critDamage / 100)

        abilityText +=
`🔥 ضربة حرجة

`
    }

    // =====================
    // قدرات الرايد العشوائية
    // =====================

    for (
        const ability of
        RAID_ATTACK_ABILITIES
    ) {

        if (
            Math.random() * 100 <=
            ability.chance
        ) {

            totalDamage *=
                ability.multiplier

            abilityText +=
`${ability.text}

`

        }

    }

    // =====================
    // قدرات اللاعب الخاصة
    // =====================

    if (
        player.specialAbilities &&
        player.specialAbilities.length
    ) {

        for (
            const name of
            player.specialAbilities
        ) {

            const ability =
                raidAbilities[name]

            if (!ability)
                continue

            if (
                Math.random() * 100 <=
                ability.chance
            ) {

                totalDamage *=
                    ability.multiplier

                abilityText +=
`${ability.text}

`

            }

        }

    }

    // =====================
    // دودج
    // =====================

    const dodgeChance =
        (player.dodge || 0) +
        (player.dodgeBonus || 0)

    if (
        Math.random() * 100 <=
        dodgeChance
    ) {

        dodge = true

    }

    return {

        damage:
            Math.floor(
                totalDamage
            ),

        crit,

        dodge,

        abilityText

    }

}

// =========================
// EXPORTS
// =========================

module.exports = {

    calculatePlayerDamage

}
