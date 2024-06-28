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

    updateCategory = async (req, res, next) => {
        new SuccessResponse({
            message: 'updateCategory success',
            metaData: await CategoryService.updateCategory(req.body)
        }).send(res)
        console.log("updateCategory")
    }
    getDeleteCategoryList = async (req, res, next) => {
        new SuccessResponse({
            message: 'get delete list category success',
            metaData: await CategoryService.getDeleteCategoryList({ ...req.body })
        }).send(res)
    }
    deleteCategory = async (req, res, next) => {
        new SuccessResponse({
            message: 'deleteCategory success', //xoa tam
            metaData: await CategoryService.deleteCategory({ ...req.body })
        }).send(res)
    }
    restoreCategory = async (req, res, next) => {
        new SuccessResponse({
            message: 'restore brand success',
            metaData: await CategoryService.restoreCategory(req.body)
        }).send(res)
    }
    publishCategory = async (req, res, next) => {
        new SuccessResponse({
            message: 'pulishCategory success',
            metaData: await CategoryService.pulishCategory(req.body)
        }).send(res)
    }
    unpublishCategory = async (req, res, next) => {
        new SuccessResponse({
            message: 'unpulishCategory success',
            metaData: await CategoryService.unpulishCategory(req.body)
        }).send(res)
    }
    getCategoryById = async (req, res, next) => {
        new SuccessResponse({
            message: 'getCategoryById success',
            metaData: await CategoryService.getCategoryById(req.body)
        }).send(res)
    }
    removeCategory = async (req, res, next) => {
        new SuccessResponse({
            message: 'removeCategory success',
            metaData: await CategoryService.removeCategory(req.body)
        }).send(res)
    }

}
module.exports = new CategoryController;