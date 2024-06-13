'use strict'
const { cart } = require('../models/CartModel')
const { ForbiddenRequestError, NotFoundRequestError, ConflictRequestError, BadRequestError } = require('../core/error.response')
const { getProductById } = require('../models/repositories/spu.repo')
class CartService {

    //start repo cart
    async createUserCart({ userId, product }) {
        const query = { cart_userId: userId, cart_state: 'active' }
        const updateOrInsert = {
            $addToSet: {
                cart_products: product
            }

        }, options = {
            upsert: true,
            new: true
        }
        return await cart.findOneAndUpdate(query, updateOrInsert, options)
    }

    async updateUserCartQuantity({ userId, product }) {

        const { productId, quantity, sku_id } = product

        const query = sku_id ? {
            cart_userId: userId,
            // 'cart_products.productId': productId,
            'cart_products.sku_id': sku_id,
            cart_state: 'active'
        } : {
            cart_userId: userId,
            'cart_products.productId': productId,
            // 'cart_products.sku_id': sku_id,
            cart_state: 'active'
        }, updateSet = {
            $inc: {
                'cart_products.$.quantity': quantity
            },

        }, options = {
            upsert: true,
            new: true
        }

        return await cart.findOneAndUpdate(query, updateSet, options)
    }

    async updateUserCartSku({ userId, product }) {

        const { productId, sku_id, sku_id_old } = product
        const query = {
            cart_userId: userId,
            'cart_products.productId': productId,
            'cart_products.sku_id': sku_id_old,
            cart_state: 'active'
        }, updateSet = {
            $set: {
                'cart_products.$.sku_id': sku_id
            }
        }, options = {
            upsert: true,
            new: true
        }

        return await cart.findOneAndUpdate(query, updateSet, options)
    }

    //end repo cart

    async addToCart({ userId, product = {} }) {
        //ktra cart co ton tai hay khong
        const userCart = await cart.findOne({ cart_userId: userId })
        if (!userCart) {
            return await this.createUserCart({ userId, product })
        }

        //neu co cart roi nhung chua co sp
        if (!userCart.cart_products.length) {
            userCart.cart_products = [product]
            userCart.cart_count_product = userCart.cart_count_product + 1
            return await userCart.save()
        }
        //neu gio hang chua co sp khac 
        let hasProduct = await userCart.cart_products.find((pro) => {
            return pro.productId === product.productId
        })
        if (!hasProduct) {
            userCart.cart_products = [...userCart.cart_products, product]
            userCart.cart_count_product = userCart.cart_count_product + 1
            return await userCart.save()
        }
        let hasSkuId = await userCart.cart_products.find((pro) => {
            return pro.sku_id === product.sku_id
        })
        if (hasProduct && !hasSkuId) {
            userCart.cart_products = [...userCart.cart_products, product]
            userCart.cart_count_product = userCart.cart_count_product + 1
            return await userCart.save()
        }
        //gio hang ton tai co sp nay => update quantity
        return await this.updateUserCartQuantity({ userId, product })

    }

    //update cart trong gio hang
    async addToCartV2({ userId, shop_order_ids = {} }) {
        // console.log(userId[1].o1[0]+userId[1].o2[1])
        const { productId, quantity, old_quantity, sku_id, sku_id_old } = shop_order_ids?.item_products
        console.log(shop_order_ids)
        // check sp co ton tai k
        const foundProduct = await getProductById(productId)
        if (!foundProduct) throw new NotFoundRequestError('product do not belong to the shop')

        if (quantity === 0) {
            //deleted
        }
        if (quantity != old_quantity && sku_id == sku_id_old) {
            console.log("aa", quantity - old_quantity)
            return await CartService.updateUserCartQuantity({
                userId,
                product: {
                    productId,
                    quantity: quantity - old_quantity,
                    sku_id
                }
            })
        }
        const userCart = await cart.findOne({ cart_userId: userId })
        if (!userCart) {
            return null
        }
        let hasSkuId = await userCart.cart_products.find((pro) => {
            return pro.sku_id === sku_id
        })
        if (hasSkuId && sku_id != sku_id_old) {
            this.deleteCartItem({ userId: userId, productId: productId, sku_id: sku_id_old })
            return await this.updateUserCartQuantity({
                userId,
                product: {
                    productId,
                    quantity: quantity,
                    sku_id: hasSkuId.sku_id
                }
            })
            // console.log(hasSkuId)
        }

        if (sku_id != sku_id_old && quantity == old_quantity) {
            return await this.updateUserCartSku({
                userId,
                product: {
                    productId,
                    sku_id,
                    sku_id_old
                }
            })
        }
        if (sku_id == sku_id_old && quantity == old_quantity) {
            return userCart

        }
        return null
    }
    async updateQuantityFromCart({ userId, shop_order_ids = {} }) {
        const { productId, sku_id, quantity, old_quantity } = shop_order_ids?.item_products

        return await this.updateUserCartQuantity({
            userId,
            product: {
                productId,
                quantity: quantity - old_quantity,
                sku_id
            }
        })

    }

