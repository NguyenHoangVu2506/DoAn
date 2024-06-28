import { GetData, PostData } from '../../utils'
import { Action } from './index'


export const getAllDiscount = (data) => async (dispatch) => {
    try {
        const response = await GetData('/discount/all_code', data);
        console.log('response:', response)
        return dispatch({ type: Action.GET_DISCOUNT, payload: response.data });
    } catch (err) {
        console.log(err)
        // return err.response.data
    }
};

export const Amount= (data) => async (dispatch) => {
    try {
        const response = await PostData('/discount/amount', data);
        console.log('response:', response)
        return dispatch({ type: Action.AMOUNT, payload: response.data });
    } catch (err) {
        console.log(err)
        // return err.response.data
    }
};