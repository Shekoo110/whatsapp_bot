const Waifu = require('./models/Waifu')

module.exports = async function updateAnimeImages(limit = 10) {

    const waifus =
        await Waifu.find().limit(limit)

    console.log(
        `Found ${waifus.length} waifus`
    )

    for (const waifu of waifus) {

        console.log(
            'Name:',
            waifu.name
        )

        console.log(
            'Anime:',
            waifu.anime
        )

        console.log(
            'Source:',
            waifu.source
        )

        console.log(
            'ImageUpdated:',
            waifu.imageUpdated
        )

        console.log(
            '----------------'
        )
    }

    console.log(
        'Debug finished'
    )
}
