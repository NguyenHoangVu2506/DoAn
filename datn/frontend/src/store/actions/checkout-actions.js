import { PostData } from "../../utils";
import { Action } from "../actions";

export const checkoutReview = (data) => async (dispatch) => {
    try {
        const response = await PostData('/checkout/review', data);
        console.log('response:', response)
        return dispatch({ type: Action.CHECKOUT_REVIEW, payload: response.data });
    } catch (err) {
        console.log(err)
    }
};

export const newOrder = (data) => async (dispatch) => {
    try {
        const response = await PostData('/checkout/order', data);
        console.log('response:', response)
        return dispatch({ type: Action.NEW_ORDER, payload: response.data });
    } catch (err) {
        console.log(err)
    }
};

export const getOrderByUser = (data) => async (dispatch) => {
    try {
        const response = await PostData('/checkout/findOrderByUser', data);
        console.log('response:', response)
        return dispatch({ type: Action.GET_ORDER_BY_USER, payload: response.data });
    } catch (err) {
        console.log(err)
    }
};
export const UpdateStatusOrder = (data) => async (dispatch) => {

    try {
      const response = await PostData('/checkout/updateStatusByOrder',
        data
      );
      console.log('response:', response)
      dispatch({ type: Action.UPDATE_STATUS, payload: response.data });
    //   dispatch(getListBrand({ sort: 'ctime' })); // Dispatch getListSlider after publishing
    //   dispatch(ListTrashBrand1({ sort: 'ctime' }));
  
    } catch (err) {
      console.log(err)
      return err.response.data
  
    }
  
  };
