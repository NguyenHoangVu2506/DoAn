import { Action } from '../actions'

const initialState = {
    allPage: null,
    createPage: null,
    listPageById: null,
    updatePage: null,
    publishedPage: null,
    unpublishedPage: null,
    restorePage:null,
    listDelPage:null,
}

const PageReducer = (state = initialState, action) => {

    switch (action.type) {
        case Action.GET_PAGE:
            return {
                ...state,
                allPage: action.payload.metaData
            }
        case Action.ADD_PAGE:
            return {
                ...state,
                createPage: action.payload.metaData
            }

        case Action.UPDATE_PAGE:
            return {
                ...state,
                updatePage: action.payload.metaData
            }

        case Action.GET_PAGE_BY_ID:
            return {
                ...state,
                listPageById: action.payload.metaData
            }
        case Action.PUBLISHED:
            return {
                ...state,
                publishedPage: action.payload.metaData
            }
        case Action.UNPUBLISHED:
            return {
                ...state,
                unpublishedPage: action.payload.metaData
            }
        case Action.DELETETRASH:
            return {
                ...state,
                deleteTrash: action.payload.metaData,

            }
        case Action.RESTORE:
            return {
                ...state,
                restorePage: action.payload.metaData,
                listDelPage: state.listDelPage.filter(page => page._id !== action.payload.metaData._id)
            }
        case Action.DELETE:
            return {
                ...state,
                deletePage: action.payload.metaData
            }
        case Action.LISTTRASH:
            return {
                ...state,
                listDelPage: action.payload.metaData
            }

        default:
            return state;
    }

}

export default PageReducer
