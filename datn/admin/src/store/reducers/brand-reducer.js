import { Action } from '../actions'

const initialState = {
    allBrand: null,
    createBrand: null,
    publishedBrand: null,
    unpublishedBrand: null,
    restoreBrand: null,
    listDelBrand: null,
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
        case Action.PUBLISHED:
            return {
                ...state,
                publishedBrand: action.payload.metaData
            }
        case Action.UNPUBLISHED:
            return {
                ...state,
                unpublishedBrand: action.payload.metaData
            }
        case Action.DELETETRASH:
            return {
                ...state,
                deleteTrash: action.payload.metaData,

            }
        case Action.RESTORE:
            return {
                ...state,
                restoreBrand: action.payload.metaData,
                listDelBrand: state.listDelBrand.filter(brand => brand._id !== action.payload.metaData._id)
            }
        case Action.DELETE:
            return {
                ...state,
                deleteBrand: action.payload.metaData
            }
        case Action.LISTTRASH:
            return {
                ...state,
                listDelBrand: action.payload.metaData
            }
        default:
            return state;
    }

}

export default BrandReducer
