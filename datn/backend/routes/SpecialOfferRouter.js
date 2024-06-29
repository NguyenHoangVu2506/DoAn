const express = require("express");
const router = express.Router();
const specialOfferController = require("../controllers/SpecialOfferController");
const { asyncHandler } = require("../helpers");

router.post('', asyncHandler(specialOfferController.createSpecialOffer))
router.post('/getSpecialOfferBySpuId', asyncHandler(specialOfferController.getSpecialOfferBySpuId))
router.post('/findSpecialOfferBetweenStartDateAndEndByDate', asyncHandler(specialOfferController.findSpecialOfferBetweenStartDateAndEndByDate))
router.post('/findAllSpecialOffer', asyncHandler(specialOfferController.findAllSpecialOffer))
router.post('/getSpecialOfferById', asyncHandler(specialOfferController.findSpecialOfferById))


module.exports = router