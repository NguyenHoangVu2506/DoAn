'use strict'

const CommentService = require('../services/CommentService');
const  successResponse  = require('../core/success.response');
class commentController {

    createComment = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "created new comment",
            metaData: await CommentService.createComment(req.body)
        }).send(res)
    }

    getCommentByParentId = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "get comment by parent id success",
            metaData: await CommentService.getCommentByParentId(req.body)
        }).send(res)
    }
    deleteComment = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "delete comment success",
            metaData: await CommentService.deleteComment(req.body)
        }).send(res)
    }

}

module.exports = new commentController()