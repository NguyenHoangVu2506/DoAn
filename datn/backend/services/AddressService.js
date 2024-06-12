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

    async createAddress({ user_id, phone_number, street, postal_code, city, country }) {

        return await AddressModel.create({
            user_id, phone_number, street, postal_code, city, country
        })
    }

    async updateAddress({ address_id, phone_number, street, postal_code, city, country }) {
        try {
            const query = { _id : address_id }
            const updates = {
                $set: {
                    phone_number: phone_number,
                    street: street,
                    postal_code: postal_code,
                    city: city,
                    country: country
                }
            }, options = {
                returnNewDocument: true
            }
            console.log(query)
            return await AddressModel.findOneAndUpdate(query, updates, options)

        } catch (error) {
            console.log(`error`)

        }
    }
    async getAddress({ user_id }) {
        const addressByUserId = await AddressModel.find({
            "user_id": user_id
        })
            .lean()
        return addressByUserId
    }
}

module.exports = new AddressService;