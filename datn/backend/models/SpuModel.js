const { model, Schema } = require('mongoose')
const slugify = require('slugify')
const DOCUMENT_NAME = 'Spu'
const COLLECTION_NAME = 'spus'

const spuSchema = new Schema({
    product_name: { type: String, required: true },
    product_thumb: { type: Array, default: [] },
    public_image_id: { type: String, default: null },
    product_short_description: String,
    product_detail: String,
    product_slug: String,
    product_price: { type: Number, required: true },
    product_quantity: { type: Number, required: true },
    product_category: { type: Array, default: [] },
    product_brand: { type: String, default: null },
    product_unit: { type: String, default: null },
    product_attributes: { type: Schema.Types.Mixed, required: true },//
    isDraft: { type: Boolean, default: true, index: true, select: false },
    isPublished: { type: Boolean, default: false, index: true, select: false },
    isDeleted:  { type: Boolean, default: false, index: true, select: false },
    product_status:  { type: Boolean, default: false, index: true, select: false },


    /*{
        attribute_id: 12345,
        attribute_value:[
            {
                value_id: 456
            }
        ]
    }
    */
    product_variations: { type: Array, default: [] },//
    /*
    tier_variation:[
        {
            images:[],
            name:`color`,
            options:[`hoong `, `xanh`]
        },
        {
            name:'size',
            options:[`S`,`M`]
            images:[]
        }
    ]
    */

},

    {
        collection: COLLECTION_NAME,
        timestamps: true
    }
)

spuSchema.pre('save', function (next) {
    this.product_slug = slugify(this.product_name, { lower: true })
    next();
})
spuSchema.index({ product_name: 'text' });

module.exports = {
    spu: model(DOCUMENT_NAME, spuSchema)
}

