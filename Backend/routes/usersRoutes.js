// productRoutes.js
const express = require("express");
const router = express.Router();
const {
    getUsers, registerUser,loginUser,updateUserProfile,getUserProfile,
    writeReview,getUser,updateUser,deleteUser
} = require("../controllers/userController");
const { verifyIsLoggedIn,verifyIsAdmin } = require("../middlewares/verifyingAuthToken")

router.post('/register', registerUser);
router.post('/login', loginUser);

// user logged in routes
router.use(verifyIsLoggedIn)
router.patch("/profile", updateUserProfile)
router.get("/profile/:id", getUserProfile)
router.post("/review/:productId", writeReview)

// admin routes
router.use(verifyIsAdmin)
router.get('/', getUsers);
router.get('/:id', getUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;

