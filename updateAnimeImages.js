const Waifu = require('./models/Waifu')

module.exports = async function updateAnimeImages(limit = 5) {

    const waifus =
        await Waifu.find({

            source: 'Anime',

            imageUpdated: false

        }).limit(limit)

    console.log(
        `Found ${waifus.length} waifus to update`
    )

    for (const waifu of waifus) {

        console.log(
            `Checking ${waifu.name} (${waifu.anime})`
        )

        waifu.imageUpdated = true

        await waifu.save()
    }

    console.log(
        'Image update finished'
    )
}
