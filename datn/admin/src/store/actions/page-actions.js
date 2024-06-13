import { Action } from ".";
import { PostData } from "../../utils";

export const getListPage = (data) => async (dispatch) => {
  try {
    const response = await PostData('/page/getListPage', data);
    console.log('response:', response)
    return dispatch({ type: Action.GET_PAGE, payload: response.data });
  } catch (err) {
    console.log(err)
    return err.response.data
  }

};
export const getPageById = (data) => async (dispatch) => {
  try {
    const response = await PostData('/page/getPage', data);
    console.log('response:', response)
    return dispatch({ type: Action.GET_PAGE_BY_ID, payload: response.data });
  } catch (err) {
    console.log(err)
    return err.response.data
  }

};

export const PageStore = (data) => async (dispatch) => {

  try {
    const response = await PostData('/page/newPage', 
      data
    );
    console.log('response:', response)
    return dispatch({ type: Action.ADD_PAGE, payload: response.data });

  } catch (err) {
    console.log(err)
    return err.response.data

  }

};
export const PageUpdate = (data) => async (dispatch) => {

  try {
    const response = await PostData('/page/updatePage', 
      data
    );
    console.log('response:', response)
    return dispatch({ type: Action.UPDATE_PAGE, payload: response.data });

  } catch (err) {
    console.log(err)
    return err.response.data

  }

};