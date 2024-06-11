'use strict';

const express = require('express')
const router = express.Router()

// const { authentication } = require('../auth/authUtils');
const WishlistController = require('../controllers/WishlistController');
const  {asyncHandler}  = require('../helpers');

// router.use(authentication)

router.post('/addProduct', asyncHandler(WishlistController.addToWishList))
router.post('/getUserWishList', asyncHandler(WishlistController.getUserWishList))
router.delete('/deleteToWishListItem', asyncHandler(WishlistController.deleteToWishListItem))
router.delete('/deleteToWishListByUserId', asyncHandler(WishlistController.deleteToWishListByUserId))

module.exports = router