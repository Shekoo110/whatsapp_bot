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

    // سنكمل هنا لاحقاً

}

module.exports = {
    generateCard
}
