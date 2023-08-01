// productController.js
const User = require("../models/UserModel")
const Review = require("../models/ReviewModel")
const Product = require("../models/ProductModel")
const { hashPassword, comparePasswords } = require("../utils/hashingPassword")
const { generateAuthToken } = require("../utils/generateAuthToken")


const getUsers = async (req, res, next) => {
    try {
        const users = await User.find({}).select("-password")
        // console.log(process.env.JWT_SECRET_KEY)
        return res.json(users)

    } catch (error) {
        next(error)
    }
};

const registerUser = async (req, res, next) => {
    try {
        const { name, lastname, email, password } = req.body
        if (!(name && lastname && email && password)) {
            return res.status(400).send("All inputs are required");
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).send("user exists");

        } else {
            const hashedPassword = hashPassword(password)
            const user = await User.create({
                name,
                lastname,
                email: email.toLowerCase(),
                password: hashedPassword
            })
            res.cookie("auth_token",
            // here casing of letters is important must match from the model
                generateAuthToken(user._id, user.name, user.lastname, user.email, user.isAdmin)
                , {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict"
                })
                .status(201).json({
                    success: "user created",
                    userCreated: {
                        user: user.name, lastname: user.lastname,
                        _id: user._id, email: user.email, isAdmin: user.isAdmin
                    }
                })
        }
    } catch (error) {
        next(error)
    }
}

const loginUser = async (req, res, next) => {
    try {
        const { email, password, donotlogout } = req.body
        if (!(email && password)) {
            return res.status(400).send("All inputs are required")
        }
        const userExists = await User.findOne({ email }).orFail();
        if (userExists && comparePasswords(password, userExists.password)) {
            let cookieParams = {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict"
            }
            if (donotlogout) {
                cookieParams = { ...cookieParams, maxAge: 1000 * 60 * 60 * 24 * 7 } // for 7 days
            }
            return res
                .cookie("auth_token", generateAuthToken(
                    userExists._id, userExists.name, userExists.lastname, userExists.email, userExists.isAdmin
                ), cookieParams)
                .json({
                    success: "user logged in",
                    userLoggedIn: {
                        _id: userExists._id,
                        name: userExists.name,
                        lastname: userExists.lastname,
                        email: userExists.email,
                        isAdmin: userExists.isAdmin,
                        donotlogout,
                    },
                })
        } else {
            return res.status(401).send("wrong credentials")
        }

    } catch (error) {
        next(error)
    }
}

const updateUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).orFail();
        user.name = req.body.name || user.name;
        user.lastname = req.body.lastname || user.lastname;
        user.phoneNumber = req.body.phoneNumber;
        user.address = req.body.address;
        user.country = req.body.country;
        user.zipCode = req.body.zipCode;
        user.city = req.body.city;
        user.state = req.body.state;
        if (req.body.password !== user.password) {
            user.password = hashPassword(req.body.password);
        }
        await user.save();

        res.json({
            success: "user updated",
            userUpdated: {
                _id: user._id,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                isAdmin: user.isAdmin,
            },
        });

    } catch (error) {
        next(error)
    }
}
const getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).orFail()
        res.send(user)
    } catch (error) {
        next(error)
    }
}

const writeReview = async (req, res, next) => {
    try {
        const session = await Review.startSession();


        // getting comment and rating from req.body 
        const { comment, rating } = req.body;

        // validate request
        if (!(comment && rating)) {
            return res.status(400).send("All inputs are required")
        }

        // creating review id for saving product collection
        const ObjectId = require("mongodb").ObjectId;
        let reviewId = new ObjectId();

        session.startTransaction();
        // array of objects for more then 1 review in schema
        await Review.create([
            {
                _id: reviewId,
                comment: comment,
                rating: Number(rating),
                user: { _id: req.user._id, name: req.user.name + " " + req.user.lastname },
            }
        ], { session: session })

        const product = await Product.findById(req.params.productId).populate("reviews").session(session);
        const alreadyReviewed = product.reviews.find((r) => r.user._id.toString() === req.user._id.toString());
        if (alreadyReviewed) {
            await session.abortTransaction();
            return res.status(400).send("product already reviewed");
        }

        let prodRev = [...product.reviews]
        prodRev.push({ rating: rating });
        product.reviews.push(reviewId)


        if (product.reviews.length === 1) {
            product.rating = Number(rating);
            product.reviewsNumber = 1;
        } else {
            product.reviewsNumber = product.reviews.length;
            let ratingCalc = prodRev.map((item) => Number(item.rating)).reduce((sum, item) => sum + item, 0) / product.reviews.length;
            product.rating = Math.round(ratingCalc)
        }

        await product.save()

        await session.commitTransaction();
        session.endSession()
        // res.send(product)
        res.send("review created")
    } catch (error) {
        next(error)
    }
}

const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
            .select("name lastname email isAdmin").orFail();
        return res.send(user)
    } catch (error) {
        next(error)
    }
}

// lastname upper lower casing to do

const updateUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).orFail();
        user.name = req.body.name || user.name;
        user.lastname = req.body.lastname || user.lastname;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin

        await user.save();
        res.send("User updated");

    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id).orFail();
        // await user.remove();
        res.send("User removed");
    } catch (error) {
        next(error)
    }
}

// setTimeout(() => {   
//     console.log(process.env.JWT_SECRET_KEY)
// }, 1000);
// env variables take time to load thats why it works in function

module.exports = {
    getUsers, registerUser, loginUser, updateUserProfile,
    getUserProfile, writeReview, getUser, updateUser, deleteUser
};