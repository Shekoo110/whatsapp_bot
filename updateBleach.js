const Waifu = require('./models/Waifu')
const getBleachImage =
    require('./getBleachImage')

module.exports =
async function updateBleach(
    limit = 10
) {

    const waifus =
        await Waifu.find({

            anime: 'BLEACH',

            source: 'Anime'

        }).limit(limit)

    for (const waifu of waifus) {

        const image =
            await getBleachImage(
                waifu.name
            )

        if (!image)
            continue

        waifu.image = image
        waifu.imageUpdated = true

        await waifu.save()

        console.log(
            `Updated ${waifu.name}`
        )
    }
}
