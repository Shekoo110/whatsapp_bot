const Waifu = require('./models/Waifu')
const axios = require('axios')
const cheerio = require('cheerio')


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

const animeWikiMap = {
    "BLEACH": "https://bleach.fandom.com/wiki",

    "Naruto": "https://naruto.fandom.com/wiki",

    "ONE PIECE": "https://onepiece.fandom.com/wiki",
    "One Piece": "https://onepiece.fandom.com/wiki",

    "Dragon Ball Z": "https://dragonball.fandom.com/wiki",
    "Dragon Ball Super": "https://dragonball.fandom.com/wiki",

    "Hunter x Hunter": "https://hunterxhunter.fandom.com/wiki",

    "Fairy Tail": "https://fairytail.fandom.com/wiki",

    "Jujutsu Kaisen": "https://jujutsu-kaisen.fandom.com/wiki",

    "Black Clover": "https://blackclover.fandom.com/wiki",

    "Demon Slayer": "https://kimetsu-no-yaiba.fandom.com/wiki",
    "Kimetsu no Yaiba": "https://kimetsu-no-yaiba.fandom.com/wiki",

    "Attack on Titan": "https://attackontitan.fandom.com/wiki",
    "Shingeki no Kyojin": "https://attackontitan.fandom.com/wiki",

    "Tokyo Ghoul": "https://tokyoghoul.fandom.com/wiki",

    "Onigiri": "https://onigiri.fandom.com/wiki"
}

async function getWikiImage(name, baseUrl) {

    try {

        const url =
            `${baseUrl}/${name.replace(/ /g, "_")}`

        const { data } = await axios.get(url, {
    headers: {
        "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/125.0 Safari/537.36"
    }
})

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

    console.log("ERROR:", err.message)

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

        const baseUrl =
    animeWikiMap[waifu.anime]

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

const wikiImage =
    await getWikipediaImage(
        waifu.name
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
