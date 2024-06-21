import { PostData } from "../../utils";
import { Action } from "../actions";

export const newContact= (data) => async (dispatch) => {

    try {
      const response = await PostData('/contact/newContact',data);
      console.log('response:', response)
      return dispatch({ type: Action.NEW_CONTACT, payload: response.data });
    } catch (err) {
      console.log(err)

    }
  
  };