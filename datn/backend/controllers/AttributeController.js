'use strict'
const { SuccessResponse } = require("../core/success.response")
const AttributeService = require("../services/AttributeService")

class AttributeController{
    createAttribute=async(req,res, next)=>{
        new SuccessResponse({
            message:'success',
            metaData: await AttributeService.newAttribute({...req.body})
        }).send(res)
    }

    getAttribute =async(req, res, next)=>{
        new SuccessResponse({
            message:'get attribute  success',
            metaData: await AttributeService.findAttribute(req.body)
            
        }).send(res)
    }

    getAllAttribute =async(req, res, next)=>{
        new SuccessResponse({
            message:'findAllAttribute success',
            metaData: await AttributeService.findAllAttribute(req.body)
            
        }).send(res)
    }
}
module.exports = new AttributeController;