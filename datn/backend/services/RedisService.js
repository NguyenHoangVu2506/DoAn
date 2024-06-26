'use strict'
const { resolve } = require('path')
const redis = require('redis')
const { promisify } = require('util')
const { reservationInventory } = require('../models/repositories/inventory.repo')
// const redisClient = redis.createClient()

// redisClient.ping((err, result)=>{
//     if(err){
//         console.error('error connect',err)
//     }else{
//         console.log(' connect')
//     }

// })

const { getRedis } = require('../config/redis')

const { instanceConnect: redisClient } = getRedis()

const pexpire = promisify(redisClient.pExpire).bind(redisClient)
const setnxAsync = promisify(redisClient.sEtnx).bind(redisClient)

const acquireLock = async (productId, quantity, cartId) => {

    const key = `lock_v_${productId}`
    const retryTimes = 10;
    const expireTime = 3000;
    for (let i = 0; i < retryTimes; i++) {
        const result = await setnxAsync(key, expireTime)
        console.log(`result`, result)
        if (result === 1) {
            //thao tac voi inventory
            const isReservation = await reservationInventory({
                productId, quantity, cartId
            })
            if (isReservation.modifiedCount) {
                await pexpire(key, expireTime)
                return key

            }
            return null;
        } else {
            await new Promise((resolve) => setTimeout(resolve, 50))
        }

    }

}

const releaseLock = async keyLock => {
    const delAsyncKey = promisify(redisClient.del).bind(redisClient)
    return await delAsyncKey
}
module.exports = {
    releaseLock,
    acquireLock
}



