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
    
}

module.exports = new CheckoutController()