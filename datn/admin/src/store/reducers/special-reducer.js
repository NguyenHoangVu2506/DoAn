import { Action } from '../actions'

const initialState = {
    special: null,
    updateInfo:null
}


const SpecialReducer = (state = initialState, action) => {

    switch (action.type) {
        case Action.GET_SPECIAL:
            return {
                ...state,
                special: action.payload.metaData
            }
        case Action.UPDATE_INFO:
            return {
                ...state,
                updateInfo: action.payload.metaData
            }

        default:
            return state;
    }

}

export default SpecialReducer
