const characters = require('../characters.json')

// =========================
// شخصية SSS من نفس الأنمي
// =========================

function randomSSSFromAnime(anime) {

    const pool = characters.filter(
        c =>
            c.rarity === 'SSS' &&
            c.anime === anime
    )

    if (!pool.length)
        return null

    const random =
        JSON.parse(
            JSON.stringify(
                pool[
                    Math.floor(
                        Math.random() *
                        pool.length
                    )
                ]
            )
        )

    random.originalPower = random.power
    random.evolutionLevel = 0
    random.urAbilities = []

    return random

}

// =========================
// احتمال شخصية SSS
// =========================

function trySSS(anime, chance = 30) {

    if (
        Math.random() * 100 >
        chance
    ) {
        return null
    }

    return randomSSSFromAnime(anime)

}

// =========================
// فلوس عشوائية
// =========================

function randomMoney() {

    return (
        Math.floor(
            Math.random() *
            300001
        ) + 200000
    )

}

// =========================
// صناديق لبقية المشاركين
// =========================

function randomBoxes() {

    return {

        sss_chance:
            Math.random() < 0.15
            ? 1
            : 0,

        sss_high:
            Math.random() < 0.05
            ? 1
            : 0

    }

}

// =========================
// جوائز أول ثلاثة
// =========================

function topReward(rank, anime) {

    let money = 500000

    if (rank === 1) {
        money = 1000000
    }

    else if (rank === 2) {
        money = 700000
    }

    else if (rank === 3) {
        money = 500000
    }

    return {

        money,

        character:
            trySSS(anime, 30),

        boxes: {

            sss_chance: 2,
            sss_high: 0

        }

    }

}

// =========================
// جوائز البقية
// =========================

function normalReward() {

    return {

        money:
            randomMoney(),

        boxes:
            randomBoxes()

    }

}

module.exports = {

    topReward,
    normalReward

}
