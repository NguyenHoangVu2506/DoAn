import { Action } from ".";
import { PostData } from "../../utils";

export const getInfo= (data) => async (dispatch) => {
    try {
      const response = await PostData('/info/getInfo',data);
      console.log('response:', response)
      return dispatch({ type: Action.GET_INFO,payload: response.data });
    } catch (err) {
      console.log(err)
      return err.response.data
    }
  
  };

  export const updateInfo= (data) => async (dispatch) => {
    try {
      const response = await PostData('/info/updateInfo', 
        data
      );
      console.log('response:', response)
      return dispatch({ type: Action.UPDATE_INFO, payload: response.data });
  
    } catch (err) {
      console.log(err)
      return err.response.data
  
    }
  };