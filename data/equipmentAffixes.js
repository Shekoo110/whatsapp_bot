const affixes = [

    {
        id: "attack",
        name: "⚔ Attack",
        type: "attack",
        types: ["weapon", "accessory"],
        min: 15,
        max: 80
    },

    {
        id: "defense",
        name: "🛡 Defense",
        type: "defense",
        types: ["armor", "accessory"],
        min: 15,
        max: 80
    },

    {
        id: "hp",
        name: "❤️ HP",
        type: "hp",
        types: ["armor", "accessory"],
        min: 300,
        max: 1500
    },

    {
        id: "critRate",
        name: "🎯 Crit Rate",
        type: "critRate",
        types: ["weapon", "accessory"],
        min: 2,
        max: 18
    },

    {
        id: "critDamage",
        name: "💥 Crit Damage",
        type: "critDamage",
        types: ["weapon", "accessory"],
        min: 5,
        max: 45
    },

    {
        id: "bossDamage",
        name: "👹 Boss Damage",
        type: "bossDamage",
        types: ["weapon", "accessory"],
        min: 5,
        max: 35
    },

    {
        id: "lifesteal",
        name: "🩸 Lifesteal",
        type: "lifesteal",
        types: ["weapon", "accessory"],
        min: 3,
        max: 20
    },

    {
        id: "shield",
        name: "🛡 Shield",
        type: "shield",
        types: ["armor", "accessory"],
        min: 5,
        max: 35
    },

    {
        id: "reflect",
        name: "🪞 Reflect",
        type: "reflect",
        types: ["armor", "accessory"],
        min: 3,
        max: 20
    },

    {
        id: "dodge",
        name: "👻 Dodge",
        type: "dodge",
        types: ["armor", "accessory"],
        min: 2,
        max: 18
    },

    {
        id: "accuracy",
        name: "🎯 Accuracy",
        type: "accuracy",
        types: ["weapon", "accessory"],
        min: 3,
        max: 25
    }

]

// =========================
// Helpers
// =========================

function random(min, max) {

    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min

}

function clone(obj) {

    return JSON.parse(
        JSON.stringify(obj)
    )

}

function getAffixCount(rarity) {

    switch (rarity) {

        case "Rare":
            return 1

        case "Epic":
            return 2

        case "Legendary":
            return 3

        case "Mythical":
            return 4

        default:
            return 1

    }

}
// =========================
// Generate Equipment
// =========================

function generateEquipment(template) {

    const item = clone(template)

    // =========================
    // Generate Base Stats
    // =========================

    const generatedStats = {}

    for (const stat in item.stats) {

        const value = item.stats[stat]

        if (Array.isArray(value)) {

            generatedStats[stat] = random(
                value[0],
                value[1]
            )

        } else {

            generatedStats[stat] = value

        }

    }

    item.stats = generatedStats

    // =========================
    // Available Affixes
    // =========================

    const available = affixes.filter(a =>
        a.types.includes(item.type)
    )

    const count = getAffixCount(
        item.rarity
    )

    const selected = []

    const used = new Set()

    const pool = [...available]

while (

    selected.length < count &&
    pool.length > 0

) {

    const index = random(
        0,
        pool.length - 1
    )

    const affix = pool.splice(index, 1)[0]

    selected.push({

        id: affix.id,

        name: affix.name,

        type: affix.type,

        value: random(
            affix.min,
            affix.max
        )

    })

}

    item.affixes = selected

item.stars = {

    Rare: 1,
    Epic: 2,
    Legendary: 3,
    Mythical: 4

}[item.rarity]

item.starText = "⭐".repeat(item.stars)

item.createdAt = Date.now()

return item

}
module.exports = {

    affixes,

    generateEquipment

}
