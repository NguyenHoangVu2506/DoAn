'use strict'
const { ForbiddenRequestError, NotFoundRequestError, ConflictRequestError, BadRequestError } = require('../core/error.response')
const { discount } = require('../models/DiscountModel')
const { findAllProducts } = require('../models/repositories/spu.repo')
const { findAllDiscountCodeUnSelect, findAllDiscountCodeSelect, checkDiscountExists } = require('../models/repositories/discount.repo')

class DiscountService {
    static async createDiscountCode(payload) {
        const {
            code, start_date, end_date, is_active,
            min_order_value, product_ids, applies_to, name,
            description, type, value, max_value, max_uses, uses_count, max_uses_per_user, users_used
        } = payload

        //kiem tra
        if (Date.now() > new Date(start_date) || Date.now() > new Date(end_date)) {
            throw new ForbiddenRequestError('discount code has expired')
        }

        if (new Date(start_date) >= new Date(end_date)) {
            throw new ForbiddenRequestError('start date must be before end_date')
        }

        //create index for discount code
        const foundDiscount = await discount.findOne({
            discount_code: code
        }).lean()

        if (foundDiscount && foundDiscount.discount_is_active) {
            throw new ForbiddenRequestError('Discount exists')

        }

        const newDiscount = await discount.create({
            discount_name: name,
            discount_description: description,
            discount_type: type, // percentage 
            discount_value: value, //10.000, 10 
            discount_max_value: max_value,
            discount_code: code, // discountCode 
            discount_start_date: start_date, // ngay bat dau
            discount_end_date: end_date, // ngyay ket thuc
            discount_max_uses: max_uses, // so luong discount duoc ap dung 
            discount_uses_count: uses_count, // so discount da su dung
            discount_users_used: users_used, // ai da sung
            discount_max_uses_per_user: max_uses_per_user, // so luong cho phep toi da duc 
            discount_min_order_value: min_order_value,
            discount_is_active: is_active,
            discount_applies_to: applies_to,
            discount_product_ids: applies_to === 'all' ? [] : product_ids  // so san pham duoc ap dung

        })
        return newDiscount
    }
    /**
     get all discount with Product
    */




    static async getAllDiscountCodeWithProduct({
        code, limit, page

    }) {
        //create index for discount_code
        const foundDiscount = await discount.findOne({
            discount_code: code
        }).lean()
        if (!foundDiscount || !foundDiscount.discount_is_active) {
            throw new ForbiddenRequestError('discount not exists')
        }

        const { discount_applies_to, discount_product_ids } = foundDiscount

        console.log(discount_product_ids)
        let products
        if (discount_applies_to === 'all') {
            products = await findAllProducts({
                filter: {
                    isPublished: false
                },
                limit: +limit,
                page: +page,
                sort: 'ctime',
                select: ['product_name', 'product_quantity']
            })
            //get all product
        }
        if (discount_applies_to === 'specific') {
            console.log('s')
            products = await findAllProducts({
                filter: {
                    _id: { $in: discount_product_ids },
                    isPublished: false
                },
                limit: +limit,
                page: +page,
                sort: 'ctime',
                select: ['product_name', 'product_quantity']

            })

        }
        return products
    }


    static async getAllDiscountCodeByShop({
        limit, page
    }) {
        const discounts = await findAllDiscountCodeUnSelect({
            limit: +limit,
            page: +page,
            filter: {
                discount_is_active: true
            },
            unSelect: ['__v'],
            model: discount
        })

        return discounts

    }
    /**
     * 
     */
    static async getDiscountAmount({ codeId, userId, products }) {
        const foundDiscount = await checkDiscountExists({
            model: discount, filter: {
                discount_code: codeId
            }
        })
        if (!foundDiscount) throw new NotFoundRequestError("discount not found")
        const { discount_is_active, discount_max_uses, discount_min_order_value, 
            discount_users_used, discount_start_date, discount_end_date, 
            discount_max_uses_per_user, discount_type, discount_value , discount_max_value} = foundDiscount
        if (!discount_is_active) throw new NotFoundRequestError("discount expried")
        if (!discount_max_uses) throw new NotFoundRequestError("discount are out")

        // if (Date.now() < new Date(discount_start_date) || Date.now() > new Date(discount_end_date)) {
        //     throw new NotFoundRequestError('discount ecode has expried!')
        // }
        let totalOrder = 0
        if (discount_min_order_value > 0) {
            totalOrder = products.reduce((acc, pro) => {
                return acc + (pro.quantity * pro.price)
            }, 0)

            if (totalOrder < discount_min_order_value) {
                throw new NotFoundRequestError(`discount requires a minium order value of ${discount_min_order_value}`)
            }
        }
        if (discount_max_uses_per_user > 0) {
            const userDiscount = discount_users_used.find(user => user.userId === userId)
            if (userDiscount) {
                //
            }
        }
        let amount = discount_type === 'fixed_amount' ? discount_value : totalOrder * (discount_value / 100)
        if( amount > discount_max_value){
          amount = discount_max_value 
        }
        return {
            totalOrder,
            discount: amount,
            totalPrice: totalOrder - amount
        }
    }
    //xoa discount
    static async deleteDiscountCode({ codeId }) {
        const deleted = await DiscountModel.findOneAndDelete({
            discount_code: codeId
        })
        return deleted
    }
    //cancel 
    static async cancelDiscountCode({ codeId, userId }) {
        const foundDiscount = await checkDiscountExists({
            model: discount,
            filter: {
                discount_code: codeId
            }
        })
        if (!foundDiscount) {
            throw new ForbiddenRequestError('Discount exists')
        }
        const result = await discount.findByIdAndUpdate(foundDiscount._id, {
            $pull: {
                discount_users_used: userId
            },
            $inc: {
                discount_max_uses: 1,
                discount_uses_count: -1
            }
        })
        return result

    }
}

module.exports = DiscountService