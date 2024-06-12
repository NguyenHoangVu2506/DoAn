'use strict'
const { info } = require('../models/InfoModel')
const { getSelectData, unGetSelectData, convertToObjectMongoDb } = require('../../backend/utils/index')

class InfoService {
    static async createInfo(payload) {
        const {
            info_name,
            info_logo,
            info_mail,
            info_address,
            info_hotline,
            info_phone,
            info_website,
            other_info, } = payload

        const newInfo = await info.create({
            info_name: info_name,
            info_logo: info_logo,
            info_mail: info_mail,
            info_address: info_address,
            info_hotline: info_hotline,
            info_phone: info_phone,
            info_website: info_website,
            other_info: other_info,

        })
        return newInfo
    }
    // static async getInfoById({ isPublished = false }) {
    //     return await info.findOne({ isPublished: isPublished }).lean()
    // }

    static async getListInfo({ sort, isPublished = true }) {
        try {
            const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
            const listInfo = await info.find({
                isPublished
            }).sort(sortBy)
                .lean()
            return listInfo

        } catch (error) {
            console.log(error)
        }
    }

    static async getInfoById({ info_id }) {
        try {
            const listInfo = await info.findOne({
                _id: info_id
            }).lean()
            return listInfo

        } catch (error) {

        }
    }

    static async updateInfo({ info_id, info_name, info_mail,
        info_address,
        info_hotline,
        info_phone,
        info_website,
        other_info, 
        info_logo }) {
        try {
            const query = { _id: info_id }
            const updates = {
                $set: {
                    info_id: info_id,
                    info_name: info_name,
                    info_logo: info_logo,
                    info_mail: info_mail,
                    info_address: info_address,
                    info_hotline: info_hotline,
                    info_phone: info_phone,
                    info_website: info_website,
                    other_info: other_info,
                }
            }, options = {
                returnNewDocument: true
            }
            return await info.findOneAndUpdate(query, updates, options)

        } catch (error) {
            console.log(`error`)

        }
    }

    static async pulishInfo({ info_id, isPublished = false }) {
        try {
            const query = {
                _id: info_id,
                isPublished
            }, updateSet = {
                $set: {
                    isPublished: true
                },
            }, options = {
                upsert: true
            }
            return await info.updateOne(query, updateSet, options)
        } catch (error) {
        }
    }

    static async unpulishInfo({ info_id, isPublished = true }) {
        try {
            const query = {
                _id: info_id,
                isPublished
            }, updateSet = {
                $set: {
                    isPublished: false
                },
            }, options = {
                upsert: true
            }
            return await info.updateOne(query, updateSet, options)
        } catch (error) {
        }
    }

    static async deleteInfoById({ info_id, isDeleted = false }) {
        try {
            const query = {
                _id: info_id,
                isDeleted
            }, updateSet = {
                $set: {
                    isDeleted: true
                },
            }, options = {
                upsert: true
            }
            console.log(updateSet)
            return await info.updateOne(query, updateSet, options)
        } catch (error) {
        }
    }

    static async restoreInfoById({ info_id, isDeleted = true }) {
        try {
            const query = {
                _id: info_id,
                isDeleted
            }, updateSet = {
                $set: {
                    isDeleted: false
                },
            }, options = {
                upsert: true
            }
            console.log(updateSet)
            return await info.updateOne(query, updateSet, options)
        } catch (error) {

        }

    }

    static async getDeleteInfoList({ sort, isDeleted = true }) {
        try {
            const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
            const listInfo = await info.find({
                isDeleted
            }).sort(sortBy)
                .lean()
            console.log("listInfo", listInfo)

            return listInfo
        } catch (error) {

        }
    }

    static async removeInfo({ info_id }) {
        return await info.deleteOne({ _id: info_id }).lean()
    }


}
module.exports = InfoService