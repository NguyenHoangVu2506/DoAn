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