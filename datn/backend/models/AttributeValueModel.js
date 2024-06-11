const { model, Schema } = require('mongoose')
const DOCUMENT_NAME = 'AttributeValue'
const COLLECTION_NAME = 'attributeValues'

const attributeValueSchema = new Schema({
    attribute_id: { type: String, required: true },
    attribute_value: { type: String, required: true },

},
    {
        collection: COLLECTION_NAME,
        timestamps: true
    })
module.exports = {
    attributeValue: model(DOCUMENT_NAME, attributeValueSchema)
}
