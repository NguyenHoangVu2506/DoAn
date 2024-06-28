import { PostData } from '../../utils'
import { Action } from './index'


export const getSpecialOfferBySpuId = (data) => async (dispatch) => {
    try {
        const response = await PostData('/specialOffer/getSpecialOfferBySpuId', data);
        console.log('response:', response)
        return dispatch({ type: Action.SPECIAL_OFFER_BY_PRODUCT, payload: response.data });
    } catch (err) {
        console.log(err)
        // return err.response.data
    }
};

export const specialOfferToday= (data) => async (dispatch) => {
    try {
        const response = await PostData('/specialOffer/findSpecialOfferBetweenStartDateAndEndByDate', data);
        console.log('response:', response)
        return dispatch({ type: Action.SPECIAL_OFFER_TODAY, payload: response.data });
    } catch (err) {
        console.log(err)
        // return err.response.data
    }
};