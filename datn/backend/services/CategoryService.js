'use strict'
const { category } = require('../models/CategoryModel')
const { getSelectData } = require('../utils')

class CategoryService {
  static async createCategory(payload) {
    const {
      parent_id = null, category_name, category_description,
      category_icon = null, category_image = null, category_position= null
    } = payload

    const newCategory = await category.create({
      parent_id: parent_id,
      category_name: category_name,
      category_description: category_description,
      category_icon: category_icon,
      category_image: category_image,
      category_position: category_position
    })
    return newCategory
  }

  static async getListCategoryByParentId({ sort = 'ctime', parent_id = null, select = [] }) {
    const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
    const listcategory = await category.find({
      parent_id
    }).sort(sortBy)
      .select(getSelectData(select))
      .lean()
    return listcategory
  }

  static async findCategoryByIdList({ isPublished = true, category_id_list }) {
    try {
      const categories = await category.find({
        isPublished,
        _id: {
          $in: category_id_list
        }
      });
      console.log('findCategoryByIdList', categories)
      return categories;
    } catch (error) {
      console.log(error)
      return null
    }
  }
  static async findAllCategory({ isPublished = true }) {
    try {
      const categories = await category.find({
        isPublished
      });
      console.log('findAllCategories', categories)
      return categories;
    } catch (error) {
      console.log(error)
      return null
    }
  }

}
module.exports = CategoryService