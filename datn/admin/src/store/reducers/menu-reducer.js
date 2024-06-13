import { Action } from '../actions'

const initialState = {
    allMenu: null,
    createMenu: null,
    listMenuById:null,
    updateMenu:null,
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

        default:
            return state;
    }

}

export default MenuReducer
