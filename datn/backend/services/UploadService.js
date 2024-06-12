'use strict'

const cloudinary = require('../config/cloudinary_config')

class UploadService {
    async uploadImageArray({
        files, folderName = 'website/products'
    }) {
        try {
            if (!files.length) return null
            const uploaderUrl = []
            for (const file of files) {
                const result = await cloudinary.v2.uploader.upload(file.path, { folder: folderName })
                uploaderUrl.push({
                    image_url: result.secure_url,
                    public_id: result.public_id,
                    thumb_url: await cloudinary.url(result.public_id, {
                    }),
                    result: result
                })
            }
            return uploaderUrl

        } catch (error) {
            console.log("err loading image", error)
        }
 
    }
    async uploadImageSingle({
        file, folderName = 'website/products'
    }) {
        try {
            if (!file) return null
            const result = await cloudinary.v2.uploader.upload(file.path, { folder: folderName })
            return {
                image_url: result.secure_url,
                public_id: result.public_id,
                thumb_url: await cloudinary.url(result.public_id),
                result: result
            }
        } catch (error) {
            console.log("err loading image", error)
        }

    }
}
module.exports = UploadService