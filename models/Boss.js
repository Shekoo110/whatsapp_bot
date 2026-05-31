const mongoose = require('mongoose')

const BossSchema = new mongoose.Schema({
    name: String,
    image: String,
    hp: Number,
    maxHp: Number,
    ability: Object
})

module.exports = mongoose.model('Boss', BossSchema)
