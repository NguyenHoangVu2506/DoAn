import { Action } from '../actions'

const initialState = {
    allBrand: null,
    createBrand: null,
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
        case Action.UPDATE_BRAND:
            return {
                ...state,
                updateBrand: action.payload.metaData
            }

        case Action.GET_BRAND_BY_ID:
            return {
                ...state,
                listBrandById: action.payload.metaData
            }
        default:
            return state;
    }

}

export default BrandReducer
