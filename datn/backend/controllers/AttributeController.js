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
        const{attribute_id}=req.query;

        new SuccessResponse({
            message:'success',
            metaData: await AttributeService.findAttribute({ attribute_id})//sai ngoac ha
            
        }).send(res)
    }
}
module.exports = new AttributeController;