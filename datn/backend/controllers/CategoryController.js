'use strict'

const { SuccessResponse } = require("../core/success.response")
const CategoryService = require("../services/CategoryService")

class CategoryController {
    createCategory = async (req, res, next) => {
        new SuccessResponse({
            message: 'success',
            metaData: await CategoryService.createCategory({ ...req.body })
        }).send(res)
    }
    getListCategoryByParentId = async (req, res, next) => {
        new SuccessResponse({
            message: 'success',
            metaData: await CategoryService.getListCategoryByParentId(req.body)
        }).send(res)
    }
    findAllCategory = async (req, res, next) => {
        new SuccessResponse({
            message: 'findAllCategory success',
            metaData: await CategoryService.findAllCategory(req.body)
        }).send(res)
    }
}
module.exports = new CategoryController;