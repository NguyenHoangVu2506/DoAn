import { Action } from '../actions'

const initialState = {
    info: null,
    updateInfo:null
}


const InfoReducer = (state = initialState, action) => {

    switch (action.type) {
        case Action.GET_INFO:
            return {
                ...state,
                info: action.payload.metaData
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

export default InfoReducer
