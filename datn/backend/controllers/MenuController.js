'use strict'
const { SuccessResponse } = require("../core/success.response")
const MenuService = require("../services/MenuService")

class MenuController {
    createMenu = async (req, res, next) => {
        new SuccessResponse({
            message: ' create success',
            metaData: await MenuService.createMenu({ ...req.body })
        }).send(res)
    }
    getListMenu = async (req, res, next) => {
        new SuccessResponse({
            message: 'get list Menu success',
            metaData: await MenuService.getListMenu({ ...req.body })
        }).send(res)
    }

    getMenu = async (req, res, next) => {
        new SuccessResponse({
            message: 'get Menu success',
            metaData: await MenuService.getMenuById(req.body)
        }).send(res)
    }
    
    updateMenu = async (req, res, next) => {
        new SuccessResponse({
            message: 'update success',
            metaData: await MenuService.updateMenu(req.body)
        }).send(res)
        console.log("updateMenu")
    }
    getDeleteMenuList = async (req, res, next) => {
        new SuccessResponse({
            message: 'get delete list Menu success',
            metaData: await MenuService.getDeleteMenuList({ ...req.body })
        }).send(res)
    }
    deleteMenuById = async (req, res, next) => {
        new SuccessResponse({
            message: 'delete Menu success', //xoa tam
            metaData: await MenuService.deleteMenuById({ ...req.body })
        }).send(res)
    }
    restoreMenuById = async (req, res, next) => {
        new SuccessResponse({
            message: 'restore Menu success',
            metaData: await MenuService.restoreMenuById(req.body)
        }).send(res)
    }
    publishMenu = async (req, res, next) => {
        new SuccessResponse({
            message: 'publish Menu success',
            metaData: await MenuService.pulishMenu(req.body)
        }).send(res)
    }
    unpublishMenu = async (req, res, next) => {
        new SuccessResponse({
            message: 'unpublish Menu success',
            metaData: await MenuService.unpulishMenu(req.body)
        }).send(res)
    }
  
    removeMenu = async (req, res, next) => {
        new SuccessResponse({
            message: 'remove Menu success',
            metaData: await MenuService.removeMenu(req.body)
        }).send(res)
    }
}
module.exports = new MenuController;