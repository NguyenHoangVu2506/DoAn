'use strict';

const { model, Schema } = require('mongoose')

const DOCUMENT_NAME = 'comment'
const COLLECTION_NAME = 'comments'

const commentSchema = new Schema({
    comment_productId: { type: Schema.Types.ObjectId, ref: 'spu' },
    comment_userId: { type: Schema.Types.ObjectId, ref: 'user' },
    comment_content: { type: String, default: 'text' },
    // comment_left: { type: Number, default: 0 },
    // comment_right: { type: Number, default: 0 },
    comment_rating: { type: Number, required: true, min: 1, max: 5 },
    // comment_parentId: { type: Schema.Types.ObjectId, ref: DOCUMENT_NAME },
    isDeleted: { type: Boolean, default: false, index: true, select: false },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})

module.exports = model(DOCUMENT_NAME, commentSchema)