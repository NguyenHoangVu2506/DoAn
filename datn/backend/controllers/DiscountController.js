'use strict'

const DiscountService = require('../services/DiscountService')
const { SuccessResponse } = require('../core/success.response')

class DiscountController{
    createDiscountCode=async(req, res, next)=>{
        new SuccessResponse({
            message: 'success',
            metaData: await DiscountService.createDiscountCode({...req.body})
        }).send(res)

    }
    getAllDiscountCode = async(req, res, next)=>{
        new SuccessResponse({
            message: 'success',
            metaData: await DiscountService.getAllDiscountCodeByShop({...req.query})
        }).send(res)

    }

    getAllDiscountAmount = async(req, res, next)=>{
        new SuccessResponse({
            message: 'success',
            metaData: await DiscountService.getDiscountAmount({...req.body})
        }).send(res)

    }

    getAllDiscountCodeWithProduct = async(req, res, next)=>{
        new SuccessResponse({
            message: 'success',
            metaData: await DiscountService.getAllDiscountCodeWithProduct({...req.query})
        }).send(res)

    }

}
module.exports = new DiscountController;
