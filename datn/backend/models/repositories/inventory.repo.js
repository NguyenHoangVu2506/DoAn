'use strict'
const { convertToObjectMongoDb } = require('../../utils')
 const {inventory} =require('../InventoryModel')

 const {Types} = require('mongoose')

 const insertInventory =async({
    productId,stock,location='unKnow'
 })=>{
    return await inventory.create({
        inven_productId:productId,
        inven_stock:stock,
        inven_location:location,
    })

 }

 const reservationInventory = async({productId, quantity, cartId, })=>{
   const query={
      inven_productId: convertToObjectMongoDb(productId),
      inven_stock:{$gte:quantity}                        
   }, updateSet={
      $inc:{
         inven_stock: -quantity
      },
      $push:{
         inven_reservations:{
            quantity,
            cartId,
            createOn: new Date()
         }
      }
   },options={upsert:true, new: true}

   return await inventory.updateOne(query, updateSet)

 }
 module.exports={
    insertInventory,reservationInventory
 }