const {
    createCanvas,
    loadImage
} = require("canvas")

const axios = require("axios")

const cards =
require("./cards.json")

const frames =
require("./frames")

async function generateCard(cardId) {

    const character =
    cards.find(
        c => c.id === cardId
    )

    if (!character)
        return null

    const canvas =
    createCanvas(1024, 1536)

    const ctx =
    canvas.getContext("2d")

    // تحميل صورة الشخصية
    const response =
    await axios.get(
        character.image,
        {
            responseType: "arraybuffer"
        }
    )

    const characterImage =
    await loadImage(
        Buffer.from(response.data)
    )

    // رسم الشخصية
    ctx.drawImage(
        characterImage,
        0,
        0,
        1024,
        1536
    )

    // تحميل الإطار حسب الندرة
    const frame =
    await loadImage(
        frames[
            character.rarity
        ]
    )

    // رسم الإطار
    ctx.drawImage(
        frame,
        0,
        0,
        1024,
        1536
    )

    // إرجاع الصورة
    return canvas.toBuffer("image/png")
}

module.exports = {
    generateCard
}
