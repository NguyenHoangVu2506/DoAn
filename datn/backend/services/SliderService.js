'use strict'
const { slider } = require('../models/SliderModel')

class SliderService {
    static async createSlider(payload) {
        const {
            slider_name,
            slider_link = "",
            slider_image,
            slider_summary = "",
            slider_position,
            slider_is_active = false
        } = payload

        const newSlider = await slider.create({
            slider_name: slider_name,
            slider_link: slider_link,
            slider_image: slider_image,
            slider_summary: slider_summary,
            slider_position: slider_position,
            slider_is_active: slider_is_active
        })
        return newSlider
    }

    static async getListSlider({ slider_is_active = true, slider_position = "banner" }) {
        try {
            const listSlider = await slider.find({
                slider_is_active, slider_position
            }).lean()
            console.log(listSlider)
            return listSlider
        } catch (error) {
            console.log.error
            return null
        }

    }

    static async getSliderById({ slider_id }) {
        try {
            const slider = await slider.findOne({
                _id: slider_id
            }).lean()
            return slider
        } catch (error) {
        }
    }

    static async updateSlider({ slider_id, slider_link, slider_name, slider_summary, slider_image, slider_position, slider_is_active }) {
        try {
            const query = { _id: slider_id }
            const updates = {
                $set: {
                    slider_name: slider_name,
                    slider_link: slider_link,
                    slider_image: slider_image,
                    slider_summary: slider_summary,
                    slider_position: slider_position,
                    slider_is_active: slider_is_active
                }
            }, options = {
                returnNewDocument: true
            }
            return await slider.findOneAndUpdate(query, updates, options)

        } catch (error) {
            console.log(`error`)

        }
    }

    static async pulishSlider({ slider_id, isPublished = false }) {
        try {
            const query = {
                _id: slider_id,
                isPublished
            }, updateSet = {
                $set: {
                    isPublished: true
                },
            }, options = {
                upsert: true
            }
            return await slider.updateOne(query, updateSet, options)
        } catch (error) {
        }
    }

    static async unpulishSlider({ slider_id, isPublished = true }) {
        try {
            const query = {
                _id: slider_id,
                isPublished
            }, updateSet = {
                $set: {
                    isPublished: false
                },
            }, options = {
                upsert: true
            }
            return await slider.updateOne(query, updateSet, options)
        } catch (error) {
        }
    }

    static async deleteSliderById({ slider_id, isDeleted = false }) {
        try {
            const query = {
                _id: slider_id,
                isDeleted
            }, updateSet = {
                $set: {
                    isDeleted: true
                },
            }, options = {
                upsert: true
            }
            console.log(updateSet)
            return await slider.updateOne(query, updateSet, options)
        } catch (error) {
        }
    }

    static async restoreSliderById({ slider_id, isDeleted = true }) {
        try {
            const query = {
                _id: slider_id,
                isDeleted
            }, updateSet = {
                $set: {
                    isDeleted: false
                },
            }, options = {
                upsert: true
            }
            console.log(updateSet)
            return await slider.updateOne(query, updateSet, options)
        } catch (error) {

        }

    }

    static async getDeleteSliderList({ sort, isDeleted = true }) {
        try {
            const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
            const listDelSlider = await slider.find({
                isDeleted
            }).sort(sortBy)
                .lean()
            console.log("listDelSlider", listDelSlider)

            return listDelSlider
        } catch (error) {

        }
    }

    static async removeSlider({ slider_id }) {
        return await slider.deleteOne({ _id: slider_id }).lean()
    }
}
module.exports = SliderService