const Waifu = require('./models/Waifu')
const axios = require('axios')
const cheerio = require('cheerio')

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




async function getWikiImage(name, baseUrl) {

    try {

        const url =
            `${baseUrl}/${name.replace(/ /g, "_")}`

        const { data } =
            await axios.get(url)

        console.log("URL:", url)
        console.log("Page length:", data.length)

        const $ = cheerio.load(data)

        const img =
            $('meta[property="og:image"]').attr("content") ||
            $('meta[name="twitter:image"]').attr("content") ||
            $(".pi-image-thumbnail").attr("src") ||
            $(".image img").first().attr("src")

        console.log("Found image:", img)

        return img || null

    } catch (err) {

        console.log(
            "URL:",
            `${baseUrl}/${name.replace(/ /g, "_")}`
        )

        console.log(
            "ERROR:",
            err.message
        )

        return null
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
