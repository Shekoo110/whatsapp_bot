const equipments = require('../data/equipments')
const boxes = require('../data/equipmentBoxes')

const {
    generateEquipment
} = require('../data/equipmentAffixes')

// =========================
// Helpers
// =========================

function random(min, max) {

    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min

}

function choose(list) {

    return list[
        random(
            0,
            list.length - 1
        )
    ]

}

// =========================
// Choose Rarity
// =========================

function rollRarity(boxId) {

    const box = boxes[boxId]

    if (!box) {

        return null

    }

    const roll = random(1, 100)

    let total = 0

    for (const drop of box.drops) {

        total += drop.chance

        if (roll <= total) {

            return drop.rarity

        }

    }

    return box.drops[0].rarity

}

// =========================
// Random Equipment
// =========================

function getRandomEquipment(rarity) {

    const pool = equipments.filter(

        item => item.rarity === rarity

    )

    if (!pool.length) {

        return null

    }

    return choose(pool)

}

// =========================
// Open Equipment Box
// =========================

function openEquipmentBox(boxId) {

    const rarity = rollRarity(boxId)

    if (!rarity) {

        return null

    }

    const template = getRandomEquipment(

        rarity

    )

    if (!template) {

        return null

    }

    const item = generateEquipment(
    template
)

// =========================
// Equipment Quality
// =========================

const qualityRoll = random(1, 100)

if (qualityRoll <= 5) {

    item.quality = "Perfect"
    item.qualityBonus = 30

} else if (qualityRoll <= 20) {

    item.quality = "Excellent"
    item.qualityBonus = 20

} else if (qualityRoll <= 50) {

    item.quality = "Fine"
    item.qualityBonus = 10

} else {

    item.quality = "Normal"
    item.qualityBonus = 0

}

// =========================
// Equipment Level
// =========================

item.level = 0

// =========================
// Apply Quality Bonus
// =========================

for (const stat in item.stats) {

    item.stats[stat] += Math.floor(
        item.stats[stat] *
        item.qualityBonus / 100
    )

}

for (const affix of item.affixes) {

    affix.value += Math.floor(
        affix.value *
        item.qualityBonus / 100
    )

}

return item

}
// =========================
// Equip Item
// =========================

function equipItem(player, itemId) {

    const index = player.inventory.findIndex(

        item => item.id === itemId

    )

    if (index === -1) {

        return {

            success: false,

            message: "المعدة غير موجودة."

        }

    }

    const item = player.inventory[index]

    const slot = item.type

    // إذا كان هناك قطعة مجهزة بنفس النوع
    if (player.equipment[slot]) {

        player.inventory.push(

            player.equipment[slot]

        )

    }

    player.equipment[slot] = item

    player.inventory.splice(index, 1)

    return {

        success: true,

        item

    }

}

// =========================
// Unequip Item
// =========================

function unequipItem(player, slot) {

    if (!player.equipment[slot]) {

        return {

            success: false,

            message: "لا يوجد عنصر مجهز."

        }

    }

    if (

        player.inventory.length >=

        player.maxInventory

    ) {

        return {

            success: false,

            message: "الحقيبة ممتلئة."

        }

    }

    player.inventory.push(

        player.equipment[slot]

    )

    player.equipment[slot] = null

    return {

        success: true

    }

}
// =========================
// Calculate Equipment Stats
// =========================

function calculateEquipmentStats(player) {

    const bonus = {

        attack: 0,
        defense: 0,
        hp: 0,

        critRate: 0,
        critDamage: 0,

        dodge: 0,
        accuracy: 0,

        shield: 0,
        lifesteal: 0,

        reflect: 0,
        bossDamage: 0

    }

    const slots = [

        player.equipment.weapon,
        player.equipment.armor,
        player.equipment.accessory

    ]

    for (const item of slots) {

        if (!item) continue

        // Base Stats
        for (const stat in item.stats) {

            if (bonus[stat] == null)

                bonus[stat] = 0

            bonus[stat] += item.stats[stat]

        }

        // Affixes
        if (item.affixes) {

            for (const affix of item.affixes) {

                if (bonus[affix.type] == null)

                    bonus[affix.type] = 0

                bonus[affix.type] += affix.value

            }

        }

    }

    return bonus

}

// =========================
// Sell Equipment
// =========================

function sellEquipment(player, uid) {

    const index = player.inventory.findIndex(

        item => item.uid === uid

    )

    if (index === -1) {

        return {

            success: false,

            message: "المعدة غير موجودة."

        }

    }

    const item = player.inventory[index]

    const price = item.sellPrice || 5000

    player.money += price

    player.inventory.splice(index, 1)

    return {

        success: true,

        gold: price,

        item

    }

}

// =========================
// Remove Equipment
// =========================

function removeEquipment(player, uid) {

    const index = player.inventory.findIndex(

        item => item.uid === uid

    )

    if (index === -1) {

        return false

    }

    player.inventory.splice(index, 1)

    return true

}

// =========================
// Exports
// =========================

module.exports = {

    openEquipmentBox,

    equipItem,

    unequipItem,

    calculateEquipmentStats,

    sellEquipment,

    removeEquipment

}
