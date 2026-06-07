const axios = require('axios')
const cheerio = require('cheerio')

module.exports = async function getBleachImage(name) {

    try {

        const pageName =
            name.replace(/ /g, '_')

        const url =
            `https://bleach.fandom.com/wiki/${pageName}`

        const { data } =
            await axios.get(url, {
                headers: {
                    'User-Agent':
                        'Mozilla/5.0'
                }
            })

        const $ = cheerio.load(data)

        let image = null

        image =
            $('meta[property="og:image"]')
                .attr('content')

        if (
            image &&
            image.startsWith('http')
        ) {

            return image
        }

        $('img').each((i, el) => {

            const src =
                $(el).attr('src')

            if (
                src &&
                src.startsWith('http')
            ) {

                image = src

                return false
            }
        })

        return image

    } catch (err) {

        console.log(
            `BLEACH IMAGE ERROR: ${name}`
        )

        console.log(err.message)

        return null
    }
}
