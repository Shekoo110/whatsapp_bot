const axios = require("axios")
const { createCanvas, loadImage } = require("canvas")

const cards = require("./cards.json")
const frames = require("./frames")

async function generateCard(cardId) {

    const character = cards.find(c => c.id === cardId)

    if (!character) return null

    const canvas = createCanvas(1024, 1536)
    const ctx = canvas.getContext("2d")

    // ===========================
    // خلفية
    // ===========================

    ctx.fillStyle = "#0d0d0d"
    ctx.fillRect(0, 0, 1024, 1536)

    // ===========================
    // تحميل الشخصية
    // ===========================

    const response = await axios.get(character.image, {
        responseType: "arraybuffer"
    })

    const characterImage = await loadImage(Buffer.from(response.data))

    // ===========================
    // Glow حسب النجوم
    // ===========================

    let glow = "#000000"

    switch (character.stars) {

        case 5:
            glow = "#9b4dff"
            break

        case 6:
            glow = "#ffd700"
            break

        default:
            glow = "#222222"

    }

    // ===========================
    // حجم الشخصية
    // ===========================

    const imgW = characterImage.width
    const imgH = characterImage.height

    const scale = Math.min(
        900 / imgW,
        1280 / imgH
    )

    const drawW = imgW * scale
    const drawH = imgH * scale

    const drawX = (1024 - drawW) / 2
    const drawY = 140

    // ===========================
    // Glow
    // ===========================

    ctx.save()

    ctx.shadowColor = glow
    ctx.shadowBlur = 90

    ctx.drawImage(
        characterImage,
        drawX,
        drawY,
        drawW,
        drawH
    )

    ctx.restore()

    // ===========================
    // الشخصية
    // ===========================

    ctx.drawImage(
        characterImage,
        drawX,
        drawY,
        drawW,
        drawH
    )

    // ===========================
    // الإطار
    // ===========================

    const frame = await loadImage(
        frames[character.stars]
    )

    ctx.drawImage(
        frame,
        0,
        0,
        1024,
        1536
    )

    // ===========================
    // النجوم
    // ===========================

    ctx.font = "bold 54px Arial"
    ctx.textAlign = "center"

    ctx.lineWidth = 8
    ctx.strokeStyle = "#000000"

    let stars = ""

    for (let i = 0; i < character.stars; i++) {

        stars += "★"

    }

    ctx.strokeText(
        stars,
        512,
        1380
    )

    ctx.fillStyle = "#FFD700"

    ctx.fillText(
        stars,
        512,
        1380
    )

    // ===========================
    // Rank
    // ===========================

    ctx.font = "bold 60px Arial"

    ctx.strokeText(
        character.rank || "",
        512,
        1450
    )

    ctx.fillStyle = "#FFFFFF"

    ctx.fillText(
        character.rank || "",
        512,
        1450
    )

    // ===========================
    // اسم الشخصية
    // ===========================

    ctx.font = "bold 48px Arial"

    ctx.strokeText(
        character.name.toUpperCase(),
        512,
        90
    )

    ctx.fillStyle = "#FFFFFF"

    ctx.fillText(
        character.name.toUpperCase(),
        512,
        90
    )

    return canvas.toBuffer("image/png")

}

module.exports = {
    generateCard
}
