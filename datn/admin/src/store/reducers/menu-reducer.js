import { Action } from '../actions'

const initialState = {
    allMenu: null,
    createMenu: null,
    listMenuById: null,
    updateMenu: null,
    publishedMenu: null,
    unpublishedMenu: null,
    restoreMenu:null,
    listDelMenu:null,
}

const MenuReducer = (state = initialState, action) => {

    switch (action.type) {
        case Action.GET_MENU:
            return {
                ...state,
                allMenu: action.payload.metaData
            }
        case Action.ADD_MENU:
            return {
                ...state,
                createMenu: action.payload.metaData
            }

        case Action.UPDATED_MENU:
            return {
                ...state,
                updateMenu: action.payload.metaData
            }

        case Action.GET_MENU_BY_ID:
            return {
                ...state,
                listMenuById: action.payload.metaData
            }
        case Action.PUBLISHED:
            return {
                ...state,
                publishedMenu: action.payload.metaData
            }
        case Action.UNPUBLISHED:
            return {
                ...state,
                unpublishedMenu: action.payload.metaData
            }
        case Action.DELETETRASH:
            return {
                ...state,
                deleteTrash: action.payload.metaData,

            }
        case Action.RESTORE:
            return {
                ...state,
                restoreMenu: action.payload.metaData,
                listDelMenu: state.listDelMenu.filter(menu => menu._id !== action.payload.metaData._id)
            }
        case Action.DELETE:
            return {
                ...state,
                deleteMenu: action.payload.metaData
            }
        case Action.LISTTRASH:
            return {
                ...state,
                listDelMenu: action.payload.metaData
            }

        default:
            return state;
    }

}

export default MenuReducer
