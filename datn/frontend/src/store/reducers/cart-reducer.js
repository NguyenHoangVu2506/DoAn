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
                ...state,
                cart: null
            }

        case Action.DELETE_CART:
            return {
                ...state,
                cart: action.payload.metaData
            }

        case Action.DELETE_CART_ID:
            localStorage.removeItem("cart_products");
            return {
                ...state,
                cart: null
            }

        case Action.UPDATE_CART:
            return{ ...state,
            cart: action.payload.metaData
            }


        default:
            return state;
    }

}

export default CartReducer
