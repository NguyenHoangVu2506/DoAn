const express = require("express");
const router = express.Router();
const BlogController = require("../controllers/BlogController");
const { asyncHandler } = require("../helpers");

router.post('', asyncHandler(BlogController.createBlog))
router.post('/listblog', asyncHandler(BlogController.getListBlogs))
router.post('/getBlogDetails', asyncHandler(BlogController.getBlogDetails))
router.post('/listBlogByTopicId', asyncHandler(BlogController.getBlogByTopicId))

router.post('/updateBlog', asyncHandler(BlogController.updateBlog))
router.post('/deleteBlogById', asyncHandler(BlogController.deleteBlogById))
router.post('/restoreBlogById', asyncHandler(BlogController.restoreBlogById))
router.post('/pulishBlog', asyncHandler(BlogController.pulishBlog))
router.post('/unpulishBlog', asyncHandler(BlogController.unpulishBlog))
router.post('/findOneBlog', asyncHandler(BlogController.findOneBlog))
router.post('/getDeleteBlogList', asyncHandler(BlogController.getDeleteBlogList))
router.post('/removeBlog', asyncHandler(BlogController.removeBlog))
router.post('/draftBlog', asyncHandler(BlogController.draftBlog))
router.post('/getDraftBlogList', asyncHandler(BlogController.getDraftBlogList))







module.exports = router