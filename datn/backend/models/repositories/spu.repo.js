'use strict'

const { Types } = require('mongoose')
const { spu } = require('../SpuModel')
const { getSelectData, unGetSelectData, convertToObjectMongoDb } = require('../../utils/index')
const { category } = require('../CategoryModel')
const CategoryModel = require('../CategoryModel')

const getProductById = async (productId) => {
    return await spu.findOne({ _id: convertToObjectMongoDb(productId) }).lean()

}
const publishProduct = async ({ product_id }) => {

    const foundProduct = await spu.findOne({
        _id: new Types.ObjectId(product_id)
    })
    if (!foundProduct) return null
    foundProduct.isDraft = false
    foundProduct.isPublished = true

    console.log(foundProduct)

    const { modifiedCount } = await foundProduct.updateOne(foundProduct)
    //tra ve 0 neu 0ud, 1 ud thanh cong
    return modifiedCount
}

const unPublishProduct = async ({ product_id }) => {
    const foundProduct = await spu.findOne({
        _id: new Types.ObjectId(product_id)
    })
    if (!foundProduct) return null
    foundProduct.isDraft = true
    foundProduct.isPublished = false

    console.log(foundProduct)

    const { modifiedCount } = await foundProduct.updateOne(foundProduct)
    //tra ve 0 neu 0ud, 1 ud thanh cong
    return modifiedCount

}
const isFindProductsByAttributes = async ({ limit, sort, page, filter, select }) => {
    const { isPublished, product_attributes } = filter
    let arrAtr_Value = []
    const arrAtt = product_attributes.map((item) => {
        return item.attribute_id
    })
    product_attributes.map((attr) => {
        attr.attribute_value.map((value) => {
            arrAtr_Value.push(value.value_id)
        })
    })
    console.log('arrAtt', arrAtt)
    console.log('arrAtr_Value', arrAtr_Value)
    const skip = (page - 1) * limit;
    const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
    const products = await spu.find({
        isPublished, "product_attributes.attribute_id": {
            $all: arrAtt
        }, "product_attributes.attribute_value.value_id": {
            $all: arrAtr_Value
        }
    })
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .select(getSelectData(select))
        .lean()
    return products
}

const findAllProducts = async ({ limit, sort, page, filter, select }) => {
    const skip = (page - 1) * limit;
    const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
    const products = await spu.find(filter)
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .select(getSelectData(select))
        .lean()
    return products
}

const findProductByFilter = async ({ limit, sort, page, filter, select }) => {
    const { isPublished, product_attributes, product_brand, product_category } = filter
    let arrAtr_Value = []
    const arrAtt = product_attributes.map((item) => {
        return item.attribute_id
    })
    product_attributes.map((attr) => {
        attr.attribute_value.map((value) => {
            arrAtr_Value.push(value.value_id)
        })
    })


    console.log('arrAtt', arrAtt)
    console.log('arrAtr_Value', arrAtr_Value)
    const skip = (page - 1) * limit;
    const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
    const products = await spu.find({
        isPublished, "product_attributes.attribute_id": {
            $all: arrAtt
        }, "product_attributes.attribute_value.value_id": {
            $all: arrAtr_Value
        }, "product_brand": {
            $all: product_brand
        }, "product_category": {
            $in: [product_category]
        }, "_id": {

        }
    })
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .select(getSelectData(select))
        .lean()
    return products
}


const findProduct = async ({ product_id, unSelect }) => {
    return await spu.findById(product_id).select(unGetSelectData(unSelect))
}

const isProductByCategory = async ({ limit, sort, page,  isPublished, product_category }) => {
    const skip = (page - 1) * limit;
    const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
    const products = await spu.find({
        isPublished, product_category: {
            $all: [product_category]
        }
    }).sort(sortBy)
        .skip(skip)
        .limit(limit)
        .lean()
    return products

}
// const queryProduct = async ({ query, limit, skip }) => {
//     return await product.find(query).
//         sort({ updateAt: -1 })
//         .skip(skip)
//         .limit(limit)
//         .lean()
//         .exec()
// }

const checkProductByServer = async (products) => {
    return await Promise.all(products.map(async product => {

        const foundProduct = await getProductById(product.productId)
        console.log(foundProduct)
        if (foundProduct) {
            return {
                price: foundProduct.product_price,
                quantity: product.quantity,
                productId: product.productId
            }
        }
    }))
}

const findProductsByCategory = async ({ limit, sort, page, filter }) => {
    const { category_id, isPublished } = filter
    const skip = (page - 1) * limit;
    const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
    if (!category_id) {
        const products = await spu.find({
            isPublished
        })
            .sort(sortBy)
            .lean()
        return products
    }
    const products_category = await spu.find({
        isPublished,
        product_category: {
            $in: [category_id]
        }
    }).sort(sortBy)
        .skip(skip)
        .limit(limit)
        .lean()
    return products_category
}

module.exports = {
    getProductById,
    findAllProducts,
    // findAllDraft,
    // findAllPublish,
    publishProduct,
    unPublishProduct,
    // searchProduct,
    isFindProductsByAttributes,
    findProduct,
    // updateProductById,
    getProductById,
    isProductByCategory,
    checkProductByServer,
    findProductByFilter,
    findProductsByCategory
}
