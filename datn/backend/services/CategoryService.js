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

  static async getCategoryById({ category_id }) {
    try {
      const getcategory = await category.findOne({
        _id: category_id
      }).lean()
      return getcategory

    } catch (error) {

    }
  }

  static async updateCategory({ category_id, category_name,category_icon, category_description, category_image }) {
    try {
      const query = { _id: category_id }
      const updates = {
        $set: {
          category_id: category_id,
          category_name: category_name,
          category_icon:category_icon,
          category_description: category_description,
          category_image: category_image
        }
      }, options = {
        returnNewDocument: true, new:true
      }
      return await category.findOneAndUpdate(query, updates, options)

    } catch (error) {
      console.log(`error`)

    }
  }

  static async pulishCategory({ category_id, isPublished = false }) {
    try {
      const query = {
        _id: category_id,
        isPublished
      }, updateSet = {
        $set: {
          isPublished: true
        },
      }, options = {
        upsert: true,
        new:true
      }
      return await category.updateOne(query, updateSet, options)
    } catch (error) {
    }
  }

  static async unpulishCategory({ category_id, isPublished = true }) {
    try {
      const query = {
        _id: category_id,
        isPublished
      }, updateSet = {
        $set: {
          isPublished: false
        },
      }, options = {
        upsert: true,
        new:true
      }
      return await category.updateOne(query, updateSet, options)
    } catch (error) {
    }
  }

  static async deleteCategory({ category_id, isDeleted = false }) {
    try {
      const query = {
        _id: category_id,
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
      return await category.updateOne(query, updateSet, options)
    } catch (error) {
    }
  }

  static async restoreCategory({ category_id, isDeleted = true }) {
    try {
      const query = {
        _id: category_id,
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
      return await category.updateOne(query, updateSet, options)
    } catch (error) {

    }

  }

  static async getDeleteCategoryList ({ sort, isDeleted = true }){
    try {
        const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
        const listDelCategory = await category.find({
            isDeleted
        }).sort(sortBy)
            .lean()
        console.log("listDelCategory", listDelCategory)
        return listDelCategory
    } catch (error) {
    }
}

  static async removeCategory  ({ category_id })  {
    return await category.deleteOne({ _id: category_id }).lean()
}

}
module.exports = CategoryService