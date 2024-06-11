'use strict'
const { SuccessResponse } = require("../core/success.response")
const BrandService = require("../services/BrandService")

class BrandController {
    createBrand = async (req, res, next) => {
        new SuccessResponse({
            message: ' create success',
            metaData: await BrandService.newBrand({ ...req.body })
        }).send(res)
    }

    updateBrand = async (req, res, next) => {
        new SuccessResponse({
            message: 'update success',
            metaData: await BrandService.updateBrand(req.body)
        }).send(res)
        console.log("updateBrand")
    }

    getListBrand = async (req, res, next) => {
        new SuccessResponse({
            message: 'get list brand success',
            metaData: await BrandService.getListBrand({ ...req.body })
        }).send(res)
    }


    getDeleteBrandList = async (req, res, next) => {
        new SuccessResponse({
            message: 'get delete list brand success',
            metaData: await BrandService.getDeleteBrandList({ ...req.body })
        }).send(res)
    }

    deleteBrandById = async (req, res, next) => {
        new SuccessResponse({
            message: 'delete brand success', //xoa tam
            metaData: await BrandService.deleteBrandById({ ...req.body })
        }).send(res)
    }

    restoreBrandById = async (req, res, next) => {
        new SuccessResponse({
            message: 'restore brand success',
            metaData: await BrandService.restoreBrandById(req.body)
        }).send(res)
    }

    publishBrand = async (req, res, next) => {
        new SuccessResponse({
            message: 'publish brand success',
            metaData: await BrandService.pulishBrand(req.body)
        }).send(res)
    }

    unpublishBrand = async (req, res, next) => {
        new SuccessResponse({
            message: 'unpublish brand success',
            metaData: await BrandService.unpulishBrand(req.body)
        }).send(res)
    }

    getBrand = async (req, res, next) => {
        new SuccessResponse({
            message: 'get brand success',
            metaData: await BrandService.getBrandById(req.body)
        }).send(res)
    }

    
    removeBrand = async (req, res, next) => {
        new SuccessResponse({
            message: 'remove brand success',
            metaData: await BrandService.removeBrand(req.body)
        }).send(res)
    }


}
module.exports = new BrandController;