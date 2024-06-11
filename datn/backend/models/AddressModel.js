const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DOCUMENT_NAME = "address"
const COLLECTION_NAME = "addresses"

const addressSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'user', require: true },
    phone_number: String,
    street: String,
    postal_code: String,
    city: String,
    country: String,
    isDefault: { type: Boolean, default: false }
},
    {
        timestamps: true,
        collection: COLLECTION_NAME
    });

module.exports = mongoose.model(DOCUMENT_NAME, addressSchema);