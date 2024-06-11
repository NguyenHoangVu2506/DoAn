const { model, Schema } = require('mongoose')
const slugify  = require('slugify')
const DOCUMENT_NAME = 'Page'
const COLLECTION_NAME = 'pages'

const pageSchema = new Schema({
    page_name:{type:String, requied: true},
    page_title:{type:String, default:''},
    page_detail:{type:String, default:''},
    page_slug: String,
    page_type:{type:String, default:''},
    page_image:{type:String, default:''},
    isDeleted:  { type: Boolean, default: false, index: true, select: false },


},
    {
        collection: COLLECTION_NAME,
        timestamps: {
            createdAt: 'createdOn',
            updatedAt: 'modifiedOn'
        },
    }
)
pageSchema.pre('save', function (next) {
    this.page_slug = slugify(this.page_name, { lower: true })
    next();
})
pageSchema.index({ page_name: 'text' });


module.exports = {
    page: model(DOCUMENT_NAME, pageSchema)
}
