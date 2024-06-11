const { model, Schema, Types } = require('mongoose')
const slugify = require('slugify')
const DOCUMENT_NAME = 'Sku'
const COLLECTION_NAME = 'skus'

const skuSchema = new Schema({
    sku_tier_idx:{type: Array, default:[0]},
    sku_default:{type: Boolean, default: false},
    slu_slug:{type: String, default:''},
    sku_sort:{type: Number, default: 0},
    sku_price:{type: Number, required: true},
    sku_stock: {type:Number, default: 0 },
    product_id: { type: Types.ObjectId, required: true },
    isDraft: { type: Boolean, default: true, index: true, select: false },
    isPublished: { type: Boolean, default: false, index: true, select: false },
    isDeleted: { type: Boolean, default: false }
},
    {
        collection: COLLECTION_NAME,
        timestamps: true
    })
module.exports = {
    sku: model(DOCUMENT_NAME, skuSchema)
}

