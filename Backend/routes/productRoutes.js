// productRoutes.js
const express = require("express");
const router = express.Router();
const { verifyIsLoggedIn,verifyIsAdmin } = require("../middlewares/verifyingAuthToken")
const {
      getProducts, getProductsByID, getBestsellers, getAdminProducts,
      adminDeleteProduct,adminCreateProduct,adminUpdateProduct,adminUpload,
      adminDeleteProductImage
} = require("../controllers/productController");

router.get('/category/:categoryName', getProducts);
router.get('/category/:categoryName/search/:searchQuery', getProducts);
router.get('/search/:searchQuery', getProducts);

router.get('/get-one/:id', getProductsByID);
router.get('/', getProducts);
router.get("/bestsellers", getBestsellers)


// admin routes

// middleware to get access to resources 
router.use(verifyIsLoggedIn)
router.use(verifyIsAdmin)

router.get("/admin", getAdminProducts)
router.delete("/admin/:id", adminDeleteProduct)
router.post("/admin", adminCreateProduct)
router.patch("/admin/:id", adminUpdateProduct)
router.post("/admin/upload", adminUpload)
router.delete("/admin/image/:imagePath/:productId", adminDeleteProductImage)

module.exports = router
