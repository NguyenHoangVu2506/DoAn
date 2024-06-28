'use strict'
const ATTRIBUTESVALUE_MODEL = require('../models/AttributeValueModel')
const ATTRIBUTES_MODEL = require('../models/AttributesModel')

const newAttributeValue = async ({
    attribute_id, attribute_value_list
}) => {
    try {
        const convert_attribute_value_list = attribute_value_list.map(attribute => {
            // console.log(`attribute_value_list`)
            return { ...attribute, attribute_id: attribute_id }

        })
        console.log(convert_attribute_value_list)

        const attributeValues = await ATTRIBUTESVALUE_MODEL.attributeValue.create(convert_attribute_value_list)
        console.log(attributeValues)
        return attributeValues

    } catch (error) {
        return []
    }
}
const allAttributeValue = async ({ attribute_id }) => { //Byattribute_id
    try {
        const attributeValues = await ATTRIBUTESVALUE_MODEL.attributeValue.find({ attribute_id }).lean()
        console.log(attributeValues)
        return attributeValues

    } catch (error) {
        return null
    }
}
module.exports = { newAttributeValue, allAttributeValue }