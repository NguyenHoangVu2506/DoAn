const express = require("express");
const router = express.Router();
const spuAttributeController = require("../controllers/SpuAttributeController");
const { asyncHandler } = require("../helpers");

router.post('', asyncHandler(spuAttributeController.createSpuAttribute))

module.exports = router