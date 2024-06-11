'use strict'
const _ = require('lodash')
const jwt = require("jsonwebtoken")
const { Types } = require('mongoose')
const bcrypt = require('bcrypt')
const convertToObjectMongoDb = (id) => {
    return new Types.ObjectId(id)
}

const getInfoData = ({ fileds = [], object = {} }) => {
    return _.pick(object, fileds)
}

//('a','b')=(a:1,b:1)
const getSelectData = (select = []) => {
    return Object.fromEntries(select.map(el => [el, 1]))
}

//('a','b')=(a:0,b:0)
const unGetSelectData = (select = []) => {
    return Object.fromEntries(select.map(el => [el, 0]))
}

const removeUndefindObject = obj => {
    Object.keys(obj).forEach(k => {
        if (obj[k] == null) {
            delete obj[k];
        }
    })
    return obj
}

const updateNestedObjectParser = obj => {
    console.log(`1;;`, obj)
    const final = {}
    Object.keys(obj).forEach(k => {
        console.log(`3`, k)
        if (typeof obj[k] === 'object' && !Array.isArray(obj[k])) {
            const response = updateNestedObjectParser(obj[k])
            Object.keys(response).forEach(a => {
                final[`${k}.${a}`] = response[a]
            })
        }
        else {
            final[k] = obj[k]
        }
    })
    return final
}

const randomProductId = _ => {
    return Math.floor(Math.random() * 899999 + 100000)
}


const GenerateSignature = async (payload, publicKey, privateKey) => {
    try {
        const accessToken = await jwt.sign(payload, publicKey, {
            expiresIn: "2d"
        })
        const refreshToken = await jwt.sign(payload, privateKey, {
            expiresIn: "7d"
        })
        jwt.verify(accessToken, publicKey, (err, decode) => {
            if (err) {
                console.log("err verify:  ", err)
            } else {
                console.log("decode:  ", decode)
            }
        })

        return { accessToken, refreshToken }
    } catch (error) {
        console.log(error);
        return error;
    }
}
const GeneratePassword = async (password, salt) => {
    return await bcrypt.hash(password, salt);
}
const createToken = async (payload, publicKey, privateKey) => {
    try {
        const accessToken = await jwt.sign(payload, publicKey, {
            expiresIn: "2d"
        })
        const refreshToken = await jwt.sign(payload, privateKey, {
            expiresIn: "7d"
        })
        jwt.verify(accessToken, publicKey, (err, decode) => {
            if (err) {
                console.log("err verify:  ", err)
            } else {
                console.log("decode:  ", decode)
            }
        })

        return { accessToken, refreshToken }
    } catch (error) {
        console.log(error);
        return error;
    }
}

const replacePlaceholder = (template, params) => {
    Object.keys(params).forEach(k => {
        const placeholder = `{{${k}}}` ///{{verify key}}
        template = template.replace(new RegExp(placeholder, 'g'), params[k])
    })
    return template
}

module.exports = {
    getInfoData, getSelectData,
    unGetSelectData,
    removeUndefindObject,
    updateNestedObjectParser,
    convertToObjectMongoDb,
    randomProductId,
    GeneratePassword,
    createToken, replacePlaceholder, GenerateSignature

}