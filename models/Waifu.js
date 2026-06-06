const mongoose = require('mongoose')

const waifuSchema = new mongoose.Schema({
    anilistId: Number,
    name: String,
    image: String,
    anime: String,
    game: String,
    rarity: {
        type: String,
        default: 'SSR'
    },
    claimedBy: {
        type: String,
        default: null
    },
    value: {
        type: Number,
        default: 1000
    }
})

module.exports = mongoose.model(
    'Waifu',
    waifuSchema
)
