'use strict'
const { SuccessResponse } = require("../core/success.response")
const BlogService = require("../services/BlogService")

class BlogController {
    createBlog = async (req, res, next) => {
        new SuccessResponse({
            message: 'success',
            metaData: await BlogService.createBlog({ ...req.body })
        }).send(res)
    }

    getBlogDetails = async (req, res, next) => {
        new SuccessResponse({
            message: 'success',
            metaData: await BlogService.findBlogDetail(req.body)
        }).send(res)
    }

    getListBlogs = async (req, res, next) => {
        new SuccessResponse({
            message: 'success',
            metaData: await BlogService.getListBlogs({ ...req.body })
        }).send(res)
    }

    getBlogByTopicId = async (req, res, next) => {
        new SuccessResponse({
            message: 'success',
            metaData: await BlogService.getBlogByTopicId({ ...req.body })
        }).send(res)
    }

    findOneBlog = async (req, res, next) => {
        new SuccessResponse({
            message: 'get blog success',
            metaData: await BlogService.findOneBlog(req.body)
        }).send(res)
    }

    draftBlog = async (req, res, next) => {
        new SuccessResponse({
            message: 'draft Blog success',
            metaData: await BlogService.draftBlog(req.body)
        }).send(res)
        console.log("draftBlog")
    }

    getDraftBlogList = async (req, res, next) => {
        new SuccessResponse({
            message: 'get Draft BlogListsuccess',
            metaData: await BlogService.getDraftBlogList(req.body)
        }).send(res)
        console.log("getDraftBlogList")
    }

    updateBlog = async (req, res, next) => {
        new SuccessResponse({
            message: 'updateBlog success',
            metaData: await BlogService.updateBlog(req.body)
        }).send(res)
        console.log("updateBlog")
    }
    getDeleteBlogList = async (req, res, next) => {
        new SuccessResponse({
            message: 'get Delete Blog List success',
            metaData: await BlogService.getDeleteBlogList({ ...req.body })
        }).send(res)
    }
    deleteBlogById = async (req, res, next) => {
        new SuccessResponse({
            message: 'deleteBlogById success', //xoa tam
            metaData: await BlogService.deleteBlogById({ ...req.body })
        }).send(res)
    }
    restoreBlogById = async (req, res, next) => {
        new SuccessResponse({
            message: 'restoreBlogById success',
            metaData: await BlogService.restoreBlogById(req.body)
        }).send(res)
    }
    pulishBlog = async (req, res, next) => {
        new SuccessResponse({
            message: 'publish brand success',
            metaData: await BlogService.pulishBlog(req.body)
        }).send(res)
    }
    unpulishBlog = async (req, res, next) => {
        new SuccessResponse({
            message: 'unpublish brand success',
            metaData: await BlogService.unpulishBlog(req.body)
        }).send(res)
    }
    removeBlog = async (req, res, next) => {
        new SuccessResponse({
            message: 'remove Blog success',
            metaData: await BlogService.removeBlog(req.body)
        }).send(res)
    }



}
module.exports = new BlogController;