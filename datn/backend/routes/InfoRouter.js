const express = require("express");
const router = express.Router();
const infoController = require("../controllers/InfoController");
const { asyncHandler } = require("../helpers");

router.post('', asyncHandler(infoController.createInfo))
router.post('/getInfo', asyncHandler(infoController.getInfo))


module.exports = router