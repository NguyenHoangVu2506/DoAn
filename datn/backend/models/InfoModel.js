const { model, Schema } = require('mongoose')
const DOCUMENT_NAME = 'Info'
const COLLECTION_NAME = 'infos'

const infoSchema = new Schema({
    info_name: { type: String, requied: true },
    info_logo: { type: String, default: '' },
    info_mail: { type: String, default: '' },
    info_address: { type: String, default: '' },
    info_hotline: {type: Number, default:0},
    info_phone: {type: Number, default:0},
    info_website: { type:String, default:''},
    other_info:{type:String, default:''},
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
    info: model(DOCUMENT_NAME, infoSchema)
}
