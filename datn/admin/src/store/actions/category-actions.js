import { PostData } from "../../utils";
import { Action } from "../actions";

export const getCategory = (data) => async (dispatch) => {
  try {
    const response = await PostData('/category/findAllCategory', data);
    console.log('response:', response)
    return dispatch({ type: Action.GET_CATEGORY, payload: response.data });
  } catch (err) {
    console.log(err)
    return err.response.data
  }

};
export const getCategoryByParentId = (data) => async (dispatch) => {

  try {
    const response = await PostData('/category/listcategory', data);
    console.log('response:', response)
    return dispatch({ type: Action.GET_CATEGORY_BY_PARENT_ID, payload: response.data });
  } catch (err) {
    console.log(err)
    return err.response.data
  }

};

export const getChildCategoryByParentId = (data) => async (dispatch) => {

  try {
    const response = await PostData('/category/listcategory', data);
    console.log('response:', response)
    return dispatch({ type: Action.GET_CHILD_CATEGORY_BY_PARENT_ID, payload: response.data });
  } catch (err) {
    console.log(err)
    return err.response.data
  }

};
export const CategoryStore = (data) => async (dispatch) => {

  try {
    const response = await PostData('/category', 
      data
    );
    console.log('response:', response)
    return dispatch({ type: Action.ADD_CATEGORY, payload: response.data });

  } catch (err) {
    console.log(err)
    return err.response.data

  }

};