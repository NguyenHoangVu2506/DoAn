const { model, Schema, Types } = require('mongoose')
const DOCUMENT_NAME = 'specialOffer'
const COLLECTION_NAME = 'specialOffers'

const specialOfferSchema = new Schema({
    special_offer_name: { type: String, required: true },
    special_offer_description: { type: String, required: true },
    special_offer_start_date: { type: Date, required: true }, // ngay bat dau
    special_offer_end_date: { type: Date, required: true }, // ngyay ket thuc
    special_offer_image: { type: Array, default: [] }, // ai da sung
    special_offer_is_active: { type: Boolean, default: true },
    special_offer_spu_list: {type: Schema.Types.Mixed, required: true}
},
    {
        collection: COLLECTION_NAME,
        timestamps: true
    })


module.exports = {
    specialOffer: model(DOCUMENT_NAME, specialOfferSchema)

}

