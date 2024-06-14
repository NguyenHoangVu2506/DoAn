import { Action } from "../actions";
import { PostData } from "../../utils";

export const getListBrand = (data) => async (dispatch) => {
  try {
    const response = await PostData('/brand/getBrandList', data);
    console.log('response:', response)
    return dispatch({ type: Action.GET_BRAND, payload: response.data });
  } catch (err) {
    console.log(err)
    return err.response.data
  }

};
export const BrandStore = (data) => async (dispatch) => {

  try {
    const response = await PostData('/brand', 
      data
    );
    console.log('response:', response)
    return dispatch({ type: Action.ADD_BRAND, payload: response.data });

  } catch (err) {
    console.log(err)
    return err.response.data

  }

};
export const getBrandById = (data) => async (dispatch) => {
  try {
    const response = await PostData('/brand/getBrand', data);
    console.log('response:', response)
    return dispatch({ type: Action.GET_BRAND_BY_ID, payload: response.data });
  } catch (err) {
    console.log(err)
    return err.response.data
  }

};
export const BrandUpdate = (data) => async (dispatch) => {

  try {
    const response = await PostData('/brand/update',
      data
    );
    console.log('response:', response)
    return dispatch({ type: Action.UPDATE_BRAND, payload: response.data });

  } catch (err) {
    console.log(err)
    return err.response.data
  }
};