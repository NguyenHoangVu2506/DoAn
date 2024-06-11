const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/InventoryController");
const { asyncHandler } = require("../helpers");

router.post('/review',  asyncHandler(inventoryController.addStockToInventory))

module.exports = router