const mongoose = require('mongoose')

const BannerSchema = new mongoose.Schema({

    // شخصية البنر الحالية
    character: {
        type: Object,
        default: null
    },

    // اسم البنر
    bannerName: {
        type: String,
        default: ""
    },

    // تاريخ آخر تغيير للبنر
    lastReset: {
        type: String,
        default: ''
    },

    // عدد السحبات العالمية
    globalPulls: {
        type: Number,
        default: 0
    },

    // هل تم توزيع الجائزة؟
    rewardClaimed: {
        type: Boolean,
        default: false
    },

    // المشاركون
    participants: {
        type: [String],
        default: []
    },

    // آخر الشخصيات التي ظهرت
    recentCharacters: {
        type: [String],
        default: []
    }

})

module.exports = mongoose.model('Banner', BannerSchema)
