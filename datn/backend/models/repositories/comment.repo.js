"use strict";

const { CommentModel } = require('../CommentModel');

class CommentRepository {
    async findById(id) {
        return await CommentModel.findById({ id }).lean()
    }
}

module.exports = CommentRepository;