import { Action } from '../actions'

const initialState = {
    allSlider: null
}

const SliderReducer = (state = initialState, action) => {

    switch (action.type) {
        case Action.GET_LIST_SLIDER:
            return {
                state,
                allSlider: action.payload.metaData
            }

        default:
            return state;
    }

}

export default SliderReducer
