'use strict'
const { menu } = require('../models/MenuModel')
const { getSelectData } = require('../utils')

class MenuService {
    static async createMenu(payload) {
        const {
            menu_name,
            parent_id,
            menu_link,
            menu_type,
            menu_slug,
            menu_position
        } = payload

        const newMenu = await menu.create({
            menu_name: menu_name,
            parent_id: parent_id,
            menu_link: menu_link,
            menu_type: menu_type,
            menu_slug: menu_slug,
            menu_position: menu_position,
        })
        return newMenu
    }

    static async getListMenu({ isPublished = true, select = [] }) {
        const allMenu = await menu.find({
            isPublished
        }).select(getSelectData(select))
            .lean()
        return allMenu
    }

    static async getListMenuByParentId({ sort = 'ctime', parent_id = null, select = [] }) {
        const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
        const listMenu = await menu.find({
            "parent_id": parent_id,

        }).sort(sortBy)
            .select(getSelectData(select))
            .lean()
        return listMenu
    }

    static async getMenuById({ menu_id }) {
        try {
            const listmenu = await menu.findOne({
                _id: menu_id
            }).lean()
            return listmenu

        } catch (error) {
        }
    }

    static async updateMenu({ menu_id, menu_name, parent_id, menu_link, menu_type, menu_position }) {
        try {
            const query = { _id: menu_id }
            const updates = {
                $set: {
                    menu_name: menu_name,
                    parent_id: parent_id,
                    menu_link: menu_link,
                    menu_type: menu_type,
                    menu_position: menu_position
                }
            }, options = {
                returnNewDocument: true

            }
            return await menu.findOneAndUpdate(query, updates, options)

        } catch (error) {
            console.log(`error`)
        }
    }

    static async pulishMenu({ menu_id, isPublished = false }) {
        try {
            const query = {
                _id: menu_id,
                isPublished
            }, updateSet = {
                $set: {
                    isPublished: true
                },
            }, options = {
                upsert: true
            }
            return await menu.updateOne(query, updateSet, options)
        } catch (error) {
        }
    }

    static async unpulishMenu({ menu_id, isPublished = true }) {
        try {
            const query = {
                _id: menu_id,
                isPublished
            }, updateSet = {
                $set: {
                    isPublished: false
                },
            }, options = {
                upsert: true
            }
            return await menu.updateOne(query, updateSet, options)
        } catch (error) {
        }
    }

    static async deleteMenuById({ menu_id, isDeleted = false }) {
        try {
            const query = {
                _id: menu_id,
                isDeleted
            }, updateSet = {
                $set: {
                    isDeleted: true
                },
            }, options = {
                upsert: true
            }
            console.log(updateSet)
            return await menu.updateOne(query, updateSet, options)
        } catch (error) {
        }
    }

    static async restoreMenuById({ menu_id, isDeleted = true }) {
        try {
            const query = {
                _id: menu_id,
                isDeleted
            }, updateSet = {
                $set: {
                    isDeleted: false
                },
            }, options = {
                upsert: true
            }
            console.log(updateSet)
            return await menu.updateOne(query, updateSet, options)
        } catch (error) {

        }
    }
    static async getDeleteMenuList({ sort, isDeleted = true }) {
        try {
            const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
            const listDelMenu = await menu.find({
                isDeleted
            }).sort(sortBy)
                .lean()
            console.log("listDelMenu", listDelMenu)
            return listDelMenu
        } catch (error) {
        }
    }
    
    static async removeMenu({ menu_id }) {
        return await menu.deleteOne({ _id: menu_id }).lean()
    }
}
module.exports = MenuService