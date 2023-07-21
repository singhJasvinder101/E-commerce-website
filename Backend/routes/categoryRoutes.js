// productRoutes.js
const express = require("express");
const router = express.Router();
const {getCategories, newCategory, deleteCategory, saveAttrs, deleteAttribute} = require("../controllers/categoryControllers");
const { verifyIsLoggedIn,verifyIsAdmin } = require("../middlewares/verifyingAuthToken")

router.get('/', getCategories);

router.use(verifyIsLoggedIn )
router.post('/', newCategory);
router.delete('/:category', deleteCategory);

router.post('/attr', saveAttrs);
router.patch('/attr', deleteAttribute);

module.exports = router;

