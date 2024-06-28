'use strict';
const express = require('express')
const router = express.Router()
const commentController = require('../controllers/CommentController');
const { asyncHandler } = require('../helpers');


router.post('/get', asyncHandler(commentController.getCommentByParentId))

///authentication
// router.use(authentication)
router.post('/create', asyncHandler(commentController.createComment))
router.post('/deleteComment', asyncHandler(commentController.deleteComment))

module.exports = router