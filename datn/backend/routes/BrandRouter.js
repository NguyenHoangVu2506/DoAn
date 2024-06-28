const express = require("express");
const router = express.Router();
const brandController = require("../controllers/BrandController");
const { asyncHandler } = require("../helpers");

router.post('', asyncHandler(brandController.createBrand))
router.post('/getBrandList', asyncHandler(brandController.getListBrand))

router.post('/update', asyncHandler(brandController.updateBrand))
router.post('/deleteBrand', asyncHandler(brandController.deleteBrandById))
router.post('/restoreBrand', asyncHandler(brandController.restoreBrandById))
router.post('/publishBrand', asyncHandler(brandController.publishBrand))
router.post('/unpublishBrand', asyncHandler(brandController.unpublishBrand))
router.post('/getBrand', asyncHandler(brandController.getBrand))
router.post('/getDeleteBrandList', asyncHandler(brandController.getDeleteBrandList))
router.post('/removeBrand', asyncHandler(brandController.removeBrand))




module.exports = router