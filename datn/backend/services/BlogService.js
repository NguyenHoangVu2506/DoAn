'use strict'
const { blog } = require('../models/BlogModel')
const { getSelectData } = require('../utils')
const { findTopicById } = require('./TopicService')

class BlogService {
    async createBlog(payload) {
        const {
            blog_name, topic_id = '0', blog_description, blog_image = [], blog_slug, blog_title, blog_detail
        } = payload
        const newBlog = await blog.create({
            blog_name: blog_name,
            topic_id: topic_id,
            blog_description: blog_description,
            blog_image: blog_image,
            blog_slug: blog_slug,
            blog_title: blog_title,
            blog_detail: blog_detail
        })
        return newBlog
    }
    async findOneBlog({ blog_id }) {
        const getBlog = await blog.findOne({ _id: blog_id }).lean()
        return getBlog
    }
    async findBlogDetail({ blog_id }) {
        let blog_detail = {
            post: {},
            topic: {},
            related_posts: []
        }
        blog_detail.post = await blog.findOne({ _id: blog_id }).lean()
        blog_detail.topic = await findTopicById({ topic_id: blog_detail.post.topic_id })
        blog_detail.related_posts = await blog.find({
            isPublished: true,
            _id: {
                $ne: blog_detail.post._id
            },
            topic_id: blog_detail.post.topic_id
        })
        return blog_detail

    }
    async getListBlogs({ sort, isPublished = true, select }) {
        const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
        const listBlog = await blog.find({
            isPublished
        }).sort(sortBy)
            .select(getSelectData(select))
            .lean()
        return listBlog
    }
    async getBlogByTopicId({ sort, topic_id, select }) {
        const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
        const blogByTopicId = await blog.find({
            "topic_id": topic_id
        }).sort(sortBy)
            .select(getSelectData(select))
            .lean()
        return blogByTopicId
    }

    async updateBlog({ blog_id, blog_name, topic_id, blog_description, blog_image, blog_title, blog_detail }) {
        try {
            const query = { _id: blog_id }
            const updates = {
                $set: {
                    blog_id: blog_id,
                    blog_name: blog_name,
                    topic_id: topic_id,
                    blog_description: blog_description,
                    blog_image: blog_image,
                    blog_title: blog_title,
                    blog_detail: blog_detail
                }
            }, options = {
                returnNewDocument: true
            }
            return await blog.findOneAndUpdate(query, updates, options)

        } catch (error) {
            console.log(`error`)
        }
    }
    
    async pulishBlog({ blog_id, isPublished = false, isDraft = true }) {
        try {
            const query = {
                _id: blog_id,
                isPublished,
                isDraft
            }, updateSet = {
                $set: {
                    isPublished: true,
                    isDraft: false
                },
            }, options = {
                upsert: true
            }
            return await blog.updateOne(query, updateSet, options)
        } catch (error) {
        }
    }

    async unpulishBlog({ blog_id, isPublished = true, isDraft = false }) {
        try {
            const query = {
                _id: blog_id,
                isPublished,
                isDraft
            }, updateSet = {
                $set: {
                    isPublished: false,
                    isDraft: true
                },
            }, options = {
                upsert: true
            }
            return await blog.updateOne(query, updateSet, options)
        } catch (error) {
        }
    }

    async draftBlog(payload) {
        const {
            blog_name, topic_id = '0', blog_description, blog_image = [],
            blog_slug, blog_title, blog_detail, isDraft = true, isPublished = false
        } = payload

        const draftBlog = await blog.create({
            blog_name: blog_name,
            topic_id: topic_id,
            blog_description: blog_description,
            blog_image: blog_image,
            blog_slug: blog_slug,
            blog_title: blog_title,
            blog_detail: blog_detail,
            isDraft: isDraft,
            isPublished: isPublished
        })
        return draftBlog
    }

    async getDraftBlogList({ sort, isDraft = true, isPublished = false }) {
        try {
            const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
            const listdraftblog = await blog.find({
                isDraft, isPublished
            }).sort(sortBy)
                .lean()
            console.log("listdraftblog", listdraftblog)

            return listdraftblog
        } catch (error) {

        }
    }
    async removeBlog({ blog_id }) {
        return await blog.deleteOne({ _id: blog_id }).lean()
    }
    async deleteBlogById({ blog_id, isDeleted = false }) {
        try {
            const query = {
                _id: blog_id,
                isDeleted
            }, updateSet = {
                $set: {
                    isDeleted: true
                },
            }, options = {
                upsert: true
            }
            console.log(updateSet)
            return await blog.updateOne(query, updateSet, options)
        } catch (error) {
        }
    }
    async restoreBlogById({ blog_id, isDeleted = true }) {
        try {
            const query = {
                _id: blog_id,
                isDeleted
            }, updateSet = {
                $set: {
                    isDeleted: false
                },
            }, options = {
                upsert: true
            }
            console.log(updateSet)
            return await blog.updateOne(query, updateSet, options)
        } catch (error) {

        }
    }
    async getDeleteBlogList({ sort, isDeleted = true }) {
        try {
            const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
            const listblog = await blog.find({
                isDeleted
            }).sort(sortBy)
                .lean()
            console.log("listblog", listblog)

            return listblog
        } catch (error) {

        }
    }
    async removeBlog({ blog_id }) {
        return await blog.deleteOne({ _id: blog_id }).lean()
    }

}
module.exports = new BlogService