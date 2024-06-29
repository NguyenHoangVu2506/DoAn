import { Action } from '../actions'

const initialState = {
    order: null,
    orderbyid: null
}


const OrderReducer = (state = initialState, action) => {

    switch (action.type) {
        case Action.GET_ORDER:
            return {
                ...state,
                order: action.payload.metaData
            }
        case Action.GET_ORDER_BY_ID:
            return {
                ...state,
                orderbyid: action.payload.metaData
            }
        default:
            return state;
    }

}

export default OrderReducer
