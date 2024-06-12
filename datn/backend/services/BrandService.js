'use strict'
const { brand } = require('../models/BrandModel')

const newBrand = async ({
    brand_name, brand_image = null, brand_description, public_image_id = null, isPublished = true
}) => {
    try {
        const brands = await brand.create({
            brand_name, brand_image, brand_description, public_image_id, isPublished
        })
        return brands

    } catch (error) {
        console.log(`error`)

    }
}

const getListBrand = async ({ sort, isPublished = true }) => {
    try {
        const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
        const listbrand = await brand.find({
            isPublished
        }).sort(sortBy)
            .lean()
        return listbrand

    } catch (error) {
        console.log(error)
    }
}

const getBrandById = async ({ brand_id }) => {
    try {
        const listbrand = await brand.findOne({
            _id: brand_id
        }).lean()
        return listbrand

    } catch (error) {

    }
}

const updateBrand = async ({ brand_id, brand_name, brand_description, brand_image }) => {
    try {
        const query = { _id: brand_id }
        const updates = {
            $set: {
                brand_id: brand_id,
                brand_name: brand_name,
                brand_description: brand_description,
                brand_image: brand_image
            }
        }, options = {
            returnNewDocument: true
        }
        return await brand.findOneAndUpdate(query, updates, options)

    } catch (error) {
        console.log(`error`)

    }
}

const pulishBrand = async ({ brand_id, isPublished = false }) => {
    try {
        const query = {
            _id: brand_id,
            isPublished
        }, updateSet = {
            $set: {
                isPublished: true
            },
        }, options = {
            upsert: true
        }
        return await brand.updateOne(query, updateSet, options)
    } catch (error) {
    }
}

const unpulishBrand = async ({ brand_id, isPublished = true }) => {
    try {
        const query = {
            _id: brand_id,
            isPublished
        }, updateSet = {
            $set: {
                isPublished: false
            },
        }, options = {
            upsert: true
        }
        return await brand.updateOne(query, updateSet, options)
    } catch (error) {
    }
}

const deleteBrandById = async ({ brand_id, isDeleted = false }) => {
    try {
        const query = {
            _id: brand_id,
            isDeleted
        }, updateSet = {
            $set: {
                isDeleted: true
            },
        }, options = {
            upsert: true
        }
        console.log(updateSet)
        return await brand.updateOne(query, updateSet, options)
    } catch (error) {
    }
}

const restoreBrandById = async ({ brand_id, isDeleted = true }) => {
    try {
        const query = {
            _id: brand_id,
            isDeleted
        }, updateSet = {
            $set: {
                isDeleted: false
            },
        }, options = {
            upsert: true
        }
        console.log(updateSet)
        return await brand.updateOne(query, updateSet, options)
    } catch (error) {

    }

}

const getDeleteBrandList = async ({ sort, isDeleted = true }) => {
    try {
        const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
        const listbrand = await brand.find({
            isDeleted
        }).sort(sortBy)
            .lean()
        console.log("listbrand", listbrand)

        return listbrand
    } catch (error) {

    }
}

const removeBrand = async ({ brand_id }) => {
    return await brand.deleteOne({ _id: brand_id }).lean()
}

module.exports = {
    newBrand, getListBrand, getBrandById, updateBrand,
    deleteBrandById, getDeleteBrandList, restoreBrandById, removeBrand,
    pulishBrand, unpulishBrand
}