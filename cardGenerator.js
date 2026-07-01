const axios = require("axios")

const {
    createCanvas,
    loadImage,
    registerFont
} = require("canvas")

const path = require("path")

const cards = require("./cards.json")

const frames = require("./frames")

// إذا وضعت خط عربي
try {

    registerFont(
        path.join(
            __dirname,
            "assets",
            "fonts",
            "Cairo-Bold.ttf"
        ),
        {
            family: "Cairo"
        }
    )

} catch {}

const CARD_WIDTH = 1024
const CARD_HEIGHT = 1536

//--------------------------------------------------
// تحميل الصورة
//--------------------------------------------------

async function loadRemoteImage(url) {

    const response =
        await axios.get(
            url,
            {
                responseType: "arraybuffer"
            }
        )

    return loadImage(
        Buffer.from(response.data)
    )

}

//--------------------------------------------------
// لون التوهج حسب النجوم
//--------------------------------------------------

function getGlow(stars) {

    switch (stars) {

        case 4:

            return "#2f2f2f"

        case 5:

            return "#914dff"

        case 6:

            return "#ffd700"

        default:

            return "#ffffff"

    }

}

//--------------------------------------------------
// خلفية حسب العنصر
//--------------------------------------------------

function drawBackground(ctx, element) {

    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            0,
            CARD_HEIGHT
        )

    switch (
        (element || "").toLowerCase()
    ) {

        case "fire":

            gradient.addColorStop(
                0,
                "#390000"
            )

            gradient.addColorStop(
                1,
                "#100000"
            )

            break

        case "water":

            gradient.addColorStop(
                0,
                "#001d4a"
            )

            gradient.addColorStop(
                1,
                "#020812"
            )

            break

        case "light":

            gradient.addColorStop(
                0,
                "#423600"
            )

            gradient.addColorStop(
                1,
                "#111111"
            )

            break

        case "dark":

            gradient.addColorStop(
                0,
                "#18002f"
            )

            gradient.addColorStop(
                1,
                "#050505"
            )

            break

        default:

            gradient.addColorStop(
                0,
                "#111111"
            )

            gradient.addColorStop(
                1,
                "#050505"
            )

    }

    ctx.fillStyle =
        gradient

    ctx.fillRect(
        0,
        0,
        CARD_WIDTH,
        CARD_HEIGHT
    )
    
}
//--------------------------------------------------
// رسم الشخصية
//--------------------------------------------------

function drawCharacter(ctx, image, stars) {

    const imgW = image.width
    const imgH = image.height

    let maxWidth = 920
    let maxHeight = 1280

    if (stars === 6) {

        maxWidth = 980
        maxHeight = 1340

    }

    const scale = Math.min(

        maxWidth / imgW,

        maxHeight / imgH

    )

    const drawW = imgW * scale
    const drawH = imgH * scale

    const drawX = (CARD_WIDTH - drawW) / 2
    const drawY = 110

    return {

        drawX,

        drawY,

        drawW,

        drawH

    }

}

//--------------------------------------------------
// رسم التوهج
//--------------------------------------------------

function drawGlow(

    ctx,

    image,

    info,

    color

) {

    ctx.save()

    ctx.shadowColor = color

    ctx.shadowBlur = 120

    ctx.shadowOffsetX = 0

    ctx.shadowOffsetY = 0

    ctx.globalAlpha = 0.95

    ctx.drawImage(

        image,

        info.drawX,

        info.drawY,

        info.drawW,

        info.drawH

    )

    ctx.restore()

}

//--------------------------------------------------
// رسم الشخصية
//--------------------------------------------------

function drawMainCharacter(

    ctx,

    image,

    info

) {

    ctx.drawImage(

        image,

        info.drawX,

        info.drawY,

        info.drawW,

        info.drawH

    )

}

//--------------------------------------------------
// لمعان أعلى البطاقة
//--------------------------------------------------

