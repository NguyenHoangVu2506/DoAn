"use strict";

const { model, Schema } = require('mongoose')
const slugify = require('slugify')

const DOCUMENT_NAME = "contact"
const COLLECTION_NAME = "contacts"

const contactSchema = new Schema({
    contact_user_name: { type: String, default: "" },
    contact_user_email: { type: String, default: "" },
    contact_user_phone: { type: String, default: "" },
    contact_user_tilte: {type: String, default: ""},
    contact_user_detail: {type: String, default: ""},
    isPublished: { type: Boolean, default: true, index: true, select: false },
    isDeleted: { type: Boolean, default: false, index: true, select: false },
},
    {
        timestamps: {
            createdAt: 'createdOn',
            updatedAt: 'modifiedOn'
        },
        collection: COLLECTION_NAME
    }
)

module.exports = {
    contact: model(DOCUMENT_NAME, contactSchema)
}