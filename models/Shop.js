const mongoose = require('mongoose')

const ShopSchema = new mongoose.Schema({
    character: {
        type: Object,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    createdAt: {
        type: Number,
        default: Date.now
    }
})

module.exports = mongoose.model('Shop', ShopSchema)
