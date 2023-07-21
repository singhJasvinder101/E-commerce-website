const mongoose = require("mongoose")
const {Schema} = require("mongoose")

const reviewSchema = new Schema({
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
    user: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        name: {type: String, required: true}
    }
}, {
    timestamps: true,
})

const Review = mongoose.model("Review", reviewSchema)
module.exports = Review