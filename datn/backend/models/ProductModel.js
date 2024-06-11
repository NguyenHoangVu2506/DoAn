const { model, Schema } = require('mongoose')
const slugify =require('slugify')
const DOCUMENT_NAME = 'Product'
const COLLECTION_NAME = 'Products'

const productSchema = new Schema({
    product_name: { type: String, required: true },
    product_thumb: { type: String, required: true },
    product_description: String,
    product_slug: String,
    product_price: { type: Number, required: true },
    product_quantity: { type: Number, required: true },
    product_type: { type: String, required: true, enum: ['Skincare', 'Bodycare', 'Haircare'] },
    product_attributes: { type: Schema.Types.Mixed, required: true },
    product_ratingAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be above 5.0'],
        set: (val) => Math.round(val * 10) / 10
    },
    product_variations:{type:Array, default:[]},
    isDraft:{type:Boolean,default:true,index:true,select:false},
    isPublished:{type:Boolean, default:false,index:true,select:false},
    isDeleted:  { type: Boolean, default: false, index: true, select: false },


},
    {
        collection: COLLECTION_NAME,
        timestamps: true
    })
// create index search 
productSchema.index({product_name:'text'})
//document middleware runs before .save() create()
productSchema.pre('save',function(next){
    this.product_slug=slugify(this.product_name,{lower:true})
    next();
})

const skincareSchema = new Schema({
    brand: { type: String, required: true },
    size: String,
    material: String
},
    {
        collection: 'skincares',
        timestamps: true

    })

const bodycareSchema = new Schema({
    brand: { type: String, required: true },
    size: String,
    material: String
},
    {
        collection: 'bodycares',
        timestamps: true

    })

const haircareSchema = new Schema({
    brand: { type: String, required: true },
    size: String,
    material: String
},
    {
        collection: 'haircares',
        timestamps: true

    })




module.exports = {
    product: model(DOCUMENT_NAME, productSchema),
    skincare: model('Skincare', skincareSchema),
    bodycare: model('Bodycare', bodycareSchema),
    haircare: model('Haircare', haircareSchema),

}

