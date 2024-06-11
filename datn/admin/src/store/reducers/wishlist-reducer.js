import { Action } from '../actions'

const initialState = {
    addPro: null,
    wishList: null,

}


const WishlistReducer = (state = initialState, action) => {

    switch (action.type) {
        case Action.ADD_WISHLIST:
            return {
                ...state,
                addPro: action.payload.metaData
            }
        case Action.GET_WISHLIST:
            return {
                ...state,
                wishList: action.payload.metaData
            }

        default:
            return state;
    }

}

export default WishlistReducer
