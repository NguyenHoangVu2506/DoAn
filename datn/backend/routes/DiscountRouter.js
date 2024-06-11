const express = require("express");
const router = express.Router();
const discountController = require("../controllers/DiscountController");
const { asyncHandler } = require("../helpers");

router.post('/amount', asyncHandler(discountController.getAllDiscountAmount))
router.get('/list_product_code', asyncHandler(discountController.getAllDiscountCodeWithProduct))
router.post('/newcode', asyncHandler(discountController.createDiscountCode))
router.get('/all_code', asyncHandler(discountController.getAllDiscountCode))

module.exports = router