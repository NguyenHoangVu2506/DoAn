'use strict'
const { attributeValue } = require('../models/AttributeValueModel')
const ATTRIBUTES_MODEL = require('../models/AttributesModel')
const { newAttributeValue, allAttributeValue } = require('./AttributeValueService')
const _ = require('lodash')

const newAttribute = async ({
    attribute_name, attribute_value_list = []
}) => {
    try {
        const attributes = await ATTRIBUTES_MODEL.attribute.create({
            attribute_name
        })
        console.log(attributes)

        if (attributes && attribute_value_list.length) {
            //3 cteate sku
            newAttributeValue({ attribute_id: attributes._id, attribute_value_list })
                .then()

        }
        return attributes
    } catch (error) {
        console.log(`error`)
    }
}
const findAttribute = async ({
    attribute_id
}) => {
    try {
        const attribute = await ATTRIBUTES_MODEL.attribute.findOne({ _id: attribute_id })
        console.log(attribute)

        if (!attribute) throw new NotFoundRequestError('attribute not found')

        const attribute_value = await allAttributeValue({ attribute_id: attribute._id })
        console.log(attribute_value)

        return {
            attribute_info: _.omit(attribute, ['__v', 'updateAt']),
            attribute_value_list: attribute_value.map(attributeValue => _.omit(attributeValue, ['__v', 'updateAt', 'createAt',]))
        }


    } catch (error) {

    }
}

const findAttributeByIdList = async ({
    attribute_id_list, attribute_value_id_list
}) => {
    try {
        let product_attributes = []
        for (let i = 0; i < attribute_id_list.length; i++) {
            const attribute = await ATTRIBUTES_MODEL.attribute.findOne({ _id: attribute_id_list[i] })
            if (!attribute) throw new NotFoundRequestError('attribute not found')
            const attributes_value = await allAttributeValue({ attribute_id: attribute_id_list[i] })

            const attributes_value_list = await attributes_value.filter(({ _id }) => attribute_value_id_list.some(({ value_id }) => value_id == _id))
            if (!attributes_value_list) throw new NotFoundRequestError('attribute_value not found')
            product_attributes.push({ attribute, attributes_value_list })
        }
        return product_attributes
    } catch (error) {
        return null
    }
}

const findAttributesByProductAttributes = async ({
    product_attributes
}) => {
    try {
        const attribute_id_list = await product_attributes.flatMap((attribute) => attribute.attribute_id)
        const attribute_value_id_list = await product_attributes.flatMap((attribute) => attribute.attribute_value)

        console.log('attribute_id_list', attribute_id_list)
        console.log('attribute_value_id_list', attribute_value_id_list)
        const product_attribute = await this.findAttributeByIdList({ attribute_id_list, attribute_value_id_list })
        console.log("product_attributes", product_attribute)

        return product_attribute
    }
    catch (error) {
        return null
    }
}

module.exports = { newAttribute, findAttribute, findAttributeByIdList, findAttributesByProductAttributes }