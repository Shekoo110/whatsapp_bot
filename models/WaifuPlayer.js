const mongoose = require('mongoose')

const waifuPlayerSchema =
new mongoose.Schema({

    userId: {
        type: String,
        unique: true
    },

    rolls: {
        type: Number,
        default: 10
    },

    kakera: {
        type: Number,
        default: 0
    },

    favoriteWaifu: {
        type: Number,
        default: null
    }

})

module.exports =
mongoose.model(
    'WaifuPlayer',
    waifuPlayerSchema
)