function drawTopLight(ctx) {

    const gradient =

    ctx.createLinearGradient(

        0,

        0,

        0,

        420

    )

    gradient.addColorStop(

        0,

        "rgba(255,255,255,0.18)"

    )

    gradient.addColorStop(

        1,

        "rgba(255,255,255,0)"

    )

    ctx.fillStyle = gradient

    ctx.fillRect(

        0,

        0,

        CARD_WIDTH,

        420

    )

}

//--------------------------------------------------
// رسم الإطار
//--------------------------------------------------

async function drawFrame(

    ctx,

    stars

) {

    const frame =

    await loadImage(

        frames[stars]

    )

    ctx.drawImage(

        frame,

        0,

        0,

        CARD_WIDTH,

        CARD_HEIGHT

    )

}
//--------------------------------------------------
// رسم النجوم
//--------------------------------------------------

function drawStars(ctx, stars) {

    const startX = 512 - ((stars - 1) * 35)

    ctx.font = "bold 56px Arial"
    ctx.textAlign = "center"

    ctx.lineWidth = 8
    ctx.strokeStyle = "#000"

    for (let i = 0; i < stars; i++) {

        const x = startX + (i * 70)

        ctx.strokeText(
            "★",
            x,
            1310
        )

        ctx.fillStyle = "#FFD700"

        ctx.fillText(
            "★",
            x,
            1310
        )

    }

}

//--------------------------------------------------
// الاسم
//--------------------------------------------------

function drawName(ctx, character) {

    ctx.textAlign = "center"

    ctx.font = "bold 52px Cairo"

    ctx.lineWidth = 8
    ctx.strokeStyle = "#000"

    ctx.strokeText(
        character.name,
        512,
        1375
    )

    ctx.fillStyle = "#FFF"

    ctx.fillText(
        character.name,
        512,
        1375
    )

}

//--------------------------------------------------
// الأنمي
//--------------------------------------------------

function drawAnime(ctx, character) {

    ctx.textAlign = "center"

    ctx.font = "32px Cairo"

    ctx.lineWidth = 6
    ctx.strokeStyle = "#000"

    ctx.strokeText(
        character.anime,
        512,
        1425
    )

    ctx.fillStyle = "#DDD"

    ctx.fillText(
        character.anime,
        512,
        1425
    )

}

//--------------------------------------------------
// الرتبة
//--------------------------------------------------

function drawRank(ctx, character) {

    const rank = character.rank || ""

    ctx.textAlign = "right"

    ctx.font = "bold 58px Arial"

    ctx.lineWidth = 8
    ctx.strokeStyle = "#000"

    ctx.strokeText(
        rank,
        940,
        90
    )

    ctx.fillStyle = "#FFD700"

    ctx.fillText(
        rank,
        940,
        90
    )

}

//--------------------------------------------------
// الدالة الرئيسية
//--------------------------------------------------

async function generateCard(cardId) {

    const character =
        cards.find(c => c.id === cardId)

    if (!character)
        return null

    const canvas =
        createCanvas(
            CARD_WIDTH,
            CARD_HEIGHT
        )

    const ctx =
        canvas.getContext("2d")

    drawBackground(
        ctx,
        character.element
    )

    drawTopLight(ctx)

    const image =
        await loadRemoteImage(
            character.image
        )

    const info =
        drawCharacter(
            ctx,
            image,
            character.stars
        )

    drawGlow(
        ctx,
        image,
        info,
        getGlow(character.stars)
    )

    drawMainCharacter(
        ctx,
        image,
        info
    )

    await drawFrame(
        ctx,
        character.stars
    )

    drawStars(
        ctx,
        character.stars
    )

    drawName(
        ctx,
        character
    )

    drawAnime(
        ctx,
        character
    )

    drawRank(
        ctx,
        character
    )

    return canvas.toBuffer("image/png")

}

module.exports = {
    generateCard
}
