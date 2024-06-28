'use strict'
const { ForbiddenRequestError, NotFoundRequestError, ConflictRequestError, BadRequestError } = require('../core/error.response')

const { inventory } = require('../models/InventoryModel')
const { getProductById } = require('../models/repositories/product.repo')
class InventoryService {
    static async addStockInventory({
        stock,
        productId,
        location = '123, dxh, thu duc'
    }) {
        const product = await getProductById(productId)
        if (!product) throw new BadRequestError('the product not exists')
        const query = { inven_productId: productId },
            updateSet = {
                $inc: {
                    inven_stock: stock
                },
                $set: {
                    inven_location: location
                }
            }, options = { upsert: true, new: true }
        return await inventory.findOneAndUpdate(query, updateSet, options)


    }
}
module.exports = InventoryService