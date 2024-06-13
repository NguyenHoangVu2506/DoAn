
"use strict";
const UserService = require('../services/UserService');
const successResponse = require('../core/success.response');
const AddressService = require('../services/AddressService');
class UserController {
    constructor() {
        this.service = new UserService();
    
    }
    signUp = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "created success",
            metaData: await this.service.signUp(req.body)
        }).send(res)
    }

    login = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "login success",
            metaData: await this.service.login(req.body)
        }).send(res)
    }

    logout = async (req, res, next) => {
        console.log("req.keyStore:", req.keyStore)
        return new successResponse.SuccessResponse({
            message: "logout success",
            metaData: await this.service.logout(req.keyStore)
        }).send(res)
    }

    insertAddress = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "insert success",
            metaData: await this.service.insertAddress(req.body)
        }).send(res)
    }

    updateAddress = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "updateAddress success",
            metaData: await this.service.updateAddress(req.body)
        }).send(res)
    }

    getAddress = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "getAddress success",
            metaData: await this.service.getAddress(req.body)
        }).send(res)
    }

    getUser = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "getUser success",
            metaData: await this.service.getUser(req.body)
        }).send(res)
    }

    removeAddressByUser = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "remove Address By User success",
            metaData: await this.service.removeAddressByUser(req.body)
        }).send(res)
    }


    
    handlerRefreshToken = async (req, res, next) => {
        console.log("req.body.refreshToken:", req.body.refreshToken)
        return new successResponse.SuccessResponse({
            message: "get token success",
            metaData: await this.service.handlerRefreshToken(req.body.refreshToken)
        }).send(res)
    }
    checkLoginEmailToken = async (req, res, next) => {
        const { token = null } = req.query

        return new successResponse.SuccessResponse({
            message: "checkLoginEmailTokenService",
            metaData: await this.service.checkLoginEmailTokenService({ token })
        }).send(res)
    }


}

module.exports = new UserController