    async updateSkuFromCart({ userId, shop_order_ids = {} }) {
        const { productId, sku_id, sku_id_old } = shop_order_ids?.item_products
        return await this.updateUserCartSku({
            userId,
            product: {
                productId,
                sku_id,
                sku_id_old
            }
        })

    }

    async updateSkuFromCartV2({ userId, shop_order_ids = {} }) {
        const { productId, sku_id, quantity, sku_id_old } = shop_order_ids?.item_products
        // console.log(sku_id, sku_id_old, quantity, old_quantity)
        // const foundProduct = await RPCRequest("SPU_RPC", {
        //     type: "CHECK_PRODUCT_BY_ID",
        //     data: {
        //         productId: productId
        //     }
        // })
        // console.log("foundProduct", foundProduct)
        // if (!foundProduct) throw new errorResponse.NotFoundRequestError('product do not belong to the shop')

        const userCart = await cart.findOne({ cart_userId: userId })
        if (!userCart) {
            throw new NotFoundRequestError('cart not found')
        }
        let hasSkuId = await userCart.cart_products.find((pro) => pro.sku_id == sku_id)
        if (hasSkuId && (sku_id != sku_id_old)) {
            this.deleteCartItem({ userId: userId, productId: productId, sku_id: sku_id_old })
            return await this.updateUserCartQuantity({
                userId,
                product: {
                    productId,
                    quantity: quantity,
                    sku_id: hasSkuId.sku_id
                }
            })
        }
        if (!hasSkuId) {
            return await this.updateUserCartSku({
                userId,
                product: {
                    productId,
                    sku_id,
                    sku_id_old
                }
            })
        }
        return null
    }
    //deleted
    async deleteCartItem({ userId, productId, sku_id }) {
        const query = {
            cart_userId: userId,
            cart_state: 'active'
        }, updateSet = {
            $pull: sku_id ? {
                cart_products: { sku_id }
            } : { cart_products: { productId } },
            $inc: {
                cart_count_product: -1
            }
        }, options = {
            upsert: true,
            new: true
        }

        return await cart.findOneAndUpdate(query, updateSet, options)
    }

    //
    async deleteToCartByCartIdAndUserId({ cartId, userId }) {
        return await cart.deleteOne({ _id: Types.ObjectId(cartId), cart_userId: userId, cart_state: cart_state }).lean()
    }

    //get list
    async getListUserCart({ userId, cart_state = 'active' }) {
        console.log({ userId })
        return await cart.findOne({ cart_userId: userId, cart_state: cart_state }).lean()
    }

    async findProductIncartBySkuId({ userId, cart_state = 'active', productId, sku_id }) {
        return await cart.findOne({
            cart_userId: userId, cart_state: cart_state, 'cart_products.productId': productId,
            'cart_products.sku_id': sku_id
        }).lean()
    }

    async getCartById({ CartId, cart_state = 'active' }) {
        return await cart.findOne({
            _id: Types.ObjectId(CartId), cart_state: cart_state
        }).lean()
    }

    async findUserCart({ userId, cart_state = 'active' }) {
        const getcart = await cart.findOne({
            cart_userId: userId, cart_state: cart_state
        }).lean()

        return getcart
    }
}

module.exports = new CartService