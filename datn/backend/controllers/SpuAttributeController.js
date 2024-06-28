'use strict'
const { SuccessResponse } = require("../core/success.response")
const SpuAttribute = require("../services/Spu_AttributeService")

class AttributeController{
    createSpuAttribute=async(req,res, next)=>{
        new SuccessResponse({
            message:'success',
            metaData: await SpuAttribute.newSpuAttribute({...req.body})
        }).send(res)
    }
}
module.exports = new AttributeController;