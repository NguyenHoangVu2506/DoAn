import { Action } from '../actions'

const initialState = {
    all_brand: null

}


const BrandReducer = (state = initialState, action) => {

    switch (action.type) {
     
        case Action.GET_BRAND_LIST:
            return {
                ...state,
                all_brand: action.payload.metaData
            }
        default:
            return state;
    }
}

export default BrandReducer
