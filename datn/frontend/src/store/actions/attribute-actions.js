import { PostData } from "../../utils";
import { Action } from "../actions";

export const getAllAttribute = (data) => async (dispatch) => {

    try {
      const response = await PostData('/attribute/getAllAttribute',data);
      console.log('response:', response)
      return dispatch({ type: Action.GET_ATTRIBUTE_LIST, payload: response.data });
    } catch (err) {
      console.log(err)
      return err.response.data
    }
  
  };

  export const getAttribute = (data) => async (dispatch) => {
    try {
      const response = await PostData('/attribute/get_Attribute',data);
      console.log('response:', response)
      return dispatch({ type: Action.GET_ATTRIBUTE, payload: response.data });
    } catch (err) {
      console.log(err)
      return err.response.data
    }
  
  };