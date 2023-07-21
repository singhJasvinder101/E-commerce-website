const connectDB = require("../config/db")
connectDB()

const productData = require("./products")
const categoryData = require("./categories")
const reviewData = require("./Reviews")
const userData = require("./Users")
const orderData = require("./orders")

const productModel = require("../models/ProductModel")
const categoryModel = require("../models/CategoryModel")
const reviewModel = require("../models/ReviewModel")
const usersModel = require("../models/UserModel")
const orderModel = require("../models/OrderModel")

const importData = async () => {
    try {
        await productModel.collection.deleteMany({})
        await categoryModel.collection.deleteMany({})
        await reviewModel.collection.deleteMany({})
        await usersModel.collection.deleteMany({})

        if (process.argv[2] !== "-d") {
            // await productModel.insertMany(productData)
            await categoryModel.insertMany(categoryData)
            const reviews = await reviewModel.insertMany(reviewData)
            const sampleProducts = productData.map((product) => {
                reviews.map((review) => {
                    product.reviews.push(review._id)
                })
                return { ...product }
            })
            await productModel.insertMany(sampleProducts)
            await usersModel.insertMany(userData)
            await orderModel.insertMany(orderData)

            console.log("seeder data imported succesfully")
            process.exit(0)
            return
        }
        else {
            console.log("seeder data deleted successfully")
        }
    } catch (e) {
        console.log(" error while seeding is due to ", e)
        process.exit(1)
    }
}
importData()