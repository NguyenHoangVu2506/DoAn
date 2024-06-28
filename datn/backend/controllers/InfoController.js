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
            metaData: await InfoService.getInfo(req.body)
        }).send(res)
    }
    getInfoByName=async(req,res, next)=>{
        new SuccessResponse({
            message:'getInfoByName success',
            metaData: await InfoService.getInfoByName(req.body)
        }).send(res)
    }
    
    updateInfo = async (req, res, next) => {
        new SuccessResponse({
            message: 'update Info success',
            metaData: await InfoService.updateInfo(req.body)
        }).send(res)
        console.log("update Info")
    }
    getDeleteInfoList = async (req, res, next) => {
        new SuccessResponse({
            message: 'get Delete Info List success',
            metaData: await InfoService.getDeleteInfoList({ ...req.body })
        }).send(res)
    }
    deleteInfoById = async (req, res, next) => {
        new SuccessResponse({
            message: 'delete Info By Id success', //xoa tam
            metaData: await InfoService.deleteInfoById({ ...req.body })
        }).send(res)
    }
    restoreInfoById = async (req, res, next) => {
        new SuccessResponse({
            message: 'restore Info By Id success',
            metaData: await InfoService.restoreInfoById(req.body)
        }).send(res)
    }
    pulishInfo = async (req, res, next) => {
        new SuccessResponse({
            message: 'pulish Info success',
            metaData: await InfoService.pulishInfo(req.body)
        }).send(res)
    }
    unpulishInfo = async (req, res, next) => {
        new SuccessResponse({
            message: 'uunpulishInfo success',
            metaData: await InfoService.unpulishInfo(req.body)
        }).send(res)
    }
    removeInfo = async (req, res, next) => {
        new SuccessResponse({
            message: 'remove Info success',
            metaData: await InfoService.removeInfo(req.body)
        }).send(res)
    }


}
module.exports = new InfoController;