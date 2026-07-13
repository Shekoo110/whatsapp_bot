const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({

    role: String,

    content: String,

    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model(

    "NamiMemory",

    new mongoose.Schema({

        userId: {
            type: String,
            unique: true
        },

        messages: [messageSchema]

    })

)
