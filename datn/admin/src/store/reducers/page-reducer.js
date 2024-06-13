import { Action } from '../actions'

const initialState = {
    allPage: null,
    createPage: null,
    listPageById:null,
    updatePage:null,
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

        default:
            return state;
    }

}

export default PageReducer
