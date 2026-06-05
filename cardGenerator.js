const {
    createCanvas,
    loadImage
} = require("canvas")

const axios = require("axios")
const path = require("path")

const cards =
require("./cards.json")

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

    // تحميل الإطار المناسب
    const frame =
    await loadImage(
        path.join(
            __dirname,
            "assets",
            "cards",
            `${character.rarity}.png`
        )
    )

    // رسم الإطار فوق الشخصية
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
