// productController.js
const recordsPerPage = require("../config/pagination");
const Product = require("../models/ProductModel")
const imageValidate = require("../utils/imageValidate")

const getProducts = async (req, res, next) => {

    try {
        // pagination
        const pageNum = Number(req.query.pageNum) || 1

        let query = {}
        let queryCondition = false  // by default we dont want any filter

        // price filter
        let priceQueryCondition = {}
        if (req.query.price) {
            queryCondition = true
            priceQueryCondition = { price: { $lte: Number(req.query.price) } }
        }

        // rating filter
        let ratingQueryCondition = {}
        if (req.query.price) {
            queryCondition = true
            ratingQueryCondition = { rating: { $in: req.query.rating.split(",") } }
        }



        // filtering category from seleting
        let categoryQueryCondition = {}
        const categoryName = req.params.categoryName || ""
        // if no category name provided
        if (categoryName) {
            queryCondition = true
            let a = categoryName.replaceAll(",", "/")
            var regEx = new RegExp("^" + a)
            categoryQueryCondition = { category: regEx }
        }


        // filtering category from searching in categories
        if (req.query.category) {
            queryCondition = true
            let a = req.query.category.split(",").map((item) => {
                if (item) return RegExp("^" + item)
            })
            categoryQueryCondition = { category: { $in: a } } // here a is array
        }
        // overwridding with or condition for filter to include this category also
        // if query applied by searching for catgeories


        let attrsQueryCondition = [];
        if (req.query.attrs) {
            // attrs=RAM-1TB-2TB-4TB,color-blue-red
            // [ 'RAM-1TB-4TB', 'color-blue', '' ]
            attrsQueryCondition = req.query.attrs.split(",").reduce((acc, item) => {
                if (item) {
                    let a = item.split("-");
                    let values = [...a];
                    values.shift(); // removes first item
                    let a1 = {
                        attrs: { $elemMatch: { key: a[0], value: { $in: values } } },
                    };
                    acc.push(a1);
                    // console.dir(acc, { depth: null })
                    return acc;
                } else return acc;
            }, []);
            // currItem initially points to arr[1] using [] now arr[0]
            queryCondition = true
        }



        // sort by name, price etc.
        let sort = {}
        const sortOption = req.query.sort || "" // will chnage dynamically by htmlFor
        if (sortOption) {
            let sortOpt = sortOption.split("_")
            sort = { [sortOpt[0]]: Number(sortOpt[1]) }
            // [] is used for creating dynamic key names fromt he val

            console.log(sort)
        }

        // query for searching box
        const searchQuery = req.params.searchQuery || ""
        let searchQueryCondition = {}
        let select = {}
        if (searchQuery) {
            queryCondition = true
            // due to index of name and description as text created
            searchQueryCondition = { $text: { $search: '"' + searchQuery + '"' } }
            select = {
                score: { $meta: "textScore" }
            }

            sort = { score: { $meta: "textScore" } }
        }


        if (queryCondition) {
            query = {
                $and: [
                    priceQueryCondition,
                    ratingQueryCondition,
                    categoryQueryCondition,
                    ...attrsQueryCondition, // to extract all objects from array
                    searchQueryCondition
                ]
            }
        }

        // let a = [{ Ram: '1 TB'}, {color: 'blue'}]
        // console.log(...a)  { Ram: '1 TB' } { color: 'blue' }

        const totalProducts = await Product.countDocuments(query)
        const products = await Product
            .find(query)
            .select(select)
            .skip(recordsPerPage * (pageNum - 1))
            .sort(sort)
            .limit(recordsPerPage)

        res.json({
            products,
            pageNum,
            paginationLinksNumber: Math.ceil(totalProducts / recordsPerPage)
        })
    } catch (error) {
        next(error)
    }
};

const getProductsByID = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate("reviews")
            .orFail();
        res.json(product);
    } catch (err) {
        next(err);
    }
};

