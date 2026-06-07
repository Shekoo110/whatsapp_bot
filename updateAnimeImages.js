const Waifu = require('./models/Waifu')
const axios = require('axios')
const cheerio = require('cheerio')

const animeWikiMap = {
"BLEACH": "https://bleach.fandom.com/wiki",
"Naruto": "https://naruto.fandom.com/wiki",
"One Piece": "https://onepiece.fandom.com/wiki",
"Dragon Ball Z": "https://dragonball.fandom.com/wiki",
"Dragon Ball Super": "https://dragonball.fandom.com/wiki",
"Hunter x Hunter": "https://hunterxhunter.fandom.com/wiki",
"Fairy Tail": "https://fairytail.fandom.com/wiki",
"Jujutsu Kaisen": "https://jujutsu-kaisen.fandom.com/wiki",
"Black Clover": "https://blackclover.fandom.com/wiki",
"Demon Slayer": "https://kimetsu-no-yaiba.fandom.com/wiki",
"Attack on Titan": "https://attackontitan.fandom.com/wiki",
"Tokyo Ghoul": "https://tokyoghoul.fandom.com/wiki"
}

async function getWikiImage(name, baseUrl) {

try {

    const url =
        `${baseUrl}/${name.replace(/ /g, "_")}`

    const { data } =
        await axios.get(url)

    const $ = cheerio.load(data)

    const img =
        $(".pi-image-thumbnail").attr("src") ||
        $(".image img").first().attr("src")

    return img || null

} catch {

    return null
}

}

module.exports = async function updateAnimeImages(limit = 319) {

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

        const baseUrl =
            animeWikiMap[waifu.anime]

        if (!baseUrl)
            continue

        console.log(
            `Checking ${waifu.name}`
        )

        const wikiImage =
            await getWikiImage(
                waifu.name,
                baseUrl
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
