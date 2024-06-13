"use strict"

const errorResponse = require('../core/error.response')
const bcrypt = require('bcrypt')
const userRepository = require('../models/repositories/user.repo')
const { GeneratePassword, createToken, getInfoData, GenerateSignature } = require('../utils');
const crypto = require('crypto');
const keyTokenService = require('./KeyTokenService');
const { sendEmailToken } = require('./EmailService');
const UserModel = require('../models/UserModel');
const { checkEmailToken, newOtp } = require('./OtpService');
const jwt = require("jsonwebtoken");
const AddressService = require('./AddressService');
const AddressModel = require('../models/AddressModel');


class UserService {
    constructor() {
        this.repository = new userRepository();
    }
    async login({ user_email, user_password, refreshToken = null }) {
        const foundUser = await this.repository.findByEmail(user_email)
        if (!foundUser) {
            throw new errorResponse.ForbiddenRequestError("auth err")
        }

        const match = bcrypt.compare(user_password, foundUser.user_password)
        if (!match) {
            throw new errorResponse.ForbiddenRequestError("auth err not math")
        }
        const publicKey = await crypto.randomBytes(64).toString('hex')
        const privateKey = await crypto.randomBytes(64).toString('hex')

        const tokens = await createToken({ userId: foundUser._id, user_email }, publicKey, privateKey)
        await keyTokenService.createKeyToken({ userId: foundUser._id, refreshToken: tokens.refreshToken, publicKey, privateKey })
        const user = await getInfoData({ fileds: ['_id', 'user_name', 'user_email', 'user_phone', 'user_sex', 'user_avatar', 'user_date_of_birth', 'user_provider'], object: foundUser })
        return {
            user,
            tokens
        }
    }

    async signUp({ user_email, user_name, user_password, captcha = null }) {

        const hodeluser = await this.repository.findByEmail(user_email)
        if (hodeluser) {
            return {
                code: 201,
                message: "user already registered"
            }
        }
        const token = await newOtp({ user_email: user_email, user_name: user_name, user_password: user_password })
        const result = await sendEmailToken({ user_email: user_email, token })

        return { token: result }
    }

    async logout(keyStore) {
        console.log("keyStore_id", keyStore._id)
        const delKey = await keyTokenService.removeKeyById(keyStore._id)
        return {
            code: 201,
            message: "user already logout",
            metaData: delKey
        }
    }

    async insertAddress({ user_id, phone_number, street, postal_code, city, country }) {
        const foundUser = await this.repository.findByUserId(user_id)
        if (!foundUser) {
            throw new errorResponse.ForbiddenRequestError("auth err")
        }
        const createAddress = await AddressService.createAddress(
            {
                user_id: foundUser._id,
                phone_number: phone_number,
                street: street,
                postal_code: postal_code,
                city: city,
                country: country,
            })
        return createAddress
    }

    async updateAddress({ user_id, address_id, phone_number, street, postal_code, city, country }) {
        const foundUser = await this.repository.findByUserId(user_id)
        if (!foundUser) {
            throw new errorResponse.ForbiddenRequestError("auth err")
        }
        const updateAddress = await AddressService.updateAddress(
            {
                address_id: address_id,
                phone_number: phone_number,
                street: street,
                postal_code: postal_code, city: city, country: country
            })
        console.log(updateAddress)
        return updateAddress
    }


    async getAddress({ user_id }) {
        const addressByUserId = await AddressModel.find({
            "user_id": user_id
        })
            .lean()
        return addressByUserId
    }

    async getUser({ user_id }) {
        const getUser = await this.repository.findByUserId(user_id)
        return getUser
    }

    async getAllUser({ isPublished=true }) {
        const alluser = await UserModel.find({ isPublished }).lean()
        return alluser

    }

    async removeAddressByUser({ user_id , address_id}) {
        const foundUser = await this.repository.findByUserId(user_id)
        if (!foundUser) {
            throw new errorResponse.ForbiddenRequestError("auth err")
        }
        const remove_addressByUserId = await AddressModel.deleteOne({
            _id: address_id
        })
            .lean()
        return remove_addressByUserId
    }

    



