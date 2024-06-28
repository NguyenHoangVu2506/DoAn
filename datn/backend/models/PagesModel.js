const { model, Schema } = require('mongoose')
const slugify  = require('slugify')
const DOCUMENT_NAME = 'Page'
const COLLECTION_NAME = 'pages'

const pageSchema = new Schema({
    page_name:{type:String, requied: true},
    page_title:{type:String, default:''},
    page_detail:{type:String, default:''},
    page_slug: String,
    page_link:{type:String, default:null},
    page_type:{type:String, default:''},
    page_image:{type:String, default:''},
    public_image_id: { type: String, default: null },
    isPublished: { type: Boolean, default: true, index: true},
    isDeleted:  { type: Boolean, default: false, index: true},


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
