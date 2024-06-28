const express = require("express");
const router = express.Router();
const cartController = require("../controllers/CartController");
const { asyncHandler } = require("../helpers");

router.post('/addToCart', asyncHandler(cartController.addToCart))
router.post('/listCart', asyncHandler(cartController.listToCart))
router.post('/deleteCartIdUserId', asyncHandler(cartController.deleteToCartByCartIdAndUserId))
router.post('/deleteCartItem', asyncHandler(cartController.deleteCartItem))

router.post('/updateSkuFromCartV2', asyncHandler(cartController.updateSkuFromCartV2))
router.post('/updateQuantityFromCart', asyncHandler(cartController.updateQuantityFromCart))
router.post('/updateSkuFromCart', asyncHandler(cartController.updateSkuFromCart))
router.post('/findUserCart', asyncHandler(cartController.findUserCart))






module.exports = router