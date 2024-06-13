import { Action } from ".";
import { PostData } from "../../utils";


export const getListSlider = (data) => async (dispatch) => {
  try {
    const response = await PostData('/slider/listSlider', data);
    console.log('response:', response)
    return dispatch({ type: Action.GET_SLIDER, payload: response.data });
  } catch (err) {
    console.log(err)
    return err.response.data
  }

};
export const getSliderById = (data) => async (dispatch) => {
  try {
    const response = await PostData('/slider/getSliderById', data);
    console.log('response:', response)
    return dispatch({ type: Action.GET_SLIDER_BY_ID, payload: response.data });
  } catch (err) {
    console.log(err)
    return err.response.data
  }

};

export const BannerStore = (data) => async (dispatch) => {

  try {
    const response = await PostData('/slider',
      data
    );
    console.log('response:', response)
    return dispatch({ type: Action.ADD_SLIDER, payload: response.data });

  } catch (err) {
    console.log(err)
    return err.response.data

  }

};

export const BannerUpdate = (data) => async (dispatch) => {

  try {
    const response = await PostData('/slider/updateSlider',
      data
    );
    console.log('response:', response)
    return dispatch({ type: Action.UPDATE_SLIDER, payload: response.data });

  } catch (err) {
    console.log(err)
    return err.response.data

  }

};

