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

    updateSlider = async (req, res, next) => {
        new SuccessResponse({
            message: 'updateSlider success',
            metaData: await SliderService.updateSlider(req.body)
        }).send(res)
        console.log("updateSlider")
    }
    getDeleteSliderList = async (req, res, next) => {
        new SuccessResponse({
            message: 'get Delete Slider List success',
            metaData: await SliderService.getDeleteSliderList({ ...req.body })
        }).send(res)
    }
    deleteSliderById = async (req, res, next) => {
        new SuccessResponse({
            message: 'delete Slider By Id success', //xoa tam
            metaData: await SliderService.deleteSliderById({ ...req.body })
        }).send(res)
    }
    restoreSliderById = async (req, res, next) => {
        new SuccessResponse({
            message: 'restore Slider By Id success',
            metaData: await SliderService.restoreSliderById(req.body)
        }).send(res)
    }
    pulishSlider = async (req, res, next) => {
        new SuccessResponse({
            message: 'publish brand success',
            metaData: await SliderService.pulishSlider(req.body)
        }).send(res)
    }
    unpulishSlider = async (req, res, next) => {
        new SuccessResponse({
            message: 'un pulish Slider  success',
            metaData: await SliderService.unpulishSlider(req.body)
        }).send(res)
    }
    getSliderById = async (req, res, next) => {
        new SuccessResponse({
            message: 'get Slider By Id success',
            metaData: await SliderService.getSliderById(req.body)
        }).send(res)
    }
    removeSlider = async (req, res, next) => {
        new SuccessResponse({
            message: 'remove Slider success',
            metaData: await SliderService.removeSlider(req.body)
        }).send(res)
    }

}
module.exports = new SliderController;