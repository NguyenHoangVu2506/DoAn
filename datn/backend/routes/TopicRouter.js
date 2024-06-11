const express = require("express");
const router = express.Router();
const TopicController = require("../controllers/TopicController");
const { asyncHandler } = require("../helpers");

router.post('', asyncHandler(TopicController.createTopic))
router.post('/allTopic', asyncHandler(TopicController.getListTopic))
router.post('/listtopic', asyncHandler(TopicController.getListTopicByParentId))


module.exports = router