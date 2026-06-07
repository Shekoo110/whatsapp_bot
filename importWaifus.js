const axios = require('axios')
const Waifu = require('./models/Waifu')
const cheerio = require("cheerio"); // إذا غير موجود أضفه

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
};

async function getWikiInfoboxImage(name, wikiBaseUrl) {
    try {
        const url = `${wikiBaseUrl}/${name.replace(/ /g, "_")}`;

        const { data } = await axios.get(url);

        const $ = cheerio.load(data);

        const img =
            $(".pi-image-thumbnail").attr("src") ||
            $(".image img").first().attr("src");

        return img || null;

    } catch (err) {
        return null;
    }
}

function sleep(ms) {
    return new Promise(
        resolve =>
            setTimeout(resolve, ms)
    )
}

const animes = [
    'BLEACH',
    'Naruto',
    'One Piece',
    'Dragon Ball Z',
    'Dragon Ball Super',
    'Hunter x Hunter',
    'Fairy Tail',
    'Jujutsu Kaisen',
    'Black Clover',
    'Demon Slayer',
    'Attack on Titan',
    'Tokyo Ghoul'
]

function getRarity() {

    const r = Math.random()

    if (r < 0.01) return 'SSS'
    if (r < 0.05) return 'SS'
    if (r < 0.15) return 'S'
    if (r < 0.35) return 'A'

    return 'B'
}

async function searchAnime(title) {

    const query = `
    query ($search:String) {
        Media(search:$search,type:ANIME) {
            id
            title {
                romaji
            }
        }
    }`

    const res = await axios.post(
        'https://graphql.anilist.co',
        {
            query,
            variables: {
                search: title
            }
        }
    )

    return res.data.data.Media
}

async function getCharacters(id) {

    let allCharacters = []
    let page = 1
    let hasNextPage = true
    let animeTitle = ''

    while (hasNextPage) {

        const query = `
        query ($id:Int,$page:Int) {
            Media(id:$id,type:ANIME) {

                title {
                    romaji
                }

                characters(
                    page:$page
                    perPage:50
                ) {

                    pageInfo {
                        hasNextPage
                    }

                    nodes {

                        id
                        gender
                        favourites

                        name {
                            full
                        }

                        image {
                            large
                        }
                    }
                }
            }
        }`

        const res = await axios.post(
    'https://graphql.anilist.co',
    {
        query,
        variables: {
            id,
            page
        }
    }
)

await sleep(1500)

        const media =
            res.data.data.Media

        animeTitle =
            media.title.romaji

        allCharacters.push(
            ...media.characters.nodes
        )

        hasNextPage =
            media.characters.pageInfo.hasNextPage

        page++
    }

    return {
        title: {
            romaji: animeTitle
        },
        characters: {
            nodes: allCharacters
        }
    }
}

module.exports = async function importWaifus() {

    const count =
        await Waifu.countDocuments()

    if (count > 0) {

        console.log(
            'Anime waifus already imported'
        )

        return
    }

    let imported = 0

    for (const anime of animes) {
await sleep(3000)
    try {

        console.log(
            `Searching ${anime}`
        )

        const media =
            await searchAnime(
                anime
            )

        if (!media)
            continue

        const data =
            await getCharacters(
                media.id
            )

        const chars =
            data.characters.nodes

        for (const c of chars) {

            if (
                !c.gender ||
                c.gender.toLowerCase() !==
                    'female'
            ) {
                continue
            }

            const exists =
                await Waifu.findOne({
                    anilistId: c.id
                })

            if (exists)
                continue

            const baseUrl = animeWikiMap[data.title.romaji];

const wikiImage = baseUrl
    ? await getWikiInfoboxImage(c.name.full, baseUrl)
    : null;

await Waifu.create({
    anilistId: c.id,
    name: c.name.full,
    anime: data.title.romaji,

    image: wikiImage || c.image.large,

    gender: 'Female',
    rarity: getRarity(),
    value: Math.max(100, Math.floor((c.favourites || 0) / 10))
});

            imported++
        }

        console.log(
            `${anime} done`
        )

    } catch (err) {

        console.log(
            `${anime} failed`
        )

        console.log(
            err.response?.data || err.message
        )
    }
}

console.log(
    `Imported ${imported} waifus`
)

}
