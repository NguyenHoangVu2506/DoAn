import { Action } from '../actions'

const initialState = {
    allTopic: null,
    createTopic:null
}


const TopicReducer = (state = initialState, action) => {

    switch (action.type) {
        case Action.GET_TOPIC:
            return {
                ...state,
                allTopic: action.payload.metaData
            }
        case Action.ADD_TOPIC:
            return {
                ...state,
                createTopic: action.payload.metaData
            }
        default:
            return state;
    }

}

export default TopicReducer
