import { Action } from "../actions";
import { GetData, PostData } from "../../utils";

export const getSpecial= (data) => async (dispatch) => {
    try {
      const response = await PostData('/specialOffer/findAllSpecialOffer',data);
      console.log('response:', response)
      return dispatch({ type: Action.GET_SPECIAL,payload: response.data });
    } catch (err) {
      console.log(err)

    }
  
  };

  export const onCreateSpecialOffer = (data) => async (dispatch) => {
    try {
      const response = await PostData('/specialOffer',
        data
      );
      console.log('response:', response)
      return dispatch({ type: Action.ADD_SPECIAL, payload: response.data });
      
    } catch (err) {
      console.log(err)
      return err.response.data
    }
  
  };
  export const getSpecialById= (data) => async (dispatch) => {
    try {
      const response = await PostData('/specialOffer/getSpecialOfferById',data);
      console.log('response:', response)
      return dispatch({ type: Action.GET_SPECIAL_BY_ID,payload: response.data });
    } catch (err) {
      console.log(err)

    }
  
  };
