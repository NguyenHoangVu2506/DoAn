'use strict'
const { SuccessResponse } = require("../core/success.response")
const InfoService = require("../services/InfoService")

class InfoController{
    createInfo=async(req,res, next)=>{
        new SuccessResponse({
            message:'success',
            metaData: await InfoService.createInfo({...req.body})
        }).send(res)
    }

    getInfo=async(req,res, next)=>{
        new SuccessResponse({
            message:'success',
            metaData: await InfoService.getInfoById(req.body)
        }).send(res)
    }
}
module.exports = new InfoController;