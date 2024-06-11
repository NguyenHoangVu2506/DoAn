import { PostData } from "../../utils";
import { Action } from "../actions";

export const getListBrand= (data) => async (dispatch) => {

    try {
      const response = await PostData('/brand/getBrandList',data);
      console.log('response:', response)
      return dispatch({ type: Action.GET_BRAND_LIST, payload: response.data });
    } catch (err) {
      console.log(err)
      return err.response.data
    }
  
  };