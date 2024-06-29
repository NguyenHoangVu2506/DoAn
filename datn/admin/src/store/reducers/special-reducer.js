import { Action } from '../actions'

const initialState = {
    special: null,
    getspecialbyid: null
}


const SpecialReducer = (state = initialState, action) => {

    switch (action.type) {
        case Action.GET_SPECIAL:
            return {
                ...state,
                special: action.payload.metaData
            }
        case Action.GET_SPECIAL_BY_ID:
            return {
                ...state,
                getspecialbyid: action.payload.metaData
            }
        case Action.ADD_SPECIAL:
            return {
                ...state,
                updateInfo: action.payload.metaData
            }

        default:
            return state;
    }

}

export default SpecialReducer
