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
}
module.exports = SliderService