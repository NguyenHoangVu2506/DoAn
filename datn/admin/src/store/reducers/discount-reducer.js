import { Action } from '../actions'

const initialState = {
    discount: null,
    updateInfo:null
}


const DiscountReducer = (state = initialState, action) => {

    switch (action.type) {
        case Action.GET_DISCOUNT:
            return {
                ...state,
                discount: action.payload.metaData
            }
        case Action.UPDATE_INFO:
            return {
                ...state,
                updateInfo: action.payload.metaData
            }

        default:
            return state;
    }

}

export default DiscountReducer
