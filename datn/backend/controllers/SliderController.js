'use strict'
const { SuccessResponse } = require("../core/success.response")
const SliderService = require("../services/SliderService")

class SliderController{
    createSlider=async(req,res, next)=>{
        new SuccessResponse({
            message:'success',
            metaData: await SliderService.createSlider({...req.body})
        }).send(res)
    }

    getListSlider=async(req,res, next)=>{
        new SuccessResponse({
            message:'success',
            metaData: await SliderService.getListSlider({...req.body})
        }).send(res)
    }
}
module.exports = new SliderController;