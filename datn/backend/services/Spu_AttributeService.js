'use strict'
const SPUATTRIBUTES_MODEL = require('../models/Spu_AttributesModel')

const newSpuAttribute = async ({
    attribute_id, product_id
}) => {
    try {
        const spuAttributes = await SPUATTRIBUTES_MODEL.spuAttribute.create({
            attribute_id, product_id
        })
        return spuAttributes

    } catch (error) {
        console.log(`error`)

    }
}
module.exports = { newSpuAttribute }