const axios = require('axios')
const Waifu = require('./models/Waifu')

function sleep(ms) {

return new Promise(
    resolve =>
        setTimeout(resolve, ms)
)

}

async function getAniListImage(id) {

const query = `
query ($id:Int) {
    Character(id:$id) {
        image {
            large
        }
    }
}`

const res = await axios.post(
    'https://graphql.anilist.co',
    {
        query,
        variables: { id }
    }
)

return res.data.data.Character.image.large

}

module.exports = async function restoreAniListImages(
limit = 20
) {

const waifus =
    await Waifu.find({
        anilistId: {
            $ne: null
        }
    }).limit(limit)

console.log(
    `Found ${waifus.length} waifus`
)

for (const waifu of waifus) {

    try {

        const image =
            await getAniListImage(
                waifu.anilistId
            )

        waifu.image = image
        waifu.imageSource =
            'anilist'

        waifu.imageUpdated =
            false

        await waifu.save()

        console.log(
            `Restored ${waifu.name}`
        )

        await sleep(2000)

    } catch (err) {

        console.log(
            `Failed ${waifu.name}`
        )

        console.log(
            err.response?.data ||
            err.message
        )

        if (
            err.response?.data
                ?.errors?.[0]?.status === 429
        ) {

            console.log(
                'Waiting 60 seconds...'
            )

            await sleep(60000)
        }
    }
}

console.log(
    'AniList restore finished'
)

}
