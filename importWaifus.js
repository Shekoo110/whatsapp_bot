const axios = require('axios')
const Waifu = require('./models/Waifu')

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

    const query = `
    query ($id:Int) {
        Media(id:$id,type:ANIME) {

            title {
                romaji
            }

            characters(perPage:100) {

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
                id
            }
        }
    )

    return res.data.data.Media
}

module.exports = async function importWaifus() {

    const count =
        await Waifu.countDocuments()

    if (count > 0) {

        console.log(
            'Waifus already imported'
        )

        return
    }

    let imported = 0

    for (const anime of animes) {

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

                await Waifu.create({

                    anilistId: c.id,

                    name:
                        c.name.full,

                    anime:
                        data.title.romaji,

                    image:
                        c.image.large,

                    gender:
                        'Female',

                    rarity:
                        getRarity(),

                    value:
                        Math.max(
                            100,
                            Math.floor(
                                (c.favourites || 0) /
                                    10
                            )
                        )
                })

                imported++
            }

            console.log(
                `${anime} done`
            )

        } catch (err) {

            console.log(
                `${anime} failed`
            )
        }
    }

    console.log(
        `Imported ${imported} waifus`
    )
}
