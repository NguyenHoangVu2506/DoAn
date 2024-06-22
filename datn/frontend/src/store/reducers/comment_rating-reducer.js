import { Action } from '../actions'

const initialState = {
    getComentProduct: null
}


const ComnetRatingReducer = (state = initialState, action) => {

    switch (action.type) {
        case Action.GET_COMMENT_BY_PRODUCT:
            return {
                ...state,
                getComentProduct: action.payload.metaData
            }

        default:
            return state;
    }

}

export default ComnetRatingReducer
