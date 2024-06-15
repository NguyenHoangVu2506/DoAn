const { model, Schema } = require('mongoose')
const slugify  = require('slugify')
const DOCUMENT_NAME = 'Topic'
const COLLECTION_NAME = 'topics'

const topicSchema = new Schema({
    topic_name: { type: String, required: true },
    parent_id: { type: String, default: '0' },
    topic_description: String,
    topic_slug: String,
    isDeleted:  { type: Boolean, default: false, index: true},
    isPublished: { type: Boolean, default: true, index: true},
},
    {
        collection: COLLECTION_NAME,
        timestamps: true
    })
    topicSchema.pre('save', function (next) {
        this.topic_slug = slugify(this.topic_name, { lower: true })
        next();
    })
    topicSchema.index({ topic_name: 'text' });
    
module.exports = {
    topic: model(DOCUMENT_NAME, topicSchema)
}