const { model, Schema } = require('mongoose')
const { default: slugify } = require('slugify')
const DOCUMENT_NAME = 'Brand'
const COLLECTION_NAME = 'brands'

const brandSchema = new Schema({
    brand_name: { type: String, required: true },
    brand_description: String,
    brand_image: { type: String, default: null },
    brand_slug: String,
    public_image_id: { type: String, default: null },
    isPublished: { type: Boolean, default: true, index: true, select: false },
    isDeleted: { type: Boolean, default: false, index: true, select: false },
},
    {
        collection: COLLECTION_NAME,
        timestamps: true
    })

brandSchema.pre('save', function (next) {
    this.brand_slug = slugify(this.brand_name, { lower: true })
    next();
})
module.exports = {
    brand: model(DOCUMENT_NAME, brandSchema)
}