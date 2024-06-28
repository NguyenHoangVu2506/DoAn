const express = require("express");
const router = express.Router();
const ContactController = require("../controllers/ContactController");
const { asyncHandler } = require("../helpers");

router.post('/newContact', asyncHandler(ContactController.createContact))
router.post('/getContactList', asyncHandler(ContactController.getListContact))

// router.post('/update', asyncHandler(ContactController.updateContact))
router.post('/deleteContact', asyncHandler(ContactController.deleteContactById))
router.post('/restoreContact', asyncHandler(ContactController.restoreContactById))
router.post('/publishContact', asyncHandler(ContactController.publishContact))
router.post('/unpublishContact', asyncHandler(ContactController.unpublishContact))
router.post('/getContact', asyncHandler(ContactController.getContact))
router.post('/getDeleteContactList', asyncHandler(ContactController.getDeleteContactList))
router.post('/removeContact', asyncHandler(ContactController.removeContact))




module.exports = router