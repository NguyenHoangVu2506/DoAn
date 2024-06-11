'use strict'
const { SuccessResponse } = require("../core/success.response");
const { newAttributeValue } = require("../services/AttributeValueService");

class AttributeValueController{
    // createAttributeValue=async(req,res, next)=>{
    //     new SuccessResponse({
    //         message:'success',
    //         metadata: await newAttributeValue({...req.body})
    //     }).send(res)
    // }
}
module.exports = new AttributeValueController;