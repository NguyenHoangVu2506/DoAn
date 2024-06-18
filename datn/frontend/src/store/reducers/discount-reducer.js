import { Action } from '../actions'

const initialState = {
    all_discount: null,
}

const DiscountReducer = (state = initialState, action) => {
    switch (action.type) {
        case Action.GET_DISCOUNT:
            return {
                ...state,
                all_discount: action.payload.metaData
            }
        case Action.AMOUNT:
            return {
                ...state,
                amount: action.payload.metaData
            }

        default:
            return state;
    }
}

export default DiscountReducer