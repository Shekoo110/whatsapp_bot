const Waifu = require('./models/Waifu')

const gameWaifus = [
    {
        name: 'Raiden Shogun',
        anime: 'Genshin Impact',
        source: 'Game',
        rarity: 'UR',
        value: 25000
    },
    {
        name: 'Furina',
        anime: 'Genshin Impact',
        source: 'Game',
        rarity: 'UR',
        value: 25000
    }
]

module.exports = async function importGamesWaifus() {

    let imported = 0

    for (const w of gameWaifus) {

        const exists = await Waifu.findOne({
            name: w.name,
            anime: w.anime
        })

        if (exists) continue

        await Waifu.create({
            name: w.name,
            anime: w.anime,
            source: w.source,
            image: '',
            gender: 'Female',
            rarity: w.rarity,
            value: w.value
        })

        imported++
    }

    console.log(
        `Imported ${imported} game waifus`
    )
}
