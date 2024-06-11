'use strict'
const { blog } = require('../models/BlogModel')
const { getSelectData } = require('../utils')
const { findTopicById } = require('./TopicService')

class BlogService {
    static async createBlog(payload) {
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
    static async findOneBlog({ blog_id }) {
        const getBlog = await blog.findOne({ _id: blog_id }).lean()
        return getBlog

    }

    static async findBlogDetail({ blog_id }) {
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

    static async getListBlogs({ sort, isPublished = true, select }) {
        const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
        const listBlog = await blog.find({
            isPublished
        }).sort(sortBy)
            .select(getSelectData(select))
            .lean()
        return listBlog
    }

    static async getBlogByTopicId({ sort, topic_id, select }) {
        const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
        const blogByTopicId = await blog.find({
            "topic_id": topic_id
        }).sort(sortBy)
            .select(getSelectData(select))
            .lean()
        return blogByTopicId
    }

}
module.exports = BlogService