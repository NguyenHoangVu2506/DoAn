const express = require("express");
const router = express.Router();
const galleryController = require("../controllers/GalleryController");
const { asyncHandler } = require("../helpers");

router.post('', asyncHandler(galleryController.addImage))
router.post('/image_spu_id', asyncHandler(galleryController.getImageBySpuId))


module.exports = router