const express = require("express");
const router = express.Router();
const checkoutController = require("../controllers/CheckoutController");

router.post('/review',  checkoutController.checkout)
router.post('/order',  checkoutController.orderByUser)
router.post('/findOrderByUser',  checkoutController.findOrderByUser)
router.post('/findAllOrder',  checkoutController.findAllOrder)
router.post('/updateStatusByOrder',  checkoutController.updateOrderStatusByOrder)



module.exports = router
