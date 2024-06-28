import { PostData } from "../../utils";
import { Action } from "../actions";

export const getListMenu= (data) => async (dispatch) => {

    try {
      const response = await PostData('/menu/getListMenu',data);
      console.log('response:', response)
      return dispatch({ type: Action.GET_ALL_MENU, payload: response.data });
    } catch (err) {
      console.log(err)

    }
  
  };