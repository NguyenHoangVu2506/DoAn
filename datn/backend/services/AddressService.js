"use strict";
const AddressModel = require('../models/AddressModel');

class AddressService {

    // constructor() {
    //     this.repository = new addressRepository();
    // }

    // async AddNewAddress(_id, userInputs) {

    //     const { street, postalCode, city, country, phone_number } = userInputs;

    //     const addressResult = await this.repository.CreateAddress({ _id, street, postalCode, city, country, phone_number })

    //     return FormateData(addressResult);
    // }

    async createAddress({ user_id, phone_number, street, postal_code, city, country,isDefault }) {

        return await AddressModel.create({
            user_id, phone_number, street, postal_code, city, country,isDefault
        })
    }

    static async getAddress({ user_id }) {
        const addressByUserId = await AddressModel.find({
            "user_id": user_id
        })
            .lean()
        return addressByUserId
    }



}

module.exports = new AddressService;