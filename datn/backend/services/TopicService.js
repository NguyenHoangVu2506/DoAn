'use strict'
const { topic } = require('../models/TopicModel')
const { getSelectData } = require('../utils')

class TopicService {
    static async createTopic(payload) {
        const {
            parent_id, name, description, slug
        } = payload

        const newTopic = await topic.create({
            parent_id: parent_id,
            topic_name: name,
            topic_description: description,
            topic_image: slug
        })
        return newTopic

    }

    static async getListTopic({ isPublished = true }) {
        const listTopic = await topic.find({
            isPublished
        }).lean()
        return listTopic
    }

    static async getListTopicByParentId({ sort, parent_id, select }) {
        const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
        const listTopicByParentId = await topic.find({
            "parent_id": parent_id
        }).sort(sortBy)
            .select(getSelectData(select))
            .lean()
        return listTopicByParentId
    }

    static async findTopicById({ isPublished = true, topic_id }) {
        const Topic = await topic.findOne({
            isPublished,
            _id: topic_id
        }).lean()
        return Topic
    }


}
module.exports = TopicService