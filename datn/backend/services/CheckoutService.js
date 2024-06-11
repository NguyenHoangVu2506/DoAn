'use strict'
const { ForbiddenRequestError, NotFoundRequestError, ConflictRequestError, BadRequestError } = require('../core/error.response')
const { findCartById } = require("../models/repositories/checkout.repo")
const { checkProductByServer } = require('../models/repositories/spu.repo')
const { getDiscountAmount } = require('./DiscountService')
const { acquireLock, releaseLock } = require('./RedisService')
const { order } = require('../models/OrderModel')


class CheckoutService {
    static async checkoutReview({ cartId, userId, order_ids }) {

        const foundCart = await findCartById(cartId)
     
        if (!foundCart) {
            throw new BadRequestError('cart does not exists!')
        }
        const checkout_oder = {
            totalPrice: 0,
            feeShip: 0,//phi ship
            totalDiscount: 0,//tong discount
            totalCheckout: 0,//tong thanh toan
        }, order_ids_new = []
        for (let i = 0; i < order_ids.length; i++) {
            const { shop_discounts=[], item_products = [] } = order_ids[i]

            console.log("item_products:  ",item_products)
            //checkout product available
            const checkProductServer = await checkProductByServer(item_products)
            console.log('checkProductServer', checkProductServer)
            if (!checkProductServer[0]) throw new BadRequestError('order wrong')
            //tong don hang
            const checkoutPrice = checkProductServer.reduce((acc, product) => {
                return acc + (product.quantity * product.price)
            }, 0)
            //tong tien truoc khi xuly
            checkout_oder.totalPrice = + checkoutPrice

            const itemCheckout = {
                shop_discounts,//hmmmm
                priceRaw: checkoutPrice,//tien truoc khi giam gia
                priceApplyDiscount: checkoutPrice,
                item_products: checkProductServer
            }
            if (shop_discounts.length > 0) {
                const { totalPrice = 0, discount = 0 } = await getDiscountAmount({
                    codeId: shop_discounts[0].codeId,
                    userId,
                    products: checkProductServer
                })
                //tong discount 
                checkout_oder.totalDiscount += discount
                //neu tien giam gia >0
                if (discount > 0) {
                    itemCheckout.priceApplyDiscount = checkoutPrice - discount
                }
            }
            //tong thanh toan
            checkout_oder.totalCheckout += itemCheckout.priceApplyDiscount
            order_ids_new.push(itemCheckout)

        }

        return {
            order_ids,
            order_ids_new,
            checkout_oder
        }


    }

    static async orderByUser({
        order_ids,
        cartId,
        userId,
        user_address = {},
        user_payment = {}
    }) {
        const { order_ids_new, checkout_oder } = await this.checkoutReview({
            cartId, userId, order_ids
        })
        //check lai xem co vuot ton kho hay k
        //get new array product
        const products = order_ids_new.flatMap(order => order.item_products)
        console.log(products)
        const acquireProduct = []
        //optimistic locks
        for (let i = 0; i < products.length; i++) {
            const { productId, quantity } = products[i];
            const keyLock = await acquireLock(productId, quantity, cartId)
            acquireProduct.push(keyLock ? true : false)
            console.log(keyLock)
            if (keyLock) {
                await releaseLock(keyLock)
            }


        }

        //check
        if (acquireProduct.includes(false)) {
            throw new BadRequestError('mot so sp da duoc cap nhat ...')
        }
        const newOrder = await order.create({
            order_userId: userId,
            order_checkout: checkout_oder,
            order_shipping: user_address,
            order_product: order_ids_new,
            order_payment: user_payment
        })
        //neu them thanh cong remove pro co trong gio hanag
        // if(){

        // }

        return newOrder
    }

    static async getOneOrderByUser(){

    }
    static async cancelOrderByUser(){
        
    }
    static async updateOrderStatusbyShop(){
        
    }
}
module.exports = CheckoutService