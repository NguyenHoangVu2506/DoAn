'use strict'
const { SuccessResponse } = require("../core/success.response")
const ContactService = require("../services/ContactService")

class ContactController {
    createContact = async (req, res, next) => {
        new SuccessResponse({
            message: ' create success',
            metaData: await ContactService.createContact({ ...req.body })
        }).send(res)
    }
    getListContact = async (req, res, next) => {
        new SuccessResponse({
            message: 'get list Contact success',
            metaData: await ContactService.getListContact({ ...req.body })
        }).send(res)
    }

    // updateContact = async (req, res, next) => {
    //     new SuccessResponse({
    //         message: 'updateContact success',
    //         metaData: await ContactService.(req.body)
    //     }).send(res)
    //     console.log("updateContact")
    // }
    getDeleteContactList = async (req, res, next) => {
        new SuccessResponse({
            message: 'get delete list Contact success',
            metaData: await ContactService.getDeleteContactList({ ...req.body })
        }).send(res)
    }
    deleteContactById = async (req, res, next) => {
        new SuccessResponse({
            message: 'delete Contact success', //xoa tam
            metaData: await ContactService.deleteContactById({ ...req.body })
        }).send(res)
    }
    restoreContactById = async (req, res, next) => {
        new SuccessResponse({
            message: 'restore Contact success',
            metaData: await ContactService.restoreContactById(req.body)
        }).send(res)
    }
    publishContact = async (req, res, next) => {
        new SuccessResponse({
            message: 'publish Contact success',
            metaData: await ContactService.pulishContact(req.body)
        }).send(res)
    }
    unpublishContact = async (req, res, next) => {
        new SuccessResponse({
            message: 'unpublish Contact success',
            metaData: await ContactService.unpulishContact(req.body)
        }).send(res)
    }
    getContact = async (req, res, next) => {
        new SuccessResponse({
            message: 'get Contact success',
            metaData: await ContactService.getContactById(req.body)
        }).send(res)
    }
    removeContact = async (req, res, next) => {
        new SuccessResponse({
            message: 'remove Contact success',
            metaData: await ContactService.removeContact(req.body)
        }).send(res)
    }
}
module.exports = new ContactController;