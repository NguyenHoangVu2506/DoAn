import { Action } from '../actions'

const initialState = {
    attribute: null,
    updateInfo:null
}


const AttributeReducer = (state = initialState, action) => {

    switch (action.type) {
        case Action.GET_ATTRIBUTES:
            return {
                ...state,
                attribute: action.payload.metaData
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

export default AttributeReducer
