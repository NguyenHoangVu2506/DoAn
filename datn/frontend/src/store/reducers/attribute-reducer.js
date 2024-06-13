import { Action } from '../actions'

const initialState = {
    all_attribute: null,
    onAtribute: null ,//by atrribute

}


const AttributeReducer = (state = initialState, action) => {

    switch (action.type) {
     
        case Action.GET_ATTRIBUTE_LIST:
            return {
                ...state,
                all_attribute: action.payload.metaData
            }

        case Action.GET_ATTRIBUTE:
            return {
                ...state,
                onAtribute: action.payload.metaData
            }
        default:
            return state;
    }
}

export default AttributeReducer
