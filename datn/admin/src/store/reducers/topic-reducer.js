import { Action } from '../actions'

const initialState = {
    allTopic: null,
    createTopic: null,
    Topic: null,
    updateTopic: null,
    publishedTopic: null,
    unpublishedTopic: null,
    restoreTopic: null,
    listDelTopic: null,
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
        case Action.PUBLISHED:
            return {
                ...state,
                publishedTopic: action.payload.metaData
            }
        case Action.UNPUBLISHED:
            return {
                ...state,
                unpublishedTopic: action.payload.metaData
            }
        case Action.DELETETRASH:
            return {
                ...state,
                deleteTrash: action.payload.metaData,

            }
        case Action.RESTORE:
            return {
                ...state,
                restoreTopic: action.payload.metaData,
                listDelTopic: state.listDelTopic.filter(topic => topic._id !== action.payload.metaData._id)
            }
        case Action.DELETE:
            return {
                ...state,
                deleteTopic: action.payload.metaData
            }
        case Action.LISTTRASH:
            return {
                ...state,
                listDelTopic: action.payload.metaData
            }
        default:
            return state;
    }

}

export default TopicReducer
