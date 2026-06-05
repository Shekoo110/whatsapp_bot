const mongoose = require('mongoose')

const BossSchema = new mongoose.Schema({

    name: String,
    image: String,

    hp: Number,
    maxHp: Number,
    attack: Number,

    ability: Object,
    abilities: Array,

    followers: Array,
    activeFollowers: Array,

    enraged: Boolean,
    turnCounter: Number,
    groupAttackCount: Number,

    killer: String,
    finished: Boolean

})

module.exports =
    mongoose.model('Boss', BossSchema)
