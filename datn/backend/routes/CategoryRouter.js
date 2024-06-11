const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/CategoryController");
const { asyncHandler } = require("../helpers");

router.post('', asyncHandler(categoryController.createCategory))
router.post('/listCatByParentId', asyncHandler(categoryController.getListCategoryByParentId))
router.post('/findAllCategory', asyncHandler(categoryController.findAllCategory))


module.exports = router