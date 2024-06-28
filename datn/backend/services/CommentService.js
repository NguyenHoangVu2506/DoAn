// const { Types } = require('mongoose');
// const { errorResponse } = require('../core/error.response');
// const commentRepository = require('../models/repositories/comment.repo');
// const Comment = require('../models/CommentModel')
// const UserService = require('./UserService');
// // const { findById } = require('./apiKey.service');


// class CommentService {
//     constructor() {
//         this.repository = new commentRepository();
//     }

//     async createComment({ productId, userId, content, parentCommentId = null, rating }) {

//         const comment = new Comment({
//             comment_productId: productId,
//             comment_userId: userId,
//             comment_content: content,
//             comment_parentId: parentCommentId,
//             comment_rating: rating,
//         })

//         let rightValue
//         if (parentCommentId) {
//             // reply comment
//             const parentComment = await Comment.findOne({ _id: parentCommentId })
//             if (!parentComment) throw new errorResponse.NotFoundRequestError("parent comment not found")
//             rightValue = parentComment.comment_right
//             await Comment.updateMany(
//                 {
//                     comment_productId: new Types.ObjectId(productId),// convertToObjectIdMongodb not create
//                     comment_right: { $gte: rightValue }
//                 }, {
//                 $inc: { comment_right: 2 }
//             }
//             )
//             await Comment.updateMany(
//                 {
//                     comment_productId: new Types.ObjectId(productId),
//                     comment_left: { $gte: rightValue }
//                 }, {
//                 $inc: { comment_left: 2 }
//             }
//             )


//         } else {
//             const maxRightValue = await Comment.findOne({
//                 comment_productId: new Types.ObjectId(productId),
//             }, 'comment_right', { sort: { comment_right: -1 } })
//             if (maxRightValue) {
//                 rightValue = maxRightValue.right + 1
//             } else {
//                 rightValue = 1
//             }
//         }
//         // insert to comemnt
//         comment.comment_left = rightValue
//         comment.comment_right = rightValue + 1
//         await comment.save()

//         return comment
//     }

//     async getCommentByParentId({ productId, parentCommentId = null, limit = 50, offset = 0 }) {
//         if (parentCommentId) {
//             const parent = await Comment.findById(parentCommentId);
//             if (!parent) {
//                 throw new errorResponse.NotFoundRequestError("Parent comment not found");
//             }
//             const comments = await Comment.find({
//                 comment_productId: new Types.ObjectId(productId),
//                 comment_left: { $gt: parent.comment_left },
//                 comment_right: { $gt: parent.comment_right }
//             }).select({
//                 comment_left: 1,
//                 comment_right: 1,
//                 comment_content: 1,
//                 comment_rating: 1,
//                 parentCommentId: 1,
//                 comment_userId: 1,
//                 createdAt: 1
//             }).sort({
//                 comment_left: 1
//             });

//             // Add user details to comments
//             const populatedComments = await Promise.all(comments.map(async (comment) => {
//                 const user = await UserService.getUser({ user_id: comment.comment_userId });
//                 return {
//                     ...comment.toObject(),
//                     user: user // Add user details to each comment
//                 };
//             }));

//             return populatedComments;
//         }

//         // If parentCommentId is null, fetch top-level comments
//         const comments = await Comment.find({
//             comment_productId: new Types.ObjectId(productId),
//             comment_parentId: parentCommentId
//         }).select({
//             comment_left: 1,
//             comment_right: 1,
//             comment_content: 1,
//             comment_rating: 1,
//             comment_userId: 1,
//             parentCommentId: 1,
//             createdAt: 1
//         }).sort({
//             comment_left: 1
//         });

//         // Add user details to comments
//         const populatedComments = await Promise.all(comments.map(async (comment) => {
//             const user = await UserService.getUser({ user_id: comment.comment_userId });
//             return {
//                 ...comment.toObject(),
//                 user: user // Add user details to each comment
//             };
//         }));

//         return populatedComments;
//     }
//     async deleteComment({ commentId, productId }) {
//         // const foundProduct = await findProduct(productId)
//         // if(!foundProduct)throw new errorResponse.NotFoundRequestError("not found product")
//         const foundComment = await Comment.findOne({ _id: commentId }).lean()
//         if (!foundComment) throw new errorResponse.NotFoundRequestError("not found comment")
//         const leftValue = foundComment.comment_left
//         const rightValue = foundComment.comment_right
//         //with
//         const width = rightValue - leftValue + 1
//         //delete all child comment 

//         await Comment.deleteMany({
//             comment_productId: new Types.ObjectId(productId),
//             comment_left: { $gte: leftValue, $lte: rightValue }
//         })

//         //update
//         await Comment.updateMany({
//             comment_productId: new Types.ObjectId(productId),
//             comment_right: { $gt: rightValue }

//         }, {
//             $inc: {
//                 comment_right: -width
//             }
//         })
//         return true

//     }


// }

// module.exports = new CommentService()
const { Types } = require('mongoose');
const { errorResponse } = require('../core/error.response');
const commentRepository = require('../models/repositories/comment.repo');
const Comment = require('../models/CommentModel')
// const { findById } = require('./apiKey.service');


class CommentService {
    constructor() {
        this.repository = new commentRepository();
    }

    async createComment({ productId, userId, content, rating }) {
        const comment = new Comment({
            comment_productId: productId,
            comment_userId: userId,
            comment_content: content,
            comment_rating: rating,
        });

        try {
            await comment.save();
            return comment;
        } catch (error) {
            console.error("Error creating comment:", error);
            throw error;
        }
    }

    async getCommentsByProductId({ productId, limit = 50, offset = 0 }) {
        const comments = await Comment.find({
            comment_productId: new Types.ObjectId(productId),
        })
        .select({
            comment_content: 1,
            comment_rating: 1,
            comment_userId: 1,
            createdAt: 1
        })
        .populate({
            path: 'comment_userId',
            select: 'user_name user_avatar', // Chọn các trường của user cần lấy
        })
        .sort({
            createdAt: -1
        })
        .skip(offset)
        .limit(limit);
    
        return comments;
    }
    
    async deleteComment({ commentId, productId }) {
        // const foundProduct = await findProduct(productId)
        // if(!foundProduct)throw new errorResponse.NotFoundRequestError("not found product")
        const foundComment = await Comment.findOne({ _id: commentId }).lean()
        if (!foundComment) throw new errorResponse.NotFoundRequestError("not found comment")
        const leftValue = foundComment.comment_left
        const rightValue = foundComment.comment_right
        //with
        const width = rightValue - leftValue + 1
        //delete all child comment 

        await Comment.deleteMany({
            comment_productId: new Types.ObjectId(productId),
            comment_left: { $gte: leftValue, $lte: rightValue }
        })

        //update
        await Comment.updateMany({
            comment_productId: new Types.ObjectId(productId),
            comment_right: { $gt: rightValue }

        }, {
            $inc: {
                comment_right: -width
            }
        })
        return true

    }


}
module.exports = new CommentService()
