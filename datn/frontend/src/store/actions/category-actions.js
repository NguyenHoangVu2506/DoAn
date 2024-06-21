import { PostData } from "../../utils";
import { Action } from "../actions";


  export const getCategoryByParentId= (data) => async (dispatch) => {

    try {
      const response = await PostData('/category/listCatByParentId',data);
      console.log('response:', response)
      return dispatch({ type: Action.GET_CATEGORY_BY_PARENT_ID, payload: response.data });
    } catch (err) {
      console.log(err)
    }
  
  };


  export const AllCategory= (data) => async (dispatch) => {

    try {
      const response = await PostData('/category/findAllCategory',data);
      console.log('response:', response)
      return dispatch({ type: Action.ALL_CATEGORY, payload: response.data });
    } catch (err) {
      console.log(err)
    }
  
  };