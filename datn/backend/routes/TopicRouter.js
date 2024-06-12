const express = require("express");
const router = express.Router();
const TopicController = require("../controllers/TopicController");
const { asyncHandler } = require("../helpers");

router.post('', asyncHandler(TopicController.createTopic))
router.post('/allTopic', asyncHandler(TopicController.getListTopic))
router.post('/listtopic', asyncHandler(TopicController.getListTopicByParentId))
router.post('/findTopicById', asyncHandler(TopicController.findTopicById))

router.post('/updateTopic', asyncHandler(TopicController.updateTopic))
router.post('/deleteTopicById', asyncHandler(TopicController.deleteTopicById))
router.post('/restoreTopicById', asyncHandler(TopicController.restoreTopicById))
router.post('/pulishTopic', asyncHandler(TopicController.pulishTopic))
router.post('/unpulishTopic', asyncHandler(TopicController.unpulishTopic))
router.post('/getDeleteTopicList', asyncHandler(TopicController.getDeleteTopicList))
router.post('/removeTopic', asyncHandler(TopicController.removeTopic))


module.exports = router