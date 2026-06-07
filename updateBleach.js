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

            source: 'Anime',

            $or: [

                {
                    imageUpdated: false
                },

                {
                    imageUpdated: {
                        $exists: false
                    }
                }
            ]

        }).limit(limit)

    console.log(
        `Found ${waifus.length} BLEACH waifus`
    )

    for (const waifu of waifus) {

        console.log(
            `Checking ${waifu.name}`
        )

        const image =
            await getBleachImage(
                waifu.name
            )

        if (!image) {

            console.log(
                `BLEACH IMAGE ERROR: ${waifu.name}`
            )

            continue
        }

        waifu.image = image
        waifu.imageUpdated = true

        await waifu.save()

        console.log(
            `Updated ${waifu.name}`
        )
    }

    console.log(
        'BLEACH update finished'
    )
}
