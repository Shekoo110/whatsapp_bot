const Waifu = require('./models/Waifu')
const getBleachImage =
    require('./getBleachImage')

const count =
    await Waifu.countDocuments({
        anime: 'BLEACH'
    })

console.log(
    'BLEACH COUNT:',
    count
)

module.exports =
async function updateBleach(
    limit = 10
) {

    const waifus =
    await Waifu.find({

        anime: 'BLEACH',

        source: 'Anime'

    }).limit(limit)

    console.log(
        `Found ${waifus.length} BLEACH waifus`
    )

    for (const waifu of waifus) {

        console.log(
            `Checking ${waifu.name}`
        )

        try {

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

        } catch (err) {

            console.log(
                `BLEACH IMAGE ERROR: ${waifu.name}`
            )

            console.log(
                err.message
            )
        }
    }

    console.log(
        'BLEACH update finished'
    )
}
