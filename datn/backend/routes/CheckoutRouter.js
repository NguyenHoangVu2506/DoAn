const express = require("express");
const router = express.Router();
const checkoutController = require("../controllers/CheckoutController");

router.post('/review',  checkoutController.checkout)
router.post('/order',  checkoutController.orderByUser)
router.post('/findOrderByUser',  checkoutController.findOrderByUser)
router.get('/findAllOrder',  checkoutController.findAllOrder)


module.exports = router
