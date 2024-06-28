
"use strict";
const { SuccessResponse } = require('../core/success.response');
const  WishlistService  = require('../services/WishlistService');
class WishlistController {
    constructor() {
        this.service = new WishlistService()
    }

    addToWishList = async (req, res, next) => {
        return new SuccessResponse({
            message: "add new wish list success",
            metaData: await this.service.addToWishList(req.body)
        }).send(res)
    }
    getUserWishList = async (req, res, next) => {
        return new SuccessResponse({
            message: "get wish list success",
            metaData: await this.service.getUserWishList(req.body)
        }).send(res)
    }
    deleteToWishListByUserId = async (req, res, next) => {
        return new SuccessResponse({
            message: "delete wish list success",
            metaData: await this.service.deleteToWishListByUserId(req.body)
        }).send(res)
    }
    deleteToWishListItem = async (req, res, next) => {
        return new SuccessResponse({
            message: "delete to wish list item success",
            metaData: await this.service.deleteToWishListItem(req.body)
        }).send(res)
    }
}

module.exports = new WishlistController()