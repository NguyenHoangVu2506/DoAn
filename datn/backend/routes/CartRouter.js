const express = require("express");
const router = express.Router();
const cartController = require("../controllers/CartController");
const { asyncHandler } = require("../helpers");

router.post('', asyncHandler(cartController.addToCart))
router.post('/update', asyncHandler(cartController.updateToCart))
router.post('/delete', asyncHandler(cartController.deleteToCart))
router.post('/listCart', asyncHandler(cartController.listToCart))
router.post('/deleteCartId', asyncHandler(cartController.deleteToCartByCartIdAndUserId))


module.exports = router