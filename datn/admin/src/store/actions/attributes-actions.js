import { Action } from "../actions";
import { GetData, PostData } from "../../utils";

export const getAttribute= (data) => async (dispatch) => {
    try {
      const response = await PostData('/attribute/getAllAttribute',data);
      console.log('response:', response)
      return dispatch({ type: Action.GET_ATTRIBUTES,payload: response.data });
    } catch (err) {
      console.log(err)

    }
  
  };

  export const updateInfo= (data) => async (dispatch) => {
    try {
      const response = await PostData('/info/updateInfo', 
        data
      );
      // console.log('response:', response)
      return dispatch({ type: Action.UPDATE_INFO, payload: response.data });
  
    } catch (err) {
      console.log(err)
      return err.response.data
    }
  };