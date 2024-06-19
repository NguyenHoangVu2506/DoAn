'use strict'
const { NotFoundRequestError } = require('../core/error.response')
const SPU_MODEL = require('../models/SpuModel')
const { newSku, allSkuBySpuId, oneSku } = require('./SkuService')
const _ = require('lodash')
const { addImage, getImageBySpuId } = require('./GalleryService')
const spu_repo = require('../models/repositories/spu.repo')
const { Types } = require('mongoose')
const { getBrandById } = require('./BrandService')
const { findSpecialOfferBySpuId } = require('./SpecialOfferService')
const { findCategoryByIdList, getCategoryById } = require('./CategoryService')
const { findAttributesByProductAttributes } = require('./AttributeService')
const SpuModel = require('../models/SpuModel')

const newSpu = async ({
    product_name,
    product_thumb = [],
    product_short_description,
    product_detail,
    product_slug,
    product_price,
    product_category,
    product_brand,
    product_unit,
    product_quantity,
    product_attributes = [],
    product_variations = [],
    isDraft = true,
    isPublished = false,
    sku_list = []

}) => {
    try {
        //create new spu
        const spu = await SPU_MODEL.spu.create({
            product_name,
            product_thumb,
            product_short_description,
            product_slug,
            product_price,
            product_category,
            product_brand,
            product_unit,
            product_quantity,
            product_attributes,
            product_variations,
            product_detail,
            isDraft,
            isPublished
        })
        // get spu_id add to sku.service
        if (spu && sku_list.length) {
            const skus = await newSku({ spu_id: spu._id, sku_list })
            sku_list.map(sku => {
                skus.map(skuModel => {
                    if (skuModel.sku_tier_idx.toString() === sku.sku_tier_idx.toString()) {
                        addImage({ spu_id: spu._id, sku_id: skuModel._id, thumb_url: sku.thumb_url, public_id: sku.public_id })
                    }
                })
            })
        }
        return spu
    }
    catch (error) {
        console.log(`error`)
        return null
    }
}

