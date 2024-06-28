import { Action } from "../actions";
import { GetData, PostData } from "../../utils";

export const getSpecial= (data) => async (dispatch) => {
    try {
      const response = await PostData('/specialOffer/findSpecialOfferBetweenStartDateAndEndByDate',data);
      console.log('response:', response)
      return dispatch({ type: Action.GET_SPECIAL,payload: response.data });
    } catch (err) {
      console.log(err)

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

  
    }
  };