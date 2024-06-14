import { Action } from '../actions'

const initialState = {
    allProducts: null,
    productDetail: null,
    productByCategory: null,
    spuInfo:null



}

const ProductReducer = (state = initialState, action) => {

    switch (action.type) {
        case Action.ALL_PRODUCTS:
            return {
                ...state,
                allProducts: action.payload.metaData
            }

        case Action.PRODUCT_DETAIL:
            return {
                ...state,
                productDetail: action.payload.metaData
            }
        case Action.GET_PRODUCT_BY_CAT_ID:
            return {
                ...state,
                productByCategory: action.payload.metaData
            }

        case Action.GET_SPU_INFO:
            return {
                ...state,
                spuInfo: action.payload.metaData
            }
        default:
            return state;
    }

}

export default ProductReducer
