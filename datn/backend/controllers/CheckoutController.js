"use strict";
const CheckoutService = require('../services/CheckoutService');
const { SuccessResponse } = require('../core/success.response')

class CheckoutController {
    checkout = async(req, res, next) => {
        return new SuccessResponse({
            message: "created new cart success",
            metaData: await CheckoutService.checkoutReview(req.body)
        }).send(res)


    }

    orderByUser = async(req, res, next) => {
        return new SuccessResponse({
            message: "order success",
            metaData: await CheckoutService.orderByUser(req.body)
        }).send(res)


    }
    
    orderById = async(req, res, next) => {
        return new SuccessResponse({
            message: "order success",
            metaData: await CheckoutService.findOrderById(req.body)
        }).send(res)


    }
    findOrderByUser = async(req, res, next) => {
        return new SuccessResponse({
            message: "findOrderByUser success",
            metaData: await CheckoutService.findOrderByUser(req.body)
        }).send(res)
    }
    findAllOrder = async(req, res, next) => {
        return new SuccessResponse({
            message: "findAllOrder success",
            metaData: await CheckoutService.findAllOrder()
        }).send(res)
    }
    updateOrderStatusByOrder = async(req, res, next) => {
        return new SuccessResponse({
            message: "update status order success",
            metaData: await CheckoutService.updateOrderStatusByOrder(req.body)
        }).send(res)


    }

}

module.exports = new CheckoutController()