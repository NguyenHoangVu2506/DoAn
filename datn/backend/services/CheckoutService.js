'use strict'
const { ForbiddenRequestError, NotFoundRequestError, ConflictRequestError, BadRequestError } = require('../core/error.response')
const { findCartById } = require("../models/repositories/checkout.repo")

const { getDiscountAmount } = require('./DiscountService')
// const { acquireLock, releaseLock } = require('./RedisService')
const { order } = require('../models/OrderModel')
const { checkProductByServer } = require('./SpuService')
const { findSpecialOfferBetweenStartDateAndEndByDate } = require('./SpecialOfferService')
const { v4: uuidv4 } = require('uuid')

class CheckoutService { 
    static async checkoutReview({ cartId, userId, order_ids }) {

        // const foundCart = await findCartById(cartId)

        // if (!foundCart) {
        //     throw new BadRequestError('cart does not exists!')
        // }
        const checkout_order = {
            totalPrice: 0,
            feeShip: 0,//phi ship
            totalSpecialOffer: 0,//tong discount
            totalDiscount: 0,//tong discount
            totalCheckout: 0,//tong thanh toan
        }

        const { shop_discounts = [], item_products = [] } = order_ids

        console.log("item_products:  ", item_products)
        //checkout product available

        const checkProductServer = await checkProductByServer(item_products)
        console.log('checkProductServer', checkProductServer)
        if (!checkProductServer[0]) throw new BadRequestError('order wrong')
        //tong don hang

        const checkoutPrice = checkProductServer.reduce((acc, product) => {
            return acc + (product.quantity * product.price)
        }, 0)
        //tong tien truoc khi xuly
        checkout_order.totalPrice = + checkoutPrice
        const itemCheckout = {
            shop_discounts,//hmmmm
            priceRaw: checkoutPrice,//tien truoc khi giam gia
            priceApplySpecialOffer: checkoutPrice,
            priceApplyDiscount: checkoutPrice,
            item_products: checkProductServer
        }
        let checkProductServerSpecialOffer = []
        const checkDateNow = await findSpecialOfferBetweenStartDateAndEndByDate({})

        // if (checkDateNow) {
        //     checkDateNow.special_offer_spu_list?.map((spu) => {
        //         if (spu.sku_list?.length > 0) {
        //             return spu.sku_list.map((sku) => {
        //                 return checkProductServer.find((prod) => {
        //                     if (prod.sku_id == sku.sku_id) {
        //                         const { price, ...prodNoPrice } = prod
        //                         checkProductServerSpecialOffer.push({ ...prodNoPrice, price: sku.price_sale })
        //                         return
        //                     }
        //                 })
        //             })
        //         }
        //         return checkProductServer.find((prod) => {
        //             if (!prod.sku_id & prod.productId == spu.product_id) {
        //                 const { price, ...prodNoPrice } = prod
        //                 checkProductServerSpecialOffer.push({ ...prodNoPrice, price: spu.price_sale })
        //                 return
        //             }
        //         })
        //     })
        // }
        if (checkDateNow) {

            checkProductServer.forEach((prod) => {

                const spu_sale = checkDateNow.special_offer_spu_list.find((spu) => spu.product_id == prod.productId)
                if (spu_sale) {
                    checkDateNow.special_offer_spu_list?.filter((spu_sale) => {
                        if (!prod.sku_id & prod.productId == spu_sale.product_id) {
                            const { price, ...prodNoPrice } = prod
                            checkProductServerSpecialOffer.push({ ...prodNoPrice, price: spu_sale.price_sale })
                            return
                        }
                        if (prod.sku_id !== null && spu_sale.sku_list?.length > 0) {
                            const sku_sale = spu_sale.sku_list.find((sku) => sku.sku_id == prod.sku_id)

                            if (sku_sale) {
                                const { price, ...prodNoPrice } = prod
                                checkProductServerSpecialOffer.push({ ...prodNoPrice, price: sku_sale.price_sale })
                                return
                            }
                        }
                    })
                } else {
                    checkProductServerSpecialOffer.push(prod)
                }


            })
        }

        itemCheckout.priceApplySpecialOffer = checkProductServerSpecialOffer.reduce((acc, product) => {
            return acc + (product.quantity * product.price)
        }, 0)
        checkout_order.totalSpecialOffer = checkoutPrice - itemCheckout.priceApplySpecialOffer


        if (shop_discounts.length > 0) {
            const { discount = 0 } = await getDiscountAmount({
                codeId: shop_discounts[0].codeId,
                userId,
                products: checkProductServerSpecialOffer.length > 0 ? checkProductServerSpecialOffer : checkProductServer
            })
            //tong discount 
            checkout_order.totalDiscount = discount
            //neu tien giam gia >0


            itemCheckout.priceApplyDiscount = checkoutPrice - checkout_order.totalSpecialOffer - discount

        }
        //tong thanh toan

        checkout_order.totalCheckout = checkoutPrice - checkout_order.totalSpecialOffer - checkout_order.totalDiscount


        return {
            order_ids,
            order_ids_new: itemCheckout,
            checkout_order
        }
    }

    static async orderByUser({
        order_ids,
        cartId,
        userId,
        user_address = {},
        user_payment = {}
    }) {
        const { order_ids_new, checkout_order } = await this.checkoutReview({
            cartId, userId, order_ids
        })
        //check lai xem co vuot ton kho hay k
        //get new array product
        // const products = order_ids_new.flatMap(order => order.item_products)
        // console.log(products)
        // const acquireProduct = []
        //optimistic locks
        // for (let i = 0; i < products.length; i++) {
        //     const { productId, quantity } = products[i];
        //     const keyLock = await acquireLock(productId, quantity, cartId)
        //     acquireProduct.push(keyLock ? true : false)
        //     console.log(keyLock)
        //     if (keyLock) {
        //         await releaseLock(keyLock)
        //     }
        // }

        //check
        // if (acquireProduct.includes(false)) {
        //     throw new BadRequestError('mot so sp da duoc cap nhat ...')
        // }
        const order_trackingNumber = uuidv4()
        const newOrder = await order.create({
            order_userId: userId,
            order_checkout: checkout_order,
            order_shipping: user_address,
            order_product: order_ids_new,
            order_payment: user_payment
        })
        //neu them thanh cong remove pro co trong gio hanag
        // if(){

        // }

        return newOrder
    }

    static async findOrderByUser({ user_id }) {
        const Order = await order.find({
            order_userId: user_id
        })
        return Order
    }
    static async findAllOrder() {
        const Order = await order.find()
        return Order
    }
    static async cancelOrderByUser() {

    }
    static async updateOrderStatusbyShop() {

    }
}
module.exports = CheckoutService