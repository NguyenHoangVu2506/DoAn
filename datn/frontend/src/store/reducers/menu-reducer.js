import { Action } from '../actions'

const initialState = {
    all_menu: null

}


const MenuReducer = (state = initialState, action) => {

    switch (action.type) {
     
        case Action.GET_ALL_MENU:
            return {
                ...state,
                all_menu: action.payload.metaData
            }
        default:
            return state;
    }
}

export default MenuReducer
