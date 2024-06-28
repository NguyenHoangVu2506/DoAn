"use strict"

const { convertToObjectMongoDb } = require('../../utils');
const  UserModel  = require('../UserModel')

//Dealing with data base operations
class UserRepository {

    async findByUserId (user_id)  {
        return await UserModel.findOne({ _id: convertToObjectMongoDb(user_id) }).lean();
    } 
    async findByEmail(user_email) {
        const existinguser = await UserModel.findOne( {user_email} ).lean()
        return existinguser;
    }

    // async findByEmail(user_email) {
    //     return await UserModel.findOne({ user_email }).lean()
    // }

    async finduserByIdAndProvider({ user_account_id, user_provider }) {
        const user = await UserModel.findOne({ user_account_id: user_account_id, user_provider: user_provider }).lean()
        return user
    }

    async createUser({ user_email, user_name, user_password }) {
        console.log(user_email, user_name, user_password)
        const user = await UserModel.create({
            user_email, user_name, user_password
        })
        console.log(user)
        return user
    }
    async createUserWithSocial({ user_account_id, user_provider, user_avatar, user_email, user_name }) {
        const user = await UserModel.create({
            user_account_id, user_provider, user_avatar, user_email, user_name
        })
        console.log(user)
        return user
    }

}

module.exports = UserRepository;