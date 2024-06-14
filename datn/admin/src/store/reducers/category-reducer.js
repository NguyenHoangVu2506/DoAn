import { Action } from '../actions'

const initialState = {
    listCategory: null,
    current_category: null,
    child_category: null,
    createCategory: null,
    listCateById:null,
    updateCategory:null,

}


const CategoryReducer = (state = initialState, action) => {

    switch (action.type) {
        case Action.GET_CATEGORY:
            return {
                ...state,
                listCategory: action.payload.metaData
            }
        case Action.GET_CATEGORY_BY_PARENT_ID:
            return {
                ...state,
                current_category: action.payload.metaData
            }

        case Action.GET_CHILD_CATEGORY_BY_PARENT_ID:
            return {
                ...state,
                child_category: action.payload
            }
        case Action.ADD_CATEGORY:
            return {
                ...state,
                createCategory: action.payload.metaData
            }
        case Action.UPDATE_CATEGORY:
            return {
                ...state,
                updateCategory: action.payload.metaData
            }

        case Action.GET_CATEGORY_BY_ID:
            return {
                ...state,
                listCateById: action.payload.metaData
            }

        default:
            return state;
    }

}

export default CategoryReducer
