const axios = require('axios')
const Waifu = require('./models/Waifu')

function convertRarity(stars) {

    if (stars >= 5)
        return 'UR'

    if (stars >= 4)
        return 'SSR'

    return 'SR'
}

function getValue(rarity) {

    switch (rarity) {

        case 'UR':
            return 25000

        case 'SSR':
            return 10000

        default:
            return 5000
    }
}

const maleGenshin = [
    'Alhaitham','Ayato','Baizhu','Bennett',
    'Childe','Cyno','Diluc','Freminet',
    'Gaming','Gorou','Heizou','Itto',
    'Kaeya','Kaveh','Kazuha','Lyney',
    'Mika','Neuvillette','Razor',
    'Sethos','Thoma','Tighnari',
    'Venti','Wanderer','Wriothesley',
    'Xiao','Xingqiu','Zhongli',
    'Albedo','Chongyun'
]

const maleHSR = [
    'Argenti','Arlan','Aventurine',
    'Blade','Boothill','Dan Heng',
    'Gallagher','Gepard','Jing Yuan',
    'Luka','Luocha','Moze',
    'Misha','Mydei','Sampo',
    'Sunday','Welt','Yanqing'
]

const maleWuWa = [
    'Jiyan','Calcharo',
    'Mortefi','Yuanwu',
    'Aalto','Brant',
    'Lingyang','Xiangli Yao'
]

module.exports = async function importGamesWaifus() {

    let imported = 0

    // ====================
    // GENSHIN
    // ====================

    try {

        const list =
            await axios.get(
                'https://genshin.jmp.blue/characters'
            )

        for (const slug of list.data) {

            const char =
                await axios.get(
                    `https://genshin.jmp.blue/characters/${slug}`
                )

            const c = char.data

            if (
                maleGenshin.includes(
                    c.name
                )
            ) {
                continue
            }

            const exists =
                await Waifu.findOne({
                    name: c.name,
                    anime: 'Genshin Impact'
                })

            if (exists)
                continue

            const rarity =
                convertRarity(
                    c.rarity || 5
                )

            await Waifu.create({

                name: c.name,

                anime:
                    'Genshin Impact',

                source: 'Game',

                image:
                    `https://genshin.jmp.blue/characters/${slug}/icon-big`,

                gender: 'Female',

                rarity,

                value:
                    getValue(
                        rarity
                    )
            })

            imported++
        }

        console.log(
            'Genshin done'
        )

    } catch (err) {

        console.log(
            'Genshin failed',
            err.message
        )
    }

    // ====================
    // HSR
    // ====================

    try {

        const res =
            await axios.get(
                'https://hsr-api.vercel.app/api/v1/characters'
            )

        for (const c of res.data) {

            if (
                maleHSR.includes(
                    c.name
                )
            ) {
                continue
            }

            const exists =
                await Waifu.findOne({
                    name: c.name,
                    anime:
                        'Honkai Star Rail'
                })

            if (exists)
                continue

            const rarity =
                convertRarity(
                    c.rarity || 5
                )

            await Waifu.create({

                name: c.name,

                anime:
                    'Honkai Star Rail',

                source: 'Game',

                image:
                    c.image || '',

                gender: 'Female',

                rarity,

                value:
                    getValue(
                        rarity
                    )
            })

            imported++
        }

        console.log(
            'HSR done'
        )

    } catch (err) {

        console.log(
            'HSR failed',
            err.message
        )
    }

    // ====================
    // WUWA
    // ====================

    try {

        const res =
            await axios.get(
                'https://wuwa-api.projektcode.com/v1/characters?limit=200'
            )

        for (const c of res.data.data) {

            if (
                maleWuWa.includes(
                    c.name
                )
            ) {
                continue
            }

            const exists =
                await Waifu.findOne({
                    name: c.name,
                    anime:
                        'Wuthering Waves'
                })

            if (exists)
                continue

            const rarity =
                convertRarity(
                    c.rarity || 5
                )

            await Waifu.create({

                name: c.name,

                anime:
                    'Wuthering Waves',

                source: 'Game',

                image:
                    c.images?.icon ||
                    '',

                gender: 'Female',

                rarity,

                value:
                    getValue(
                        rarity
                    )
            })

            imported++
        }

        console.log(
            'WuWa done'
        )

    } catch (err) {

        console.log(
            'WuWa failed',
            err.message
        )
    }

    console.log(
        `Imported ${imported} game waifus`
    )
}
