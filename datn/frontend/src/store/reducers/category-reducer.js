import { Action } from '../actions'

const initialState = {
    current_category: null,
    all_category: null

}


const CategoryReducer = (state = initialState, action) => {

    switch (action.type) {
     
        case Action.ALL_CATEGORY:
            return {
                ...state,
                all_category: action.payload.metaData
            }
        case Action.GET_CATEGORY_BY_PARENT_ID:
            return {
                ...state,
                current_category: action.payload.metaData
            }


        default:
            return state;
    }

}

export default CategoryReducer
