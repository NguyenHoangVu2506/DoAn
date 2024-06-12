const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/CategoryController");
const { asyncHandler } = require("../helpers");

router.post('', asyncHandler(categoryController.createCategory))
router.post('/listCatByParentId', asyncHandler(categoryController.getListCategoryByParentId))
router.post('/findAllCategory', asyncHandler(categoryController.findAllCategory))

router.post('/update', asyncHandler(categoryController.updateCategory))
router.post('/deleteCategory', asyncHandler(categoryController.deleteCategory))
router.post('/restoreCategory', asyncHandler(categoryController.restoreCategory))
router.post('/publishCategory', asyncHandler(categoryController.publishCategory))
router.post('/unpublishCategory', asyncHandler(categoryController.unpublishCategory))
router.post('/getCategory', asyncHandler(categoryController.getCategoryById))
router.post('/getDeleteCategoryList', asyncHandler(categoryController.getDeleteCategoryList))
router.post('/removeCategory', asyncHandler(categoryController.removeCategory))


module.exports = router