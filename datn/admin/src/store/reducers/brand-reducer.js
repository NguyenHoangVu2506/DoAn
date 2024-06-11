import { Action } from '../actions'

const initialState = {
    allBrand: null,
}

const BrandReducer = (state = initialState, action) => {

    switch (action.type) {
        case Action.GET_BRAND:
            return {
                ...state,
                allBrand: action.payload.metaData
            }
        case Action.ADD_BRAND:
            return {
                ...state,
                createBrand: action.payload.metaData
            }
        default:
            return state;
    }

}

export default BrandReducer
