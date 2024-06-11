'use strict';

const { errorResponse } = require("../core/error.response");
const { Types } = require("mongoose");
const WishlistModel = require("../models/WishlistModel");


class WishlistService {

    async createUserWishList({ userId, productId }) {
        const query = { wish_list_userId: userId, wish_list_state: 'active' }
        const updateOrInsert = {
            $addToSet: {
                wish_list_products: productId
            }
        }, options = {
            upsert: true,
            new: true
        }
        return await WishlistModel.findOneAndUpdate(query, updateOrInsert, options).lean()
    }


    async addToWishList({ userId, productId = "" }) {

        const userWishList = await WishlistModel.findOne({ wish_list_userId: userId })
        if (!userWishList) {
            return await this.createUserWishList({ userId, productId })
        }

        if (!userWishList.wish_list_products.length) {
            userWishList.wish_list_products = [productId]
            return await userWishList.save()
        }
        let hasProduct = await userWishList.wish_list_products.find((proId) => {
            return proId === productId
        })
        if (hasProduct) {
            return { message: "The product already exists in the list" }
        }
        userWishList.wish_list_products = [...userWishList.wish_list_products, productId]
        return await userWishList.save()

    }


    async deleteToWishListItem({ userId, productId }) {

        const query = {
            wish_list_userId: userId,
            wish_list_state: 'active'
        }, updateSet = {
            $pull: {
                wish_list_products: productId
            }
        }
        return await WishlistModel.updateOne(query, updateSet).lean()
    }

    async getUserWishList({ userId }) {
        return await WishlistModel.findOne({ wish_list_userId: userId }).lean()
    }

    async deleteToWishListByUserId({userId }) {
        return await WishlistModel.deleteOne({ wish_list_userId: userId }).lean()
    }
}

module.exports = WishlistService