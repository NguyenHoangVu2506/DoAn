import { Action } from '../actions'

const initialState = {
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : null
}


const CartReducer = (state = initialState, action) => {

    switch (action.type) {
        case Action.GET_CART:
            localStorage.setItem('cart',JSON.stringify(action.payload.metaData))
            return {
                ...state,
                cart: action.payload.metaData
            }

        case Action.ADD_CART:
            return {
            }

        case Action.DELETE_CART:
            return state

        case Action.DELETE_CART_ID:
            return state

        case Action.UPDATE_CART:
            return state

        default:
            return state;
    }

}

export default CartReducer
