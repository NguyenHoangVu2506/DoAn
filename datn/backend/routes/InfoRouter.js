const express = require("express");
const router = express.Router();
const infoController = require("../controllers/InfoController");
const { asyncHandler } = require("../helpers");

router.post('', asyncHandler(infoController.createInfo))
router.post('/getInfo', asyncHandler(infoController.getInfo))
router.post('/getInfoByName', asyncHandler(infoController.getInfoByName))

router.post('/updateInfo', asyncHandler(infoController.updateInfo))
router.post('/deleteInfoById', asyncHandler(infoController.deleteInfoById))
router.post('/restoreInfoById', asyncHandler(infoController.restoreInfoById))
router.post('/pulishInfo', asyncHandler(infoController.pulishInfo))
router.post('/unpulishInfo', asyncHandler(infoController.unpulishInfo))
router.post('/getDeleteInfoList', asyncHandler(infoController.getDeleteInfoList))
router.post('/removeInfo', asyncHandler(infoController.removeInfo))



module.exports = router