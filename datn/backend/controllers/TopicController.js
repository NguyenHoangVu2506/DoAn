'use strict'
const { SuccessResponse } = require("../core/success.response")
const TopicService = require("../services/TopicService")
class TopicController{
    createTopic=async(req,res, next)=>{
        new SuccessResponse({
            message:'success',
            metaData: await TopicService.createTopic({...req.body})
        }).send(res)
    }
    getListTopic=async(req,res, next)=>{
        new SuccessResponse({
            message:'success',
            metaData: await TopicService.getListTopic({...req.body})
        }).send(res)
    }
    getListTopicByParentId=async(req,res, next)=>{
        new SuccessResponse({
            message:'success',
            metaData: await TopicService.getListTopicByParentId({...req.body})
        }).send(res)
    }
}
module.exports = new TopicController;