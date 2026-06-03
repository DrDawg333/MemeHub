const mongoose = require("mongoose");

const memeSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    title: {
        type: String,
        required: true
    },

    imageUrl: {
        type: String,
        required: true
    },

    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Meme", memeSchema);