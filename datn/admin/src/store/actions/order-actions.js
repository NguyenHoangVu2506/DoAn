import { Action } from "../actions";
import { GetData, PostData } from "../../utils";

export const getOrder= (data) => async (dispatch) => {
    try {
      const response = await GetData('/checkout/findAllOrder',data);
      console.log('response:', response)
      return dispatch({ type: Action.GET_ORDER,payload: response.data });
    } catch (err) {
      console.log(err)

    }
  
  };

