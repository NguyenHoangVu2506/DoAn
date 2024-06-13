"use strict";
const CartService = require('../services/CartService');
const { SuccessResponse } = require('../core/success.response')

class CartController {

    addToCart = async (req, res, next) => {

        return new SuccessResponse({
            message: "created new cart success",
            metaData: await CartService.addToCart(req.body)
        }).send(res)
    }

    updateToCart = async (req, res, next) => {

        return new SuccessResponse({
            message: "Updated cart success",
            metaData: await CartService.addToCartV2(req.body)
        }).send(res)
    }

    deleteCartItem = async (req, res, next) => {

        return new SuccessResponse({
            message: "deleted cart success",
            metaData: await CartService.deleteCartItem(req.body)
        }).send(res)
    }

    
    deleteToCartByCartIdAndUserId = async (req, res, next) => {

        return new SuccessResponse({
            message: "deleted cart success",
            metaData: await CartService.deleteToCartByCartIdAndUserId(req.body)
        }).send(res)
    }

    listToCart = async (req, res, next) => {
        return new SuccessResponse({
            message: "get list cart success",
            metaData: await CartService.getListUserCart(req.body)
        }).send(res)
    }

    findUserCart = async (req, res, next) => {
        return new SuccessResponse({
            message: "find User Cart success",
            metaData: await CartService.findUserCart(req.body)
        }).send(res)
    }

    updateSkuFromCart = async (req, res, next) => {
        return new SuccessResponse({
            message: "update Sku From Cart success",
            metaData: await CartService.updateSkuFromCart(req.body)
        }).send(res)
    }

    updateQuantityFromCart = async (req, res, next) => {
        return new SuccessResponse({
            message: "update Quantity FromCart success",
            metaData: await CartService.updateQuantityFromCart(req.body)
        }).send(res)
    }

    updateSkuFromCartV2 = async (req, res, next) => {
        return new SuccessResponse({
            message: "updateSkuFromCartV2 success",
            metaData: await CartService.updateSkuFromCartV2(req.body)
        }).send(res)
    }





}

module.exports = new CartController()