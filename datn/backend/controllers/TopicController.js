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

    updateTopic = async (req, res, next) => {
        new SuccessResponse({
            message: 'updateTopic success',
            metaData: await TopicService.updateTopic(req.body)
        }).send(res)
        console.log("updateTopic")
    }
    getDeleteTopicList = async (req, res, next) => {
        new SuccessResponse({
            message: 'get Delete Topic List success',
            metaData: await TopicService.getDeleteTopicList({ ...req.body })
        }).send(res)
    }
    deleteTopicById = async (req, res, next) => {
        new SuccessResponse({
            message: 'delete Topic By Id success', //xoa tam
            metaData: await TopicService.deleteTopicById({ ...req.body })
        }).send(res)
    }
    restoreTopicById = async (req, res, next) => {
        new SuccessResponse({
            message: 'restore brand success',
            metaData: await TopicService.restoreTopicById(req.body)
        }).send(res)
    }
    pulishTopic = async (req, res, next) => {
        new SuccessResponse({
            message: 'publish brand success',
            metaData: await TopicService.pulishTopic(req.body)
        }).send(res)
    }
    unpulishTopic = async (req, res, next) => {
        new SuccessResponse({
            message: 'unpulishTopic success',
            metaData: await TopicService.unpulishTopic(req.body)
        }).send(res)
    }
    findTopicById = async (req, res, next) => {
        new SuccessResponse({
            message: 'find Topic ById success',
            metaData: await TopicService.findTopicById(req.body)
        }).send(res)
    }
    removeTopic = async (req, res, next) => {
        new SuccessResponse({
            message: 'remove Topic success',
            metaData: await TopicService.removeTopic(req.body)
        }).send(res)
    }

}
module.exports = new TopicController;