const getBestsellers = async (req, res, next) => {
    try {
        const products = await Product.aggregate([
            { $sort: { category: 1, sales: -1 } },
            { $group: { _id: "$category", doc_with_max_sales: { $first: "$$ROOT" } } },
            { $replaceWith: "$doc_with_max_sales" },
            { $match: { sales: { $gt: 0 } } },
            { $project: { _id: 1, name: 1, images: 1, description: 1, category: 1 } },
            { $limit: 3 }
        ]);
        res.json(products);
    } catch (err) {
        next(err);
    }
};

const getAdminProducts = async (req, res, next) => {
    try {
        const products = await Product.find({}).sort({ category: 1 })
            .select('name price category')

        return res.json(products)

    } catch (error) {
        next(error)
    }
}

const adminDeleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id).orFail()
        res.json({ message: "product removed" })
        if (Array.isArray(req.files.images)) {
            res.send("ÿou sent" + req.files.images.length + "images")
        } else {
            res.send("you sent only one image ")
        }

    } catch (error) {
        next(error)
    }
}

const adminCreateProduct = async (req, res, next) => {
    try {
        const product = new Product()
        const { name, description, category, count, price, attributesTable } = req.body
        product.name = name;
        product.description = description;
        product.count = count;
        product.category = category;
        product.price = price;
        if (attributesTable.length > 0) {
            attributesTable.map((item) => {
                product.attrs.push(item);
            });
        }
        await product.save();
        res.json({
            message: "product created",
            productId: product._id,
        });

    } catch (error) {
        next(error)
    }
}


const adminUpdateProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).orFail();
        const { name, description, count, price, category, attributesTable } =
            req.body;
        product.name = name || product.name;
        product.description = description || product.description;
        product.count = count || product.count;
        product.price = price || product.price;
        product.category = category || product.category;
        if (attributesTable.length > 0) {
            product.attrs = [];
            attributesTable.map((item) => {
                product.attrs.push(item);
            });
        } else {
            product.attrs = [];
        }

        await product.save();
        res.json({
            message: "product updated",
        });
    } catch (err) {
        next(err);
    }
};

const adminUpload = async (req, res, next) => {
    try {
        if (!req.files || !req.files.images) {
            return res.status(400).send("No files were uploaded.");
        }
        const validateResult = imageValidate(req.files.images)
        if (validateResult.error) {
            return res.status(400).send(validateResult.error)
        }

        let images = req.files.images;
        const path = require("path")
        const { v4: uuidv4 } = require('uuid');
        const uploadDirectory = path.resolve(
            __dirname, "../../Frontend", "public", "images", "products"
        )

        let product = await Product.findById(req.query.productId)
        let imagesTable = []

        if (Array.isArray(images)) {
            // return res.send("Files uploaded! length: " + images.length);
            imagesTable = images
        }
        else {
            // return res.send("You uploaded only 1 image");
            imagesTable.push(images)
        }

        for (let image of imagesTable) {
            // console.log(uuidv4())
            // console.log(path.extname(image.name))

            // to save in server
            let fileName = uuidv4() + path.extname(image.name)
            var uploadPath = uploadDirectory + "/" + fileName

            // to update in database the absolute images path:
            product.images.push({ path: "/images/products/" + fileName })

            image.mv(uploadPath, function (err) {
                if (err) return res.status(500).send("server error")
            })
        }
        await product.save()
        res.send("File uploaded!")

    } catch (err) {
        next(err);
    }
};

const adminDeleteProductImage = async (req, res, next) => {
    try {
        const imagePath = decodeURIComponent(req.params.imagePath)
        console.log(imagePath)

        const path = require("path")
        const finalPath = path.resolve("../Frontend/public") + imagePath
        // console.log(finalPath)
        const fs = require("fs");
        fs.unlink(finalPath, (err) => {
            if (err) {
                res.status(500).send(err);
            }
        });
        await Product.findOneAndUpdate(
            { _id: req.params.productId },     //since images is array so pull
            { $pull: { images: { path: imagePath } } }
        ).orFail()

        return res.end()
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getProducts, getProductsByID, getBestsellers, getAdminProducts,
    adminDeleteProduct, adminCreateProduct, adminUpdateProduct,
    adminUpload, adminDeleteProductImage
};