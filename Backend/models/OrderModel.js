const mongoose = require("mongoose")
const {Schema} = require("mongoose")
const User = require("./UserModel")

const orderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        // it means we will use this id for getting or populate data
        required: true,
        ref: User
    },
    orderTotal: {
        itemsCount: { type: Number, required: true },
        cartSubtotal: { type: Number, required: true }
    },
    cartItems: [
        {
            name: {type: String, required: true},
            price: {type: String, required: true},
            image: {path: {type: String, required: true}},
            quantity: {type: Number, required: true},
            count: {type: Number, required: true},
        }
    ],
    paymentMethod: {
        type: String,
        required: true
    },
    transactionResult: {
        status: {type: String},
        createTime: {type: String},
        amount: {type: Number}
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date
    },
    isDelievered: {
        type: Boolean,
        required: true,
        default: false,
    },
    delieveredAt: {
        type: Date
    }
}, {
    timestamps: true,
})

const Order = mongoose.model("Order", orderSchema)
module.exports = Order