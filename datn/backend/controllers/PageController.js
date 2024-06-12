'use strict'
const { SuccessResponse } = require("../core/success.response")
const PageService = require("../services/PageService")

class PageController {
    createPage = async (req, res, next) => {
        new SuccessResponse({
            message: ' create Page success',
            metaData: await PageService.createPage({ ...req.body })
        }).send(res)
    }
    getListPage = async (req, res, next) => {
        new SuccessResponse({
            message: 'get list Page success',
            metaData: await PageService.getListPage({ ...req.body })
        }).send(res)
    }

    updatePage = async (req, res, next) => {
        new SuccessResponse({
            message: 'updatePage success',
            metaData: await PageService.updatePage(req.body)
        }).send(res)
        console.log("update Page")
    }
    getDeletePageList = async (req, res, next) => {
        new SuccessResponse({
            message: 'get delete list Page success',
            metaData: await PageService.getDeletePageList({ ...req.body })
        }).send(res)
    }
    deletePageById = async (req, res, next) => {
        new SuccessResponse({
            message: 'delete Page success', //xoa tam
            metaData: await PageService.deletePageById({ ...req.body })
        }).send(res)
    }
    restorePageById = async (req, res, next) => {
        new SuccessResponse({
            message: 'restore Page success',
            metaData: await PageService.restorePageById(req.body)
        }).send(res)
    }
    publishPage = async (req, res, next) => {
        new SuccessResponse({
            message: 'publish Page success',
            metaData: await PageService.pulishPage(req.body)
        }).send(res)
    }
    unpublishPage = async (req, res, next) => {
        new SuccessResponse({
            message: 'un publish Page success',
            metaData: await PageService.unpulishPage(req.body)
        }).send(res)
    }
    getPage = async (req, res, next) => {
        new SuccessResponse({
            message: 'get Page success',
            metaData: await PageService.getPageById(req.body)
        }).send(res)
    }
    removePage = async (req, res, next) => {
        new SuccessResponse({
            message: 'remove Page success',
            metaData: await PageService.removePage(req.body)
        }).send(res)
    }
}
module.exports = new PageController;