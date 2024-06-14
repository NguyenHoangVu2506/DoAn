import { Action } from ".";
import { GetData, PostData } from "../../utils";

export const getSpecial= (data) => async (dispatch) => {
    try {
      const response = await PostData('/discount/all_code',data);
      console.log('response:', response)
      return dispatch({ type: Action.GET_SPECIAL,payload: response.data });
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