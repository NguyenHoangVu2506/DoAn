'use strict'

const { Types } = require("mongoose")
const KeyTokenModel  = require("../models/KeyTokenModel")

class KeyTokenService {

    createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
        try {
            const filter = { user: userId },
                update = { publicKey, privateKey, refreshTokensUsed: [], refreshToken },
                options = { upsert: true, new: true }
            const tokens = await KeyTokenModel.findOneAndUpdate(filter, update, options).lean()

            return tokens ? tokens.publicKey : null

        } catch (error) {
            throw error
        }
    }

    findByUserId = async (userId) => {
        return await KeyTokenModel.findOne({ user: new Types.ObjectId(userId) }).lean()
    }
    removeKeyById = async (id) => {
        return await KeyTokenModel.deleteOne({ _id: id }).lean();
    }

    findByRefreshTokenUsed = async ( refreshToken ) => {
        return await KeyTokenModel.findOne({ refreshTokensUsed: refreshToken}).lean()
    }

    findByRefreshToken = async (refreshToken) => {
        return await KeyTokenModel.findOne({ refreshToken })
    }
    deleteKeyById = async (userId) => {
        return await KeyTokenModel.deleteOne({ user: new Types.ObjectId(userId) }).lean()
    }

}
module.exports = new KeyTokenService