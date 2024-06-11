const express = require("express");
const router = express.Router();
const sliderController = require("../controllers/SliderController");
const { asyncHandler } = require("../helpers");

router.post('', asyncHandler(sliderController.createSlider))
router.post('/listSlider', asyncHandler(sliderController.getListSlider))


module.exports = router