'use strict'
const { BadRequestError } = require('../core/error.response')
const { SuccessResponse } = require('../core/success.response')
const UploadService = require('../services/UploadService')

class UploadController {
    constructor() {
        this.service = new UploadService
    }
    uploadImageArray = async (req, res, next) => {
        const { files } = req
        const { folderName } = req.body
        if (!files.length)
            throw new BadRequestError("files missing")
        return new SuccessResponse({
            message: "uploadimageArray ",
            metaData: await this.service.uploadImageArray({ files,folderName })
        }).send(res)
    }
    uploadImageSingle = async (req, res, next) => {
        const { file } = req
        const { folderName } = req.body
        if (!file)
            throw new BadRequestError("files missing")
        return new SuccessResponse({
            message: "uploadimageSingle ",
            metaData: await this.service.uploadImageSingle({ file,folderName })
        }).send(res)
    }
}
module.exports = new UploadController