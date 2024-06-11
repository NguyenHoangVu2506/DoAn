'use strict'
const { SuccessResponse } = require("../core/success.response")
const BlogService = require("../services/BlogService")
class BlogController{
    createBlog=async(req,res, next)=>{
        new SuccessResponse({
            message:'success',
            metaData: await BlogService.createBlog({...req.body})
        }).send(res)
    }

    getBlogDetails=async(req,res, next)=>{
        new SuccessResponse({
            message:'success',
            metaData: await BlogService.findBlogDetail(req.body)
        }).send(res)
    }

    getListBlogs=async(req,res, next)=>{
        new SuccessResponse({
            message:'success',
            metaData: await BlogService.getListBlogs({...req.body})
        }).send(res)
    }
    getBlogByTopicId=async(req,res, next)=>{
        new SuccessResponse({
            message:'success',
            metaData: await BlogService.getBlogByTopicId({...req.body})
        }).send(res)
    }
}
module.exports = new BlogController;