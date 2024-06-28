// "use strict";

// const  AddressModel  = require('../AddressModel');
// const UserModel = require('../UserModel');

// class AddressRepository {

//     async createAddress({ user_id, phone_number, street, postalCode, city, country }) {

//         const query = { user_id: user_id }
//         const updateOrInsert = {
//             $addToSet: {
//                 phone_number: phone_number,
//                 street:street,
//                 postalCode:postalCode,
//                 city:city,
//                 country:country
//             }
//         }, options = {
//             upsert: true,
//             new: true
//         }
//         return await AddressModel.findOneAndUpdate(query, updateOrInsert, options)
//     }


// }

// module.exports = AddressRepository;