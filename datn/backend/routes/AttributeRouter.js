const express = require("express");
const router = express.Router();
const attributeController = require("../controllers/AttributeController");
const { asyncHandler } = require("../helpers");

router.post('', asyncHandler(attributeController.createAttribute))
router.post('/get_Attribute',asyncHandler(attributeController.getAttribute))
router.post('/getAllAttribute',asyncHandler(attributeController.getAllAttribute))


 
module.exports = router