const { model, Schema } = require('mongoose')
const DOCUMENT_NAME = 'SpuAttribute'
const COLLECTION_NAME = 'spuAttributes'

const spuAttributeSchema = new Schema({
    product_id:{type:String, default:''},
    attribute_id: { type: String, required: true }
},
    {
        collection: COLLECTION_NAME,
        timestamps: true
    })
module.exports = {
    spuAttribute: model(DOCUMENT_NAME, spuAttributeSchema)
}
