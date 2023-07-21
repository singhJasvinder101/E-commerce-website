// productRoutes.js
const express = require("express");
const router = express.Router();
const {
    getUserOrders,getOrder,createOrder,updateOrderToPaid,
    updateOrderToDelivered,getOrders,getOrderAnalysis
} = require("../controllers/ordersController");
const { verifyIsLoggedIn,verifyIsAdmin } = require("../middlewares/verifyingAuthToken")

// user routes
router.use(verifyIsLoggedIn);
router.get('/', getUserOrders);
router.get('/user/:id', getOrder);
router.post('/', createOrder)
router.patch('/paid/:id', updateOrderToPaid)

// admin routes
router.use(verifyIsAdmin)
router.patch('/delivered/:id', updateOrderToDelivered)
router.get('/admin', getOrders)
router.get('/analysis/:date', getOrderAnalysis)

module.exports = router;

