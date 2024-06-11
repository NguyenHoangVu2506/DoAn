"use strict";
const InventoryService = require('../services/InventoryService');
const { SuccessResponse } = require('../core/success.response')

class InventoryController {
    addStockToInventory = async(req, res, next) => {
        console.log('1')
        return new SuccessResponse({
            message: "created new addStockToInventory",
            metaData: await InventoryService.addStockInventory(req.body)
        }).send(res)

    }
}

module.exports = new InventoryController()