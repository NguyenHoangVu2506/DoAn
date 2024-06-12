const { model, Schema } = require('mongoose')
const DOCUMENT_NAME = 'Slider'
const COLLECTION_NAME = 'sliders'

const sliderSchema = new Schema({
    slider_name:{type:String, requied: true},
    slider_link:{type:String, default:null},
    slider_image:{ type:String},
    slider_summary:{ type:String, default:null},
    slider_position:{type:String, enum:["banner"],default:'banner'},
    slider_is_active:{type:Boolean, default: false},
    isDeleted:  { type: Boolean, default: false, index: true, select: false },
    isPublished: { type: Boolean, default: true, index: true, select: false },
},
    {
        collection: COLLECTION_NAME,
        timestamps: {
            createdAt: 'createdOn',
            updatedAt: 'modifiedOn'
        },
    }
)
module.exports = {
    slider: model(DOCUMENT_NAME, sliderSchema)
}