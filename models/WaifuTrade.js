const mongoose = require('mongoose')

const waifuTradeSchema =
new mongoose.Schema({

    user1: String,
    user2: String,

    waifu1: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },

    waifu2: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },

    kakera1: {
        type: Number,
        default: 0
    },

    kakera2: {
        type: Number,
        default: 0
    },

    ready1: {
        type: Boolean,
        default: false
    },

    ready2: {
        type: Boolean,
        default: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports =
mongoose.model(
    'WaifuTrade',
    waifuTradeSchema
)
