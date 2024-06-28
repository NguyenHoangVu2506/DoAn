"use strict";

const { model, Schema } = require('mongoose')
const slugify = require('slugify')

const DOCUMENT_NAME = "user"
const COLLECTION_NAME = "users"

const userSchema = new Schema({
    user_account_id: { type: String, default: null },
    user_slug: { type: String, default: "" },
    user_name: { type: String, default: "" },
    user_password: { type: String, default: "" },
    user_salf: { type: String, default: "" },
    user_email: { type: String, default: "" },
    user_phone: { type: String, default: "" },
    user_sex: { type: String, default: "" },
    user_avatar: { type: String, default: "" },
    user_age: { type: Number, default: null },
    user_provider: { type: String, default: "" },
    user_role: { type: String, default: 'customer', enum: ['admin', 'customer'] },
    isPublished: { type: Boolean, default: true, index: true, select: false },
    isDeleted: { type: Boolean, default: false, index: true, select: false },
},
    {
        timestamps: true,
        collection: COLLECTION_NAME
    }
)
userSchema.pre('save', function (next) {
    this.user_slug = slugify(this.user_name, { lower: true })
    next();
})


module.exports = model(DOCUMENT_NAME, userSchema)