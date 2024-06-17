import { Action } from ".";
import { DeleteData, GetData, PostData } from "../../utils";

export const addProWishList = (data) => async (dispatch) => {
  try {
    const response = await PostData('/wish_list/addProduct', data);
    console.log('response:', response)
    return dispatch({ type: Action.ADD_WISHLIST, payload: response.data });
  } catch (err) {
    console.log(err)
    // return err.response.data
  }

};

export const getWishList = (data) => async (dispatch) => {
  try {
    const response = await PostData('/wish_list/getUserWishList', data);
    console.log('response:', response)
    return dispatch({ type: Action.GET_WISHLIST, payload: response.data });
  } catch (err) {
    console.log(err)
    // return err.response.data
  }

};

export const removeFromWishList = (data) => async (dispatch) => {
  try {
    const response = await DeleteData('/wish_list/deleteToWishListItem',data);
    console.log('response:', data)
    console.log('response:', response)

    return dispatch({ type: Action.DELETE_WISH_LIST, payload: response.data });
    // dispatch(getWishList({ sort: 'ctime' }));

  } catch (err) {
    console.log(err)
    // return err.response.data
  }

};