'use strict'
const _ = require('lodash')

const SKU_MODEL = require('../models/SkuModel')
const { Types } = require('mongoose')
const newSku = async ({
    spu_id, sku_list
}) => {
    try {
        const convert_sku_list = sku_list.map(sku => {
            const { thumb_url, public_id, ...skuNoImage } = sku;
            return { ...skuNoImage, product_id: spu_id }

        })
        console.log(convert_sku_list)

        const skus = await SKU_MODEL.sku.create(convert_sku_list)
        return skus

    } catch (error) {
        return []
    }
}

const oneSku = async ({ sku_id, product_id }) => {
    try {
        const sku = await SKU_MODEL.sku.findOne({ sku_id, product_id }).lean()
        // if(sku){

        // }
        console.log(sku)
        return _.omit(sku, ['__v', 'updateAt', 'createAt', 'isDeleted'])

    } catch (error) {
        return null
    }
}

const allSkuBySpuId = async ({ product_id }) => {
    try {
        const skus = await SKU_MODEL.sku.find({ product_id:new Types.ObjectId(product_id) }).lean()
        return skus

    } catch (error) {
        return null
    }
}
const getSkuByPrice = async ({ min_price, max_price }) => {
    try {
        const skus = await SKU_MODEL.sku.find({
            sku_price:{
             "min_price":min_price,
             "max_price":max_price
            }
        }).lean()
        return skus
    } catch (error) {
        return null
    }
}
module.exports = {
    newSku, oneSku, allSkuBySpuId, getSkuByPrice
}