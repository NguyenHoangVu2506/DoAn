const { model, Schema } = require('mongoose')
const DOCUMENT_NAME = 'Attribute'
const COLLECTION_NAME = 'attributes'

const attributeSchema = new Schema({
    attribute_name: { type: String, required: true },
    isPublished: { type: Boolean, default: true, index: true, select: false },

},
    {
        collection: COLLECTION_NAME,
        timestamps: true
    })
module.exports = {
    attribute: model(DOCUMENT_NAME, attributeSchema)
}
