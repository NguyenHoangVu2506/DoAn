const { model, Schema, Types } = require('mongoose')
const { default: slugify } = require('slugify')
const DOCUMENT_NAME = 'Category'
const COLLECTION_NAME = 'categories'

const categorySchema = new Schema({
    parent_id: { type: String, default: null },
    category_name: { type: String, required: true },
    category_description: String,
    category_icon: String,
    category_slug:String,
    category_position: { type: String, default: null },
    category_image: { type: String, default: null },
    isPublished: { type: Boolean, default: true, index: true, select: false },
    category_status: { type: Boolean, default: true, index: true, select: false }
},
    {
        collection: COLLECTION_NAME,
        timestamps: true
    }

)

categorySchema.pre('save', function (next) {
    this.category_slug = slugify(this.category_name, { lower: true })
    next();
})
    
module.exports = {
    category: model(DOCUMENT_NAME, categorySchema)
}

