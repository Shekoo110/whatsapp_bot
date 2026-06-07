const Waifu = require('./models/Waifu')
const axios = require('axios')

console.log("USING WIKIPEDIA API")

async function getWikipediaImage(name) {

    try {

        const url =
            `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`

        const { data } =
            await axios.get(url, {
                headers: {
                    "User-Agent":
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/125.0 Safari/537.36"
                }
            })

        return data.thumbnail?.source || null

    } catch (err) {

        console.log(
            "Wikipedia Error:",
            err.message
        )

        return null
    }
}

module.exports = async function updateAnimeImages(limit = 319) {

    console.log(
        "Total:",
        await Waifu.countDocuments({})
    )

    console.log(
        "Anime:",
        await Waifu.countDocuments({
            source: "Anime"
        })
    )

    console.log(
        "Game:",
        await Waifu.countDocuments({
            source: "Game"
        })
    )

    const waifus =
        await Waifu.find({
            source: 'Anime'
        }).limit(limit)

    let updated = 0

    console.log(
        `Found ${waifus.length} waifus`
    )

    for (const waifu of waifus) {

        try {

            const wikiImage =
                await getWikipediaImage(
                    waifu.name
                )

            console.log(
                `${waifu.name} => ${wikiImage ? 'FOUND' : 'NOT FOUND'}`
            )

            if (wikiImage) {

                waifu.image =
                    wikiImage

                waifu.imageUpdated =
                    true

                waifu.imageUpdatedAt =
                    new Date()

                await waifu.save()

                updated++

                console.log(
                    `Updated: ${waifu.name}`
                )
            }

            await new Promise(
                r => setTimeout(r, 500)
            )

        } catch (err) {

            console.log(
                `Failed: ${waifu.name}`
            )

            console.log(
                err.message
            )
        }
    }

    console.log(
        `Updated ${updated} images`
    )

    return updated
}
