const express = require("express");
const router = express.Router();
const UploadController = require("../controllers/UploadController");
const { uploadDisk } = require("../config/multiple");

router.post('/uploadImageArray', uploadDisk.array('files',10), UploadController.uploadImageArray)
router.post('/uploadImageSingle', uploadDisk.single('file'), UploadController.uploadImageSingle)

module.exports = router