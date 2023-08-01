const mongoose = require("mongoose")
const { Schema } = require("mongoose")
const Review = require("./ReviewModel")
const imageSchema = ({
    path: { type: String, required: true }
})

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        // unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
    },
    rating: {
        type: Number,
    },
    reviewsNumber: {
        type: Number,
    },
    sales: {
        type: Number,
        default: 0,
    },
    attrs: [{ key: { type: String }, value: { type: String } 
        //[{key:'çolor', value: 'red'}, {key:"size", value:"1Tb"}]
    }],
    images: [imageSchema],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId, ref: Review
    }]

}, {
    timestamps: true,
})

productSchema.index()

const Product = mongoose.model("Product", productSchema)
productSchema.index({name: 'text', description: 'text'}, {name: 'textIndex'})
productSchema.index({"attrs.key":1, "attrs.key":1})
// productSchema.index({name: -1})

module.exports = Product


// Depending on some criteria we should use either embedded documents or reference by id in relationships. "Embedded" means that we store all of the data in one object (one model definition), for example a blog post may have some images and we store images path inside "images" property of blog object. But "reference by id" means that we store all of the data in two objects (two model definitions), for example a blog post has many comments and we store comments in separate document (comments collection, in posts collection we store id references to comments).

