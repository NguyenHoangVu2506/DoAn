import { Action } from '../actions'

const initialState = {
    allTopic: null
}


const TopicReducer = (state = initialState, action) => {

    switch (action.type) {
        case Action.GET_TOPIC:
            return {
                ...state,
                allTopic: action.payload.metaData
            }

        default:
            return state;
    }

}

export default TopicReducer
