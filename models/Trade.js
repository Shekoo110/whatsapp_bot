const mongoose = require("mongoose")

const TradeSchema = new mongoose.Schema({

    // صاحب العرض
    ownerId: {
        type: String,
        required: true,
        index: true
    },

    ownerName: {
        type: String,
        default: ""
    },

    // الشخصية المعروضة
    offeredCharacterId: {
        type: String,
        required: true
    },

    offeredCharacterName: {
        type: String,
        required: true
    },

    offeredCharacterPower: {
        type: Number,
        default: 0
    },

    offeredCharacterImage: {
        type: String,
        default: ""
    },

    // الشخصيات المطلوبة
    wantedCharacters: {
        type: [String],
        default: []
    },

    // حالة العرض
    status: {
        type: String,
        enum: [
            "active",
            "completed",
            "cancelled"
        ],
        default: "active"
    },

    // من نفذ التبديل
    acceptedBy: {
        type: String,
        default: null
    },

    acceptedAt: {
        type: Number,
        default: 0
    },

    createdAt: {
        type: Number,
        default: Date.now
    }

})

module.exports = mongoose.model(
    "Trade",
    TradeSchema
)
