const express = require("express");
const router = express.Router();
const sliderController = require("../controllers/SliderController");
const { asyncHandler } = require("../helpers");

router.post('', asyncHandler(sliderController.createSlider))
router.post('/listSlider', asyncHandler(sliderController.getListSlider))

router.post('/updateSlider', asyncHandler(sliderController.updateSlider))
router.post('/deleteSliderById', asyncHandler(sliderController.deleteSliderById))
router.post('/restoreSliderById', asyncHandler(sliderController.restoreSliderById))
router.post('/pulishSlider', asyncHandler(sliderController.pulishSlider))
router.post('/unpulishSlider', asyncHandler(sliderController.unpulishSlider))
router.post('/getSliderById', asyncHandler(sliderController.getSliderById))
router.post('/getDeleteSliderList', asyncHandler(sliderController.getDeleteSliderList))
router.post('/removeSlider', asyncHandler(sliderController.removeSlider))

module.exports = router