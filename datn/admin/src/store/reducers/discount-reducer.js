import { Action } from '../actions'

const initialState = {
    discount: null,
    updateInfo: null,
    createDiscount:null
}


const DiscountReducer = (state = initialState, action) => {

    switch (action.type) {
        case Action.GET_DISCOUNT:
            return {
                ...state,
                discount: action.payload.metaData
            }
        case Action.ADD_DISCOUNT:
            return {
                ...state,
                createDiscount: action.payload.metaData
            }

        default:
            return state;
    }

}

export default DiscountReducer
