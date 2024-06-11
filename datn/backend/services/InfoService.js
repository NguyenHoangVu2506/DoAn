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
    static async getInfoById({ isPublished = false }) {
        return await info.findOne({ isPublished: isPublished }).lean()
    }


}
module.exports = InfoService