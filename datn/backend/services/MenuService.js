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

    static async getListMenu({ isPublished = true, select=[] }) {
        const allMenu = await menu.find({
            isPublished
        }).select(getSelectData(select))
            .lean()
        return allMenu
    }
    
    static async getListMenuByParentId({ sort='ctime', parent_id=null, select=[] }) {
        const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
        const listMenu = await menu.find({
            "parent_id": parent_id,

        }).sort(sortBy)
            .select(getSelectData(select))
            .lean()
        return listMenu
    }



}
module.exports = MenuService