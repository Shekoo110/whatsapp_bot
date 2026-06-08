const Player =
require('./models/Player')

const characters =
require('./characters.json')

async function giveReward(
userId
) {

const player =
    await Player.findOne({
        userId
    })

if (!player)
    return null

const roll =
    Math.random() * 100

let rewardText = ''

// ذهب
if (roll < 40) {

    const amount =
        Math.floor(
            Math.random() *
            99901
        ) + 100

    player.money += amount

    rewardText =
        `💰 ${amount} ذهب`
}

// خبرة
else if (roll < 60) {

    const amount =
        Math.floor(
            Math.random() *
            4951
        ) + 50

    player.xp += amount

    rewardText =
        `⭐ ${amount} خبرة`
}

// تذاكر
else if (roll < 70) {

    const amount =
        Math.floor(
            Math.random() * 10
        ) + 1

    player.towerTickets +=
        amount

    rewardText =
        `🎫 ${amount} تذكرة متجر`
}

// Basic
else if (roll < 78) {

    player.boxes.basic += 1

    rewardText =
        '📦 صندوق Basic'
}

// Rare
else if (roll < 84) {

    player.boxes.rare += 1

    rewardText =
        '📦 صندوق Rare'
}

// Epic
else if (roll < 89) {

    player.boxes.epic += 1

    rewardText =
        '📦 صندوق Epic'
}

// Legendary
else if (roll < 93) {

    player.boxes.legendary += 1

    rewardText =
        '📦 صندوق Legendary'
}

// SSS Chance
else if (roll < 96) {

    player.boxes.sss_chance += 1

    rewardText =
        '💎 صندوق SSS Chance'
}

// SSS High
else if (roll < 98) {

    player.boxes.sss_high += 1

    rewardText =
        '💎 صندوق SSS High'
}

// شخصية اسطوري
else if (roll < 99.5) {

    const pool =
        characters.filter(
            c =>
                c.rarity ===
                'اسطوري'
        )

    if (pool.length) {

        const char =
            pool[
                Math.floor(
                    Math.random() *
                    pool.length
                )
            ]

        player.characters.push(
            JSON.parse(
                JSON.stringify(
                    char
                )
            )
        )

        rewardText =
            `🌟 شخصية اسطورية: ${char.name}`
    }
}

// شخصية SSS
else {

    const pool =
        characters.filter(
            c =>
                c.rarity ===
                'SSS'
        )

    if (pool.length) {

        const char =
            pool[
                Math.floor(
                    Math.random() *
                    pool.length
                )
            ]

        player.characters.push(
            JSON.parse(
                JSON.stringify(
                    char
                )
            )
        )

        rewardText =
            `🔥 شخصية SSS: ${char.name}`
    }
}

await player.save()

return rewardText

}

module.exports = {
giveReward
}
