const mongoose = require('mongoose')

const waifuSchema = new mongoose.Schema({

    anilistId: {
        type: Number,
        unique: true
    },

    name: String,

    anime: String,

    image: String,

    gender: {
        type: String,
        default: 'Female'
    },

    rarity: {
        type: String,
        default: 'B'
    },

    value: {
        type: Number,
        default: 100
    },

    claims: {
        type: Number,
        default: 0
    },

    likes: {
        type: Number,
        default: 0
    },

    claimedBy: {
        type: String,
        default: null
    },

    claimedAt: {
        type: Date,
        default: null
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports =
mongoose.model(
    'Waifu',
    waifuSchema
)
