'use strict'
const galleries = require('../models/GalleryModel')

const addImage = async ({ spu_id, sku_id, thumb_url, public_id }) => {
    const image = await galleries.create({
        spu_id,
        sku_id,
        thumb_url,
        public_id
    })
    return image
}

const getImageBySpuId = async ({ spu_id }) => {

    const getImage = await galleries.find({
        spu_id
    })
    return getImage
}

module.exports = {
    addImage, getImageBySpuId
}