const kuramaAbilities = [

{
    name: '🔥 كرة البيجو',
    chance: 10,
    type: 'damage',
    value: 6000
},

{
    name: '🌪 زئير الوحش',
    chance: 15,
    type: 'debuffDefense',
    value: 30
},

{
    name: '❤️ تجدد التشاكرا',
    chance: 8,
    type: 'heal',
    value: 50000
},

{
    name: '💢 غضب كوراما',
    chance: 10,
    type: 'buffDamage',
    value: 100
},

{
    name: '☄️ مخلب مدمر',
    chance: 12,
    type: 'extraDamage',
    value: 3000
},

{
    name: '🌋 هالة الكراهية',
    chance: 10,
    type: 'debuffAttack',
    value: 20
},

{
    name: '⚡ سرعة الوحش',
    chance: 8,
    type: 'dodge'
},

{
    name: '🩸 امتصاص التشاكرا',
    chance: 7,
    type: 'lifesteal',
    value: 2000
},

{
    name: '🌑 الظلام الأحمر',
    chance: 5,
    type: 'stun'
}

]

const juubiAbilities = [

{
    name: '🌌 قنبلة العشرة ذيول',
    chance: 5,
    type: 'damage',
    value: 12000
},

{
    name: '⚡ موجة تدمير',
    chance: 15,
    type: 'damage',
    value: 8000
},

{
    name: '🩸 امتصاص الحياة',
    chance: 10,
    type: 'lifesteal',
    value: 5000
},

{
    name: '☠️ لعنة الجوبي',
    chance: 5,
    type: 'stun'
},

{
    name: '🌍 نهاية العالم',
    chance: 3,
    type: 'damage',
    value: 25000
},

{
    name: '🌪 إعصار الدمار',
    chance: 10,
    type: 'damage',
    value: 10000
},

{
    name: '💀 انفجار الوحش',
    chance: 8,
    type: 'damage',
    value: 15000
},

{
    name: '🧿 عين الرينيغان',
    chance: 5,
    type: 'reflect',
    value: 50
},

{
    name: '🔥 سقوط النيازك',
    chance: 5,
    type: 'damage',
    value: 18000
},

{
    name: '👑 غضب الجوبي',
    chance: 5,
    type: 'buffDamage',
    value: 200
}

]

function getRandomAbility(list) {

    const total =
        list.reduce(
            (sum, a) =>
                sum + a.chance,
            0
        )

    let roll =
        Math.random() * total

    for (const ability of list) {

        roll -= ability.chance

        if (roll <= 0)
            return ability
    }

    return list[0]
}

function getKuramaAbility() {

    return getRandomAbility(
        kuramaAbilities
    )
}

function getJuubiAbility() {

    return getRandomAbility(
        juubiAbilities
    )
}

module.exports = {

    kuramaAbilities,
    juubiAbilities,

    getKuramaAbility,
    getJuubiAbility
}
