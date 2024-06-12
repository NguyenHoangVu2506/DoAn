const express = require("express");
const router = express.Router();
const menuController = require("../controllers/MenuController");
const { asyncHandler } = require("../helpers");

router.post('/newMenu', asyncHandler(menuController.createMenu))
router.post('/getMenu', asyncHandler(menuController.getMenu))
router.post('/getListMenu', asyncHandler(menuController.getListMenu))


router.post('/updateMenu', asyncHandler(menuController.updateMenu))
router.post('/deleteMenuById', asyncHandler(menuController.deleteMenuById))
router.post('/restoreMenuById', asyncHandler(menuController.restoreMenuById))
router.post('/publishMenu', asyncHandler(menuController.publishMenu))
router.post('/unpublishMenu', asyncHandler(menuController.unpublishMenu))
router.post('/getDeleteMenuList', asyncHandler(menuController.getDeleteMenuList))
router.post('/removeMenu', asyncHandler(menuController.removeMenu))

module.exports = router