'use strict'

const { specialOffer } = require('../models/SpecialOfferModel')
const { getSelectData } = require('../utils')

class SpecialOfferService {
    async createSpecialOffer(payload) {
        const {
            name, start_date, end_date, image, is_active,
            description, spu_list
        } = payload

        //kiem tra
        // if (Date.now() > new Date(start_date) || Date.now() > new Date(end_date)) {
        //     throw new ForbiddenRequestError('discount code has expired')
        // }

        // if (new Date(start_date) >= new Date(end_date)) {
        //     throw new ForbiddenRequestError('start date must be before end_date')
        // }
        const newSpecialOffer = await specialOffer.create({
            special_offer_name: name,
            special_offer_description: description,
            special_offer_start_date: start_date, // ngay bat dau
            special_offer_end_date: end_date, // ngyay ket thuc
            special_offer_image: image,
            special_offer_is_active: is_active,
            special_offer_spu_list: spu_list
        })
        console.log(newSpecialOffer)
        return newSpecialOffer
    }

    async getSpecialOfferBySpuId({ spu_id }) {

        const special = await specialOffer.find({
            "special_offer_spu_list.product_id": {
                $in: [spu_id]
            }
        })
        console.log(special)
        return special
    }

    async findSpecialOfferBySpuId({ spu_id, special_offer_is_active = true
    }) {
        try {
            let now = new Date();
            const special = await specialOffer.findOne({
                special_offer_is_active,
                special_offer_start_date: { $lte: now },
                special_offer_end_date: { $gte: now },
                'special_offer_spu_list.product_id': {
                    $all: [spu_id]
                }
            })
            console.log(special)
            return special
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async updateStatusById({ special_offer_is_active, special_offer_id }) {
        const foundSpecialOffer = await specialOffer.findOne({
            _id: special_offer_id
        })
        if (!foundSpecialOffer) return null
        foundSpecialOffer.special_offer_is_active = special_offer_is_active

        console.log(foundSpecialOffer)

        const updateSpecialOffer = await foundSpecialOffer.updateOne(foundSpecialOffer)
        return updateSpecialOffer
    }

    async findSpecialOfferBetweenStartDateAndEndByDate({ special_offer_is_active = true, date = Date.now() }) {
        let now = new Date(date);
        console.log(now)
        const special = await specialOffer.findOne({
            special_offer_is_active,
            special_offer_start_date: { $lte: now },
            special_offer_end_date: { $gte: now }
        })
        console.log(special)
        return special
    }
}
module.exports = new SpecialOfferService
