import { Action } from '../actions'

const initialState = {
    allTopic: null,
    createTopic: null,
    Topic:null,
    updateTopic:null,
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
        case Action.UPDATE_TOPIC:
            return {
                ...state,
                updateTopic: action.payload.metaData
            }
        case Action.GET_TOPIC_BY_ID:
            return {
                ...state,
                Topic: action.payload.metaData
            }
        default:
            return state;
    }

}

export default TopicReducer
