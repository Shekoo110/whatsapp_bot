const axios = require('axios')
const mongoose = require('mongoose')
const Waifu = require('./models/Waifu')

mongoose.connect(process.env.MONGODB_URI)

const titles = [
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

async function getMediaId(title) {

    const query = `
    query {
      Media(search: "${title}", type: ANIME) {
        id
      }
    }`

    const res = await axios.post(
        'https://graphql.anilist.co',
        { query }
    )

    return res.data.data.Media.id
}

async function importAnime(title) {

    const mediaId = await getMediaId(title)

    let page = 1

    while (true) {

        const query = `
        query {
          Media(id:${mediaId}, type:ANIME) {
            characters(page:${page}, perPage:50) {
              nodes {
                id
                gender
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
            { query }
        )

        const chars =
            res.data.data.Media.characters.nodes

        if (!chars.length) break

        for (const c of chars) {

            if (c.gender !== 'Female')
                continue

            const exists =
                await Waifu.findOne({
                    anilistId: c.id
                })

            if (exists)
                continue

            await Waifu.create({
                anilistId: c.id,
                name: c.name.full,
                image: c.image.large,
                source: title,
                type: 'anime'
            })
        }

        page++
    }

    console.log(`Imported ${title}`)
}

async function main() {

    for (const title of titles) {
        await importAnime(title)
    }

    console.log('Finished')
    process.exit()
}

main()
