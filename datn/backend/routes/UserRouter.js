'use strict';

const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserController');
const {asyncHandler} = require('../helpers/index');
const { authentication } = require('../auth/authUtils');
router.post('/getUser',asyncHandler(userController.getUser))
router.post('/getAllUser',asyncHandler(userController.getAllUser))
router.post('/updateUser',asyncHandler(userController.updateUser))
router.post('/pulishUser',asyncHandler(userController.pulishUser))
router.post('/unpulishUser',asyncHandler(userController.unpulishUser))


router.post('/address',asyncHandler(userController.insertAddress))
router.post('/get_address',asyncHandler(userController.getAddress))
router.post('/updateAddress',asyncHandler(userController.updateAddress))
router.post('/removeAddressByUser',asyncHandler(userController.removeAddressByUser))




router.get('/welcome', asyncHandler(userController.checkLoginEmailToken))
router.post('/signup', asyncHandler(userController.signUp))
router.post('/login', asyncHandler(userController.login))
///authentication
router.use(authentication)
router.post('/logout',asyncHandler(userController.logout))
router.post('/handlerRefreshToken', asyncHandler(userController.handlerRefreshToken))

module.exports = router