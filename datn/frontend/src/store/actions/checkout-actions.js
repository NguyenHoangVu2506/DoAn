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

