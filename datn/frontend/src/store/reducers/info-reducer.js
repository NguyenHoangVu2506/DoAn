import { Action } from '../actions'

const initialState = {
    info: localStorage.getItem("info") ? JSON.parse(localStorage.getItem("info")) : null
}


const InfoReducer = (state = initialState, action) => {

    switch (action.type) {
        case Action.GET_INFO:
              localStorage.setItem('info',JSON.stringify(action.payload.metaData))
                return {
                    ...state,
                    info: action.payload.metaData
                }
    
        default:
            return state;
    }

}

export default InfoReducer
