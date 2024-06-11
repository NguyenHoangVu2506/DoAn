'use strict'
const GalleryService = require('../services/GalleryService')

const { SuccessResponse } = require('../core/success.response')

class GalleryController{
    addImage=async(req, res, next)=>{
        new SuccessResponse({
            message: 'success',
            metaData: await GalleryService.addImage({...req.body})
        }).send(res)

    }
    getImageBySpuId=async(req, res, next)=>{
        new SuccessResponse({
            message: 'success',
            metaData: await GalleryService.getImageBySpuId(req.body)
        }).send(res)

    }
}
module.exports = new GalleryController;