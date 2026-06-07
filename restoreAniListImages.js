const axios = require('axios')
const Waifu = require('./models/Waifu')

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

module.exports = async function restoreAniListImages(limit = 20) {

    const waifus = await Waifu.find({
        anilistId: { $ne: null }
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
            waifu.imageSource = 'anilist'

            await waifu.save()

            console.log(
                `Restored ${waifu.name}`
            )

        } catch (err) {

            console.log(
                `Failed ${waifu.name}`
            )
        }
    }
}
