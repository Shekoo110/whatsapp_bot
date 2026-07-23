const mongoose = require('mongoose')

const MarketSchema = new mongoose.Schema({

    seller: String,

    character: Object,

    price: Number,

    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Market', MarketSchema)
