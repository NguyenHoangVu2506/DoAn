'use strict'
const { ForbiddenRequestError, NotFoundRequestError, ConflictRequestError, BadRequestError } = require('../core/error.response')
const { findCartById } = require("../models/repositories/checkout.repo")

const { getDiscountAmount } = require('./DiscountService')
// const { acquireLock, releaseLock } = require('./RedisService')
const { order } = require('../models/OrderModel')
const { checkProductByServer } = require('./SpuService')
const { findSpecialOfferBetweenStartDateAndEndByDate } = require('./SpecialOfferService')
const { sendEmailLinkVerify } = require('./EmailService');
const { v4: uuidv4 } = require('uuid')

class CheckoutService {
    static async checkoutReview({ cartId, userId, order_ids }) {

        const checkout_order = {
            totalPrice: 0,
            feeShip: 0,//phi ship
            totalSpecialOffer: 0,//tong discount
            totalDiscount: 0,//tong discount
            totalCheckout: 0,//tong thanh toan
        }

        const { shop_discounts = [], item_products = [] } = order_ids

        // console.log("item_products:  ", item_products)
        //checkout product available

        const checkProductServer = await checkProductByServer(item_products)
        // console.log('checkProductServer', checkProductServer)
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

        if (checkDateNow) {

            checkProductServer.forEach((prod) => {

                const spu_sale = checkDateNow.special_offer_spu_list.find((spu) => spu.product_id == prod.productId)
                if (spu_sale) {
                    checkDateNow.special_offer_spu_list?.filter((spu_sale) => {
                        if (!prod.sku_id & prod.productId == spu_sale.product_id) {
                            checkProductServerSpecialOffer.push({ ...prod, price_sale: spu_sale.price_sale })
                            return
                        }
                        if (prod.sku_id !== null && spu_sale.sku_list?.length > 0) {
                            const sku_sale = spu_sale.sku_list.find((sku) => sku.sku_id == prod.sku_id)

                            if (sku_sale) {

                                checkProductServerSpecialOffer.push({ ...prod, price_sale: sku_sale.price_sale })
                                return
                            }
                        }
                    })
                } else {
                    checkProductServerSpecialOffer.push(prod)
                }
            })
        }

        // console.log("checkProductServerSpecialOffer", checkProductServerSpecialOffer)

        itemCheckout.priceApplySpecialOffer = checkProductServerSpecialOffer.reduce((acc, product) => {
            return acc + (product.quantity * (product.price_sale ? product.price_sale : product.price))
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
        if (checkProductServerSpecialOffer.length > 0) {
            itemCheckout.item_products = checkProductServerSpecialOffer
        }
        checkout_order.totalCheckout = checkoutPrice - checkout_order.totalSpecialOffer - checkout_order.totalDiscount


        return {
            order_ids,
            order_ids_new: itemCheckout,
            checkout_order
        }
    }

    // static async orderByUser({
    //     order_ids,
    //     cartId,
    //     userId,
    //     user_address = {},
    //     user_payment = {}
    // }) {
    //     const { order_ids_new, checkout_order } = await this.checkoutReview({
    //         cartId, userId, order_ids
    //     })
    //     const newOrder = await order.create({
    //         order_userId: userId,
    //         order_checkout: checkout_order,
    //         order_shipping: user_address,
    //         order_product: order_ids_new,
    //         order_payment: user_payment
    //     })
    //     //neu them thanh cong remove pro co trong gio hanag
    //     // if(){

    //     // }

    //     return newOrder
    // }
    static async orderByUser({ order_ids, cartId, userId, user_address = {}, user_payment = {} }) {
        try {
            console.log('Starting orderByUser method');
            const { order_ids_new, checkout_order } = await this.checkoutReview({
                cartId,
                userId,
                order_ids,
            });

            const newOrder = await order.create({
                order_userId: userId,
                order_checkout: checkout_order,
                order_shipping: user_address,
                order_product: order_ids_new,
                order_payment: user_payment,
            });

            // Send email notification after successful order creation
            await this.sendEmailOrder({
                user_email: user_address, // Assuming user_address contains the email address
                user_order: newOrder, // Passing the newly created order details
            });
            console.log(user_address)
            console.log('Order placed successfully');
            return newOrder;
        } catch (error) {
            console.error('Error in orderByUser:', error);
            throw new BadRequestError('Failed to create order');
        }
    }

    static async sendEmailOrder({ user_email, user_order }) {
        try {
            // Assuming you have an email template stored in a variable or file
            const emailContent = `
            <p>Quý khách hàng thân mến,</p>
            <p>Đơn hàng của bạn với mã đơn hàng ${user_order._id} đã được đặt thành công.</p>
            <p>Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi!</p>
            <p>Trân trọng,</p>
            <p>Đội ngũ BEAUTYSTORE</p>
        `;

            // Example using sendEmailLinkVerify from EmailService
            await sendEmailLinkVerify({
                html: emailContent,
                toEmail: user_email,
                subject: 'Order Confirmation',
            });

            console.log(`Email sent successfully to ${user_email}`);
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Failed to send email');
        }
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
    static async updateOrderStatusByOrder({ order_id, order_status }) {
        try {
            const query = { _id: order_id },
                updates = {
                    $set: {
                        order_status: order_status
                    },
                }, options = {
                    returnNewDocument: true,
                    new: true
                }
            return await order.findOneAndUpdate(query, updates, options)
        } catch (error) {

        }
    }
    // static async updateOrderStatusbyShop() {

    // }
}
module.exports = CheckoutService