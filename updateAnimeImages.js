const Waifu = require('./models/Waifu')
const axios = require('axios')


console.log("USING WIKIPEDIA API")

async function getWikipediaImage(name) {

    try {

        const url =
            `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`;

        const { data } =
            await axios.get(url);

        return data.thumbnail?.source || null;

    } catch (err) {

        console.log(
            "Wikipedia Error:",
            err.message
        );

        return null;
    }
}



module.exports = async function updateAnimeImages(limit = 319) {

const waifus =
    await Waifu.find({}).limit(limit)

let updated = 0

console.log(
    `Found ${waifus.length} waifus`
)

for (const waifu of waifus) {

    try {

    

console.log(
    "Anime:",
    waifu.anime
)

console.log(
    "Name:",
    waifu.name
)

console.log(
    "Base URL:",
    baseUrl
)

const wikiImage =
    await getWikipediaImage(
        waifu.name
    )

console.log(
    "Anime:",
    waifu.anime
)

console.log(
    "Name:",
    waifu.name
)

console.log(
    "Base URL:",
    baseUrl
)

console.log(
    "Wikipedia Image:",
    wikiImage
)

        if (
            wikiImage &&
            wikiImage !== waifu.image
        ) {

            waifu.image =
                wikiImage

            waifu.imageUpdated =
                true

            await waifu.save()

            updated++
        }

        await new Promise(
            r => setTimeout(r, 500)
        )

    } catch (err) {

        console.log(
            `Failed: ${waifu.name}`
        )
    }
}

console.log(
    `Updated ${updated} images`
)

return updated

}
