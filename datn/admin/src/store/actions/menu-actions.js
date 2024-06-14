import { Action } from ".";
import { PostData } from "../../utils";

export const getListMenu = (data) => async (dispatch) => {
  try {
    const response = await PostData('/menu/getListMenu', data);
    console.log('response:', response)
    return dispatch({ type: Action.GET_MENU, payload: response.data });
  } catch (err) {
    console.log(err)
  }

};
export const getMenuById = (data) => async (dispatch) => {
  try {
    const response = await PostData('/menu/getMenu', data);
    console.log('response:', response)
    return dispatch({ type: Action.GET_MENU_BY_ID, payload: response.data });
  } catch (err) {
    console.log(err)
    return err.response.data
  }

};

export const MenuStore = (data) => async (dispatch) => {

  try {
    const response = await PostData('/menu/newMenu', 
      data
    );
    console.log('response:', response)
    return dispatch({ type: Action.ADD_MENU, payload: response.data });

  } catch (err) {
    console.log(err)
    return err.response.data

  }

};
export const MenuUpdate = (data) => async (dispatch) => {

  try {
    const response = await PostData('/menu/updateMenu', 
      data
    );
    console.log('response:', response)
    return dispatch({ type: Action.UPDATED_MENU, payload: response.data });

  } catch (err) {
    console.log(err)
    return err.response.data

  }

};