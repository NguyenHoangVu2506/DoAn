'use strict'
const { convertToObjectMongoDb } = require('../../utils')
const {cart}= require('../CartModel')
const findCartById = async  (cartId)=>{
    console
    return await cart.findOne({_id: convertToObjectMongoDb(cartId), cart_state:'active'}).lean()

}
module.exports={
    findCartById
}