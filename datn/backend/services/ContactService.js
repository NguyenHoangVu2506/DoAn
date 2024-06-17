'use strict'
const { contact } = require('../models/ContactModel')
const { getSelectData } = require('../utils')

class ContactService {
    async createContact(payload) {
        const {
            contact_user_name,
            contact_user_email,
            contact_user_phone,
            contact_user_tilte,
            contact_user_detail

        } = payload

        const newContact = await contact.create({
            contact_user_name: contact_user_name,
            contact_user_email: contact_user_email,
            contact_user_phone: contact_user_phone,
            contact_user_tilte: contact_user_tilte,
            contact_user_detail: contact_user_detail

        })
        return newContact

    }

    async getListContact({ isDeleted = false }) {
        const listcontact = await contact.find({
            isDeleted
        }).lean()
        return listcontact
    }


    async getContactById({ isPublished = true, contact_id }) {
        const contact = await contact.findOne({
            isPublished,
            _id: contact_id
        }).lean()
        return contact
    }

    //  async updateContact({ contact_id, 
    //     contact_name,
    //     contact_title,
    //     contact_detail,
    //     contact_slug,
    //     contact_link,
    //     contact_type,
    //     contact_image,
    //     public_image_id, }) {
    //     try {
    //         const query = { _id: contact_id }
    //         const updates = {
    //             $set: {
    //                 contact_name: contact_name,
    //                 contact_title: contact_title,
    //                 contact_detail: contact_detail,
    //                 contact_slug: contact_slug,
    //                 contact_link: contact_link,
    //                 contact_type: contact_type,
    //                 contact_image: contact_image,
    //                 public_image_id: public_image_id,
    //             }
    //         }, options = {
    //             returnNewDocument: true,
    //             new: true
    //         }
    //         return await contact.findOneAndUpdate(query, updates, options)

    //     } catch (error) {
    //         console.log(`error`)

    //     }
    // }

    async pulishContact({ contact_id, isPublished = false }) {
        try {
            const query = {
                _id: contact_id,
                isPublished
            }, updateSet = {
                $set: {
                    isPublished: true
                },
            }, options = {
                upsert: true,
                new: true
            }
            return await contact.updateOne(query, updateSet, options)
        } catch (error) {
        }
    }

    async unpulishContact({ contact_id, isPublished = true }) {
        try {
            const query = {
                _id: contact_id,
                isPublished
            }, updateSet = {
                $set: {
                    isPublished: false
                },
            }, options = {
                upsert: true,
                new: true
            }
            return await contact.updateOne(query, updateSet, options)
        } catch (error) {
        }
    }

    async deleteContactById({ contact_id, isDeleted = false }) {
        try {
            const query = {
                _id: contact_id,
                isDeleted
            }, updateSet = {
                $set: {
                    isDeleted: true
                },
            }, options = {
                upsert: true,
                new: true
            }
            console.log(updateSet)
            return await contact.updateOne(query, updateSet, options)
        } catch (error) {
        }
    }

    async restoreContactById({ contact_id, isDeleted = true }) {
        try {
            const query = {
                _id: contact_id,
                isDeleted
            }, updateSet = {
                $set: {
                    isDeleted: false
                },
            }, options = {
                upsert: true,
                new: true
            }
            console.log(updateSet)
            return await contact.updateOne(query, updateSet, options)
        } catch (error) {

        }

    }

    async getDeleteContactList({ sort, isDeleted = true }) {
        try {
            const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
            const listcontact = await contact.find({
                isDeleted
            }).sort(sortBy)
                .lean()
            console.log("listcontact", listcontact)

            return listcontact
        } catch (error) {

        }
    }

    async removeContact({ contact_id }) {
        return await contact.deleteOne({ _id: contact_id }).lean()
    }
}
module.exports = new ContactService