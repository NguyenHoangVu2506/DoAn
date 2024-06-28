const redis = require('redis')


var client = {}, statusConnectRedis = {
    CONNECT: 'connect',
    END: 'end',
    RECONNECT: 'reconnect',
    ERROR: 'error'
}

const HandleEventConnection = ({
    CONNECT_REDIS
}) => {

    CONNECT_REDIS.on(statusConnectRedis.CONNECT, () => {
        console.log("connect redis")
    })
    CONNECT_REDIS.on(statusConnectRedis.END, () => {
        console.log("end")
    })
    CONNECT_REDIS.on(statusConnectRedis.RECONNECT, () => {
        console.log("reconnect")
    })
    CONNECT_REDIS.on(statusConnectRedis.ERROR, err => {
        console.log("error",err)
    })


}

const initRedis = () => {
    const instanceRedis = redis.createClient()
    console.log('hi',instanceRedis)
    client.instanceConnect = instanceRedis
    HandleEventConnection({
        CONNECT_REDIS: instanceRedis
    })
}

const getRedis = () => client

module.exports = {
    getRedis,
    initRedis
}
