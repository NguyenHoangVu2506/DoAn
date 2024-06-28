import { Action } from ".";
import { DeleteData, GetData, PostData } from "../../utils";

export const addCommnetByProduct = (data) => async (dispatch) => {
  try {
    const response = await PostData('/comment/create', data);
    console.log('response:', response)
    return dispatch({ type: Action.ADD_COMMENT_RATING, payload: response.data });
  } catch (err) {
    console.log(err)
    // return err.response.data
  }

};

export const getComment = (data) => async (dispatch) => {
  try {
    const response = await PostData('/comment/get', data);
    console.log('response:', response)
    return dispatch({ type: Action.GET_COMMENT_BY_PRODUCT, payload: response.data });
  } catch (err) {
    console.log(err)
    // return err.response.data
  }

};

// export const removeFromWishList = (data) => async (dispatch) => {
//   try {
//     const response = await PostData('/wish_list/deleteToWishListItem', data);

//     console.log('response:', response)

//     return dispatch({ type: Action.REMOVE_FROM_WISH_LIST, payload: response.data });
//     // dispatch(getWishList({ sort: 'ctime' }));

//   } catch (err) {
//     console.log(err)
//     // return err.response.data
//   }

// };