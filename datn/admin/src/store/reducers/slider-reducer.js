import { Action } from '../actions'

const initialState = {
    allSlider: null,
    createBanner:null
}


const SliderReducer = (state = initialState, action) => {

    switch (action.type) {
        case Action.GET_SLIDER:
            return {
                ...state,
                allSlider: action.payload.metaData
            }
        case Action.ADD_SLIDER:
            return {
                ...state,
                createBanner: action.payload.metaData
            }
        default:
            return state;
    }

}

export default SliderReducer
