'use strict'
const { page } = require('../models/PagesModel')
const { getSelectData } = require('../utils')

class PageService {
    static async createPage(payload) {
        const {
            page_name,
            page_title,
            page_detail,
            page_slug,
            page_link = null,
            page_type,
            page_image = null,
            public_image_id = null,

        } = payload

        const newTopic = await page.create({
            page_name: page_name,
            page_title: page_title,
            page_detail: page_detail,
            page_slug: page_slug,
            page_link: page_link,
            page_type: page_type,
            page_image: page_image,
            public_image_id: public_image_id,
        })
        return newTopic

    }

    static async getListPage({ isDeleted = false }) {
        const listPage = await page.find({
            isDeleted
        }).lean()
        return listPage
    }


    static async getPageById({ isPublished = true, page_id }) {
        const Page = await page.findOne({
            isPublished,
            _id: page_id
        }).lean()
        return Page
    }

    static async updatePage({ page_id, page_name,
        page_title,
        page_detail,
        page_slug,
        page_link,
        page_type,
        page_image,
        public_image_id, }) {
        try {
            const query = { _id: page_id }
            const updates = {
                $set: {
                    page_name: page_name,
                    page_title: page_title,
                    page_detail: page_detail,
                    page_slug: page_slug,
                    page_link: page_link,
                    page_type: page_type,
                    page_image: page_image,
                    public_image_id: public_image_id,
                }
            }, options = {
                returnNewDocument: true,
                new:true
            }
            return await page.findOneAndUpdate(query, updates, options)

        } catch (error) {
            console.log(`error`)

        }
    }

    static async pulishPage({ page_id, isPublished = false }) {
        try {
            const query = {
                _id: page_id,
                isPublished
            }, updateSet = {
                $set: {
                    isPublished: true
                },
            }, options = {
                upsert: true,
                new:true
            }
            return await page.updateOne(query, updateSet, options)
        } catch (error) {
        }
    }

    static async unpulishPage({ page_id, isPublished = true }) {
        try {
            const query = {
                _id: page_id,
                isPublished
            }, updateSet = {
                $set: {
                    isPublished: false
                },
            }, options = {
                upsert: true,
                new:true
            }
            return await page.updateOne(query, updateSet, options)
        } catch (error) {
        }
    }

    static async deletePageById({ page_id, isDeleted = false }) {
        try {
            const query = {
                _id: page_id,
                isDeleted
            }, updateSet = {
                $set: {
                    isDeleted: true
                },
            }, options = {
                upsert: true,
                new:true
            }
            console.log(updateSet)
            return await page.updateOne(query, updateSet, options)
        } catch (error) {
        }
    }

    static async restorePageById({ page_id, isDeleted = true }) {
        try {
            const query = {
                _id: page_id,
                isDeleted
            }, updateSet = {
                $set: {
                    isDeleted: false
                },
            }, options = {
                upsert: true,
                new:true
            }
            console.log(updateSet)
            return await page.updateOne(query, updateSet, options)
        } catch (error) {

        }

    }

    static async getDeletePageList({ sort, isDeleted = true }) {
        try {
            const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
            const listPage = await page.find({
                isDeleted
            }).sort(sortBy)
                .lean()
            console.log("listPage", listPage)

            return listPage
        } catch (error) {

        }
    }

    static async removePage({ page_id }) {
        return await page.deleteOne({ _id: page_id }).lean()
    }
}
module.exports = PageService