const oneSpu = async ({ spu_id }) => {
    console.log(spu_id, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

    try {
        const spu = await SPU_MODEL.spu.findOne({
            _id: new Types.ObjectId(spu_id),
            isPublished: true// true
        })
        console.log(spu)

        if (!spu) throw new NotFoundRequestError('spu not found')
        const skus = await allSkuBySpuId({ product_id: spu._id })
        return {
            spu_info: _.omit(spu, ['__v', 'updateAt']),
            sku_list: skus.map(sku => _.omit(sku, ['__v', 'updateAt', 'createAt', 'isDeleted']))
        }
    } catch (error) {
        return null
    }
}
// const getProductDetails = async ({ spu_id }) => {
//     let spuDetail = {
//         spu: {},
//         product_brand: {},
//         productByCategory: []
//     }
//     spuDetail.spu = await oneSpu({ spu_id })
//     const brand_id = spuDetail.spu.spu_info.product_brand
//     const category_id = spuDetail.spu.spu_info.product_category[0]
//     spuDetail.product_brand = await getBrandById({ brand_id })
//     spuDetail.productByCategory = await isProductsByCategory({ filter: { product_category: category_id } })

//     return spuDetail
// }

const isPublishProduct = async ({ product_id }) => {
    console.log(product_id)
    return await spu_repo.publishProduct({ product_id })
}

const isUnPublishProduct = async ({ product_id }) => {
    console.log(product_id)
    return await spu_repo.unPublishProduct({ product_id })
}

const isFindProductsByAttributes = async ({ limit = 50, sort = 'ctime', page = 1, filter = { isPublished: true } }) => {
    return await spu_repo.isFindProductsByAttributes({
        limit, sort, page, filter,
        select: ['product_name', 'product_thumb', 'product_price', 'product_type']
    })
}

// const isFindProductByFilter = async ({ limit = 50, sort = 'ctime', page = 1,
//     filter = {
//         isPublished: true, product_attributes, product_category: '',
//         product_brand: [], product_price: { min_price: 0, max_price: 99999999 }
//     } }) => {
//     return await spu_repo.findProductByFilter({
//         limit, sort, page, filter,
//         select: ['product_name', 'product_thumb', 'product_price']
//     })
// }

const isFindProduct = async ({ product_id }) => {
    return await spu_repo.findProduct({ product_id, unSelect: ['__v', 'product_thumb', 'product_price'] })
}

const isfindAllProducts = async ({ limit = 50, sort = 'ctime', page = 1, filter = { isPublished: true } }) => {

    let product_list = await SPU_MODEL.spu.find().lean()
    if (product_list.length == 0) return null
    let brand_list = []
    let special_offer = []
    let sku_list = []
    //let
    let product_images = []
    let category_list = []
    //
    for (let index = 0; index < product_list.length; index++) {
        const brand = await getBrandById({ brand_id: product_list[index].product_brand })
        brand_list.push(brand)
        const category = await getCategoryById({ category_id: product_list[index].product_category })
        category_list.push(category)
        const skulist = await allSkuBySpuId({ product_id: product_list[index]._id })
        sku_list.push(skulist)
        console.log("id", product_list[index]._id)
        const specialoffer = await findSpecialOfferBySpuId({ spu_id: product_list[index]._id.toString(), special_offer_is_active: true })
        special_offer.push(specialoffer)
        const productImages = await getImageBySpuId({ spu_id: product_list[index]._id })
        product_images.push(productImages)
    }
    const allproduct = await product_list.map((product, index) => {
        return { ...product, brand: brand_list[index], category: category_list[index], special_offer: special_offer[index], sku_list: sku_list[index], product_images: product_images[index] }
    })

    return allproduct
}

const findProductsByCategory = async ({ limit = 50, sort = 'ctime', page = 1, filter = { isPublished: true, category_id: null } }) => {

    let product_list = {
        productsByCategory: [],
    }
    const productsByCategory = await spu_repo.findProductsByCategory({
        limit, sort, page, filter
    })
    if (productsByCategory.length == 0) return null
    let brand_list = []
    let special_offer = []
    let sku_list = []
    let product_images = []
    console.log("productsByCategory", productsByCategory)
    for (let index = 0; index < productsByCategory.length; index++) {
        const brand = await getBrandById({ brand_id: productsByCategory[index].product_brand })
        brand_list.push(brand)
        const skulist = await allSkuBySpuId({ product_id: productsByCategory[index]._id })
        sku_list.push(skulist)
        console.log("id", productsByCategory[index]._id)
        const specialoffer = await findSpecialOfferBySpuId({ spu_id: productsByCategory[index]._id.toString(), special_offer_is_active: true })
        special_offer.push(specialoffer)
        const productImages = await getImageBySpuId({ spu_id: productsByCategory[index]._id })
        product_images.push(productImages)
    }
    product_list.productsByCategory = await productsByCategory.map((product, index) => {
        return { ...product, brand: brand_list[index], special_offer: special_offer[index], sku_list: sku_list[index], product_images: product_images[index] }
    })

    return product_list.productsByCategory
}

const findProductDetail = async ({ spu_id, isPublished = true }) => {
    try {
        const { spu_info, sku_list } = await oneSpu({ spu_id })
        let product = {
            product_detail: {},
            special_offer: {},
            sku_list: [],
            product_images : [],
            product_brand: {},
            product_categories: [],
            product_attributes: [],
            related_products: [],
            product_comment: []
        }
        product.product_detail = spu_info ? spu_info : {}
        product.sku_list = sku_list ? sku_list : []
        //
        product.product_images = await getImageBySpuId({ spu_id: spu_info._id })
        product.product_brand = await getBrandById({ brand_id: spu_info.product_brand })
        product.special_offer = await findSpecialOfferBySpuId({ spu_id: spu_info._id.toString(), special_offer_is_active: true })
        const categories = await findCategoryByIdList({
            isPublished: true,
            category_id_list: spu_info.product_category
        })
        product.product_categories = categories ? categories : []
        product.product_attributes = await findAttributesByProductAttributes({ product_attributes: spu_info.product_attributes })
        product.related_products = await SPU_MODEL.spu.find({
            isPublished: true,
            _id: {
                $ne: spu_info._id
            },
            product_category: {
                $in: spu_info.product_category
            }
        })

        return product

    } catch (error) {
        console.log(error)
        return null
    }
}

const checkProductByServer = async (products) => {
    return await Promise.all(products.map(async product => {
        if (product.sku_id) {
            const foundSku = await oneSku({ product_id: product.productId, sku_id: product.sku_id })
            if (foundSku) {
                console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", foundSku)
                return {
                    price: foundSku.sku_price,
                    quantity: product.quantity,
                    productId: product.productId,
                    sku_id: foundSku._id
                }
            }
        } else {
            const foundProduct = await spu_repo.getProductById(product.productId)
            if (foundProduct) {
                return {
                    price: foundProduct.product_price,
                    quantity: product.quantity,
                    productId: product.productId,
                    sku_id: null
                }
            }
        }


    }))
}

const findProductsByBrand = async ({ limit = 50, sort = 'ctime', page = 1, filter = { isPublished: true, brand_id: null } }) => {

    let product_list = {
        productsByBrand: [],
    }
    const productsByBrand = await spu_repo.findProductsByBrand({
        limit, sort, page, filter
    })
    if (productsByBrand.length == 0) return null
    let brand_list = []
    let special_offer = []
    let sku_list = []
    console.log("productsByBrand", productsByBrand)
    for (let index = 0; index < productsByBrand.length; index++) {
        const brand = await getBrandById({ brand_id: productsByBrand[index].product_brand })
        brand_list.push(brand)
        const skulist = await allSkuBySpuId({ product_id: productsByBrand[index]._id })
        sku_list.push(skulist)
        console.log("id", productsByBrand[index]._id)
        const specialoffer = await findSpecialOfferBySpuId({ spu_id: productsByBrand[index]._id.toString(), special_offer_is_active: true })
        special_offer.push(specialoffer)
    }
    product_list.productsByBrand = await productsByBrand.map((product, index) => {
        return { ...product, brand: brand_list[index], special_offer: special_offer[index], sku_list: sku_list[index] }
    })

    return product_list.productsByBrand
}

module.exports = {
    newSpu, oneSpu, isPublishProduct, isUnPublishProduct, isFindProductsByAttributes, isFindProduct,
    isfindAllProducts,
    findProductDetail, findProductsByCategory, checkProductByServer, findProductsByBrand
}