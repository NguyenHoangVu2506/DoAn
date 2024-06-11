const { model, Schema } = require('mongoose')
const DOCUMENT_NAME = 'Attribute'
const COLLECTION_NAME = 'attributes'

const attributeSchema = new Schema({
    attribute_name: { type: String, required: true },
},
    {
        collection: COLLECTION_NAME,
        timestamps: true
    })
module.exports = {
    attribute: model(DOCUMENT_NAME, attributeSchema)
}
