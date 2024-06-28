'use strict'

const { Types } = require('mongoose')
const { product, skincare, bodycare, haircare } = require('../ProductModel')
const { getSelectData, unGetSelectData, convertToObjectMongoDb } = require('../../utils/index')


const findAllDraft = async ({ query, limit, skip }) => {
    return await queryProduct({ query, limit, skip })
}

const findAllPublish = async ({ query, limit, skip }) => {
    return await queryProduct({ query, limit, skip })
}

const searchProduct = async ({ keySearch }) => {
    const regexSearch = new RegExp(keySearch)
    const result = await product.find({
        isPublished: true,
        $text: { $search: regexSearch }
    },
        { score: { $meta: 'textScore' } })
        .sort({ score: { $meta: 'textScore' } })
        .lean()
    return result;
}


const publishProduct = async ({ product_id }) => {

    const foundProduct = await product.findOne({
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
    const foundProduct = await product.findOne({
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
const findAllProducts = async ({ limit, sort, page, filter, select }) => {
    const skip = (page - 1) * limit;
    const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
    const products = await product.find(filter)
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .select(getSelectData(select))
        .lean()
    return products
}

const findProduct = async ({ product_id, unSelect }) => {
    return await product.findById(product_id).select(unGetSelectData(unSelect))
}

const updateProductById = async ({
    productId,
    bodyUpdate,
    model,
    isNew = true
}) => {
    console.log('2', productId,
        bodyUpdate,
        model)

    // if (model === skincare) {
    //     console.log("3",bodyUpdate.product_attributes)
    //     return await model.findByIdAndUpdate(productId, bodyUpdate.product_attributes, {
    //         new: true
    //     })
    // }
    return await model.findByIdAndUpdate(productId, bodyUpdate, {
        new: true
    })

}

const getProductById =async(productId)=>{
    return await product.findOne({_id: convertToObjectMongoDb(productId)}).lean()

}

const checkProductByServer = async(products)=>{
    return await Promise.all(products.map(async product=>{
        const foundProduct =await getProductById(product.productId)
        console.log(foundProduct)

        if(foundProduct){
            return {
                price :foundProduct.product_price,
                quantity: product.quantity,
                productId: product.productId
            }
        }
    }))
}


//dung chung
const queryProduct = async ({ query, limit, skip }) => {
    return await product.find(query).
        sort({ updateAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec()
}
module.exports = {
    findAllDraft,
    findAllPublish,
    publishProduct,
    unPublishProduct,
    searchProduct,
    findAllProducts,
    findProduct,
    updateProductById,
    getProductById,
    checkProductByServer

}
