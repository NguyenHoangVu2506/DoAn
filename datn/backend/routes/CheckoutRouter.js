const express = require("express");
const router = express.Router();
const checkoutController = require("../controllers/CheckoutController");

router.post('/review',  checkoutController.checkout)
router.post('/order',  checkoutController.orderByUser)
router.post('/findOrderById',  checkoutController.orderById)

router.post('/findOrderByUser',  checkoutController.findOrderByUser)
router.get('/findAllOrder',  checkoutController.findAllOrder)
router.post('/updateStatusByOrder',  checkoutController.updateOrderStatusByOrder)



module.exports = router
