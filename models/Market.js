const mongoose = require('mongoose')

const MarketSchema = new mongoose.Schema({
    seller: String,
    character: Object,
    price: Number
})

module.exports = mongoose.model('Market', MarketSchema)
