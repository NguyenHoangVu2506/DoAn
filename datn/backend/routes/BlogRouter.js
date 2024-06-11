const express = require("express");
const router = express.Router();
const BlogController = require("../controllers/BlogController");
const { asyncHandler } = require("../helpers");

router.post('', asyncHandler(BlogController.createBlog))
router.post('/listblog', asyncHandler(BlogController.getListBlogs))
router.post('/getBlogDetails', asyncHandler(BlogController.getBlogDetails))
router.post('/listBlogByTopicId', asyncHandler(BlogController.getBlogByTopicId))



module.exports = router