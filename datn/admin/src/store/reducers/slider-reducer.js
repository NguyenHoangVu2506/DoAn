import { Action } from '../actions'

const initialState = {
    allSlider: null,
    createBanner: null,
    updateBanner: null,
    getBannerById: null,
    publishedBanner: null,
    unpublishedBanner: null,
    restoreBanner:null,
    listDelSlider:null,
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
        case Action.UPDATE_SLIDER:
            return {
                ...state,
                updateBanner: action.payload.metaData
            }
        case Action.GET_SLIDER_BY_ID:
            return {
                ...state,
                getBannerById: action.payload.metaData
            }
        case Action.PUBLISHED:
            return {
                ...state,
                publishedBanner: action.payload.metaData
            }
        case Action.UNPUBLISHED:
            return {
                ...state,
                unpublishedBanner: action.payload.metaData
            }
        case Action.DELETETRASH:
            return {
                ...state,
                deleteTrash: action.payload.metaData,

            }
        case Action.RESTORE:
            return {
                ...state,
                restoreBanner: action.payload.metaData,
                listDelSlider: state.listDelSlider.filter(slider => slider._id !== action.payload.metaData._id)
            }
        case Action.DELETE:
            return {
                ...state,
                deleteBanner: action.payload.metaData
            }
        case Action.LISTTRASH:
            return {
                ...state,
                listDelSlider: action.payload.metaData
            }
        default:
            return state;
    }

}

export default SliderReducer
