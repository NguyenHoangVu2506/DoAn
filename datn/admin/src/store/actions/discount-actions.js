import { Action } from ".";
import { GetData, PostData } from "../../utils";

export const getDiscount= (data) => async (dispatch) => {
    try {
      const response = await GetData('/discount/all_code',data);
      console.log('response:', response)
      return dispatch({ type: Action.GET_DISCOUNT,payload: response.data });
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