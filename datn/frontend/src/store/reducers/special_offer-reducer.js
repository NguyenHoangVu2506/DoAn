import { Action } from '../actions'

const initialState = {
    special_offer: null,
}

const specialOfferReducer = (state = initialState, action) => {
    switch (action.type) {
        case Action.SPECIAL_OFFER_BY_PRODUCT:
            return state
        case Action.SPECIAL_OFFER_TODAY:
            return {
                ...state,
                special_offer: action.payload.metaData
            }
        default:
            return state;
    }
}

export default specialOfferReducer