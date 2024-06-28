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

    static async getListTopic({ isDeleted = false }) {
        const listTopic = await topic.find({
            isDeleted
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

    static async updateTopic ({ topic_id, topic_name, topic_description, topic_image }) {
        try {
            const query = { _id: topic_id }
            const updates = {
                $set: {
                    topic_name: topic_name,
                    topic_description: topic_description,
                    topic_image: topic_image
                }
            }, options = {
                returnNewDocument: true,
                new:true
            }
            return await topic.findOneAndUpdate(query, updates, options)
    
        } catch (error) {
            console.log(`error`)
    
        }
    }
    
    static async pulishTopic({ topic_id, isPublished = false }) {
        try {
            const query = {
                _id: topic_id,
                isPublished
            }, updateSet = {
                $set: {
                    isPublished: true
                },
            }, options = {
                upsert: true,
                new:true
            }
            return await topic.updateOne(query, updateSet, options)
        } catch (error) {
        }
    }
    
    static async unpulishTopic ({ topic_id, isPublished = true }) {
        try {
            const query = {
                _id: topic_id,
                isPublished
            }, updateSet = {
                $set: {
                    isPublished: false
                },
            }, options = {
                upsert: true,
                new:true
            }
            return await topic.updateOne(query, updateSet, options)
        } catch (error) {
        }
    }
    
    static async deleteTopicById ({ topic_id, isDeleted = false }) {
        try {
            const query = {
                _id: topic_id,
                isDeleted
            }, updateSet = {
                $set: {
                    isDeleted: true
                },
            }, options = {
                upsert: true,
                new:true
            }
            console.log(updateSet)
            return await topic.updateOne(query, updateSet, options)
        } catch (error) {
        }
    }
    
    static async restoreTopicById  ({ topic_id, isDeleted = true }){
        try {
            const query = {
                _id: topic_id,
                isDeleted
            }, updateSet = {
                $set: {
                    isDeleted: false
                },
            }, options = {
                upsert: true,
                new:true
            }
            console.log(updateSet)
            return await topic.updateOne(query, updateSet, options)
        } catch (error) {
    
        }
    
    }
    
    static async getDeleteTopicList ({ sort, isDeleted = true })  {
        try {
            const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
            const listtopic = await topic.find({
                isDeleted
            }).sort(sortBy)
                .lean()
            console.log("listtopic", listtopic)
    
            return listtopic
        } catch (error) {
    
        }
    }
    
    static async removeTopic ({ topic_id }) {
        return await topic.deleteOne({ _id: topic_id }).lean()
    }
    


}
module.exports = TopicService