    async checkLoginEmailTokenService({ token }) {
        try {

            const { otp_email: email, otp_token, otp_key } = await checkEmailToken({ token })
            const userInfo = await jwt.verify(otp_token, otp_key)
            console.log('userInfo', userInfo)
            const { user_email, user_name, user_password } = userInfo
            if (!email || (email !== user_email)) throw new errorResponse.ErrorResponse({ message: "token not found" })

            const hasuser = await this.finduserByEmail({ user_email: email })
            if (hasuser) throw new errorResponse.ErrorResponse({ message: "email already exists" })
            console.log('hasuser', hasuser)

            const passwordHash = await GeneratePassword(user_password, 10)
            console.log('passwordHash', passwordHash)
            const newuser = await this.repository.createUser({ user_email: email, user_name: user_name, user_password: passwordHash })

            if (newuser) {
                const publicKey = await crypto.randomBytes(64).toString('hex')
                const privateKey = await crypto.randomBytes(64).toString('hex')

                const keyStore = await keyTokenService.createKeyToken({ userId: newuser._id, publicKey, privateKey })
                if (!keyStore) {
                    return { code: 403, message: "sign: err keys " }
                }
                //create tokenpair
                const tokens = await createToken({ userId: newuser._id, user_email: email }, publicKey, privateKey)
                const user = await getInfoData({ fileds: ['_id', 'user_name', 'user_email'], object: newuser })

                console.log("tokens:;;", tokens)
                return {
                    message: "Success created user",
                    user,
                    tokens
                }
            }

        } catch (error) {
            return error
        }

    }

    async loginWithSocial({ user_account_id, user_provider, refreshToken = null }) {
        try {
            const foundUser = await this.finduserByIdAndProvider({ user_account_id, user_provider })
            if (!foundUser) {
                throw new errorResponse.ForbiddenRequestError("auth err")
            }
            const publicKey = await crypto.randomBytes(64).toString('hex')
            const privateKey = await crypto.randomBytes(64).toString('hex')

            const tokens = await GenerateSignature({ userId: foundUser._id, user_provider }, publicKey, privateKey)
            await keyTokenService.createKeyToken({ userId: foundUser._id, refreshToken: tokens.refreshToken, publicKey, privateKey })
            const user = await getInfoData({ fileds: ['_id', 'user_name', 'user_email', 'user_phone', 'user_sex', 'user_avatar', 'user_date_of_birth', 'user_provider'], object: foundUser })
            return {
                user,
                tokens
            }
        } catch (error) {
            return null
        }
    }

    async newCustomerWithSocial({ user_account_id, user_provider, user_email = '', user_name, user_avatar = '' }) {
        const hasCustomer = await this.finduserByEmail({ user_email })
        if (hasCustomer) return null

        const newCustomer = await this.repository.createUserWithSocial({ user_account_id, user_provider, user_avatar, user_email, user_name })

        if (!newCustomer) {
            return null
        }
        return await getInfoData({ fileds: ['_id', 'user_name', 'user_email'], object: newCustomer })

    }


    async finduserByEmail({ user_email }) {

        const user = await UserModel.findOne({ user_email }).lean()
        return user
    }
    async finduserByIdAndProvider({ user_account_id, user_provider }) {
        return await this.repository.finduserByIdAndProvider({ user_account_id, user_provider })
    }

    async handlerRefreshToken(refreshToken) {
        const foundToken = await keyTokenService.findByRefreshTokenUsed(refreshToken)
        if (foundToken) {
            console.log({ foundToken })
            const { userId, user_email } = await verifyJWT(refreshToken, foundToken.privateKey)
            console.log({ userId, user_email })
            await keyTokenService.deleteKeyById(userId)
            throw new errorResponse.ForbiddenRequestError("Something wrong happen")
        }

        const holderToken = await keyTokenService.findByRefreshToken(refreshToken)
        if (!holderToken) throw new errorResponse.ForbiddenRequestError("user not registered")
        const { userId, user_email } = await verifyJWT(refreshToken, holderToken.privateKey)

        const founduser = await this.repository.findByEmail(user_email)
        if (!founduser) throw new errorResponse.ForbiddenRequestError("user not registered 2")
        const tokens = await GenerateSignature({ userId, user_email }, holderToken.publicKey, holderToken.privateKey)


        await holderToken.update({
            $set: {
                refreshToken: tokens.refreshToken
            },
            $addToSet: {
                refreshTokensUsed: refreshToken
            }
        })
        return {
            user: { userId, user_email },
            tokens
        }
    }



}

module.exports = UserService