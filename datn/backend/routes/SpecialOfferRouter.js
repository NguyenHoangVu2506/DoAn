const express = require("express");
const router = express.Router();
const specialOfferController = require("../controllers/SpecialOfferController");
const { asyncHandler } = require("../helpers");

router.post('', asyncHandler(specialOfferController.createSpecialOffer))
router.post('/listSpecialOffer', asyncHandler(specialOfferController.getSpecialOfferBySpuId))
router.post('/findSpecialOfferBetweenStartDateAndEndByDate', asyncHandler(specialOfferController.findSpecialOfferBetweenStartDateAndEndByDate))


module.exports = router