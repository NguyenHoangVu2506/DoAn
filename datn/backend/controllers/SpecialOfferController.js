'use strict'
const SpecialOfferService = require('../services/SpecialOfferService')

const { SuccessResponse } = require('../core/success.response')

class SpecialOfferController{
    createSpecialOffer=async(req, res, next)=>{
        new SuccessResponse({
            message: 'success',
            metaData: await SpecialOfferService.createSpecialOffer({...req.body})
        }).send(res)

    }
    getSpecialOfferBySpuId=async(req, res, next)=>{
        new SuccessResponse({
            message: 'success',
            metaData: await SpecialOfferService.getSpecialOfferBySpuId(req.body)
        }).send(res)

    }
}
module.exports = new SpecialOfferController;
