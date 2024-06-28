const express = require("express");
const router = express.Router();
const PageController = require("../controllers/PageController");
const { asyncHandler } = require("../helpers");

router.post('/newPage', asyncHandler(PageController.createPage))
router.post('/getListPage', asyncHandler(PageController.getListPage))

router.post('/updatePage', asyncHandler(PageController.updatePage))
router.post('/deletePageById', asyncHandler(PageController.deletePageById))
router.post('/restorePageById', asyncHandler(PageController.restorePageById))
router.post('/publishPage', asyncHandler(PageController.publishPage))
router.post('/unpublishPage', asyncHandler(PageController.unpublishPage))
router.post('/getPage', asyncHandler(PageController.getPage))
router.post('/getDeletePageList', asyncHandler(PageController.getDeletePageList))
router.post('/removePage', asyncHandler(PageController.removePage))




module.exports = router