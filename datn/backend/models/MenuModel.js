const { model, Schema, Types } = require('mongoose')
const slugify = require('slugify')
const DOCUMENT_NAME = 'menu'
const COLLECTION_NAME = 'menus'

const menuSchema = new Schema({
    menu_name: { type: String, requied: true },
    parent_id: { type: Types.ObjectId, ref: 'menu', default: null },
    menu_link: { type: String, default: '' },
    menu_type: { type: Object, default: '' },
    menu_slug: String,
    menu_position: { type: String, default: '' },
    isPublished: { type: Boolean, default: true, index: true },
    isDeleted: { type: Boolean, default: false, index: true },



},
    {
        collection: COLLECTION_NAME,
        timestamps: {
            createdAt: 'createdOn',
            updatedAt: 'modifiedOn'
        },
    }
)
menuSchema.pre('save', function (next) {
    this.menu_slug = slugify(this.menu_name, { lower: true })
    next();
})
menuSchema.index({ menu_name: 'text' });

module.exports = {
    menu: model(DOCUMENT_NAME, menuSchema)
}
