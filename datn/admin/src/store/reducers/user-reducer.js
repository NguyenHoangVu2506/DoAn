import { Action } from '../actions'

const initialState = {
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
    add_address:null


}

const UserReducer = (state = initialState, action) => {

    switch (action.type) {
        case Action.SIGNUP:
            return state
        case Action.LOGIN_WITH_FACEBOOK:
            localStorage.setItem("userInfo", JSON.stringify(action.payload.metaData.user));
            return {
                ...state,
                userInfo: action.payload
            }
        case Action.LOGIN_WITH_GOOGLE:
            localStorage.setItem("userInfo", JSON.stringify(action.payload.metaData.user));
            return {
                ...state,
                userInfo: action.payload
            }
        case Action.LOGIN:
            localStorage.setItem("userInfo", JSON.stringify(action.payload.metaData.user));
            return {
                ...state,
                userInfo: action.payload
            }
        case Action.LOGOUT:
            localStorage.clear();
            return {
                ...state,
                userInfo: null
            }
        case Action.ADD_ADDRESS:
            return {
                ...state,
                add_address:action.payload
            }

        case Action.GET_ADDRESS:
            return state



        default:
            return state;
    }

}

export default UserReducer
