import { Action } from '../actions'

const initialState = {
    order: null,
}


const OrderReducer = (state = initialState, action) => {

    switch (action.type) {
        case Action.GET_ORDER:
            return {
                ...state,
                order: action.payload.metaData
            }
        default:
            return state;
    }

}

export default OrderReducer
