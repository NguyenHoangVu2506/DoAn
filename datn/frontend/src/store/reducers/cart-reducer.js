import { Action } from '../actions'

const initialState = {
    cart: null
}


const CartReducer = (state = initialState, action) => {

    switch (action.type) {
        case Action.GET_CART:
            localStorage.setItem('cart_products', JSON.stringify(action.payload.metaData.cart_products))
            return {
                ...state,
                cart: action.payload.metaData
            }

        case Action.ADD_CART:
            localStorage.setItem('cart_products', JSON.stringify(action.payload.metaData.cart_products))
            return {
                ...state,
                cart: action.payload.metaData
            }

        case Action.DELETE_CART_ITEM:
            localStorage.setItem('cart_products', JSON.stringify(action.payload.metaData.cart_products))
            return {
                ...state,
                cart: action.payload.metaData
            }

        case Action.DELETE_CART_ID_USER_ID:
            localStorage.removeItem("cart_products");
            return {
                ...state,
                cart: null
            }

        case Action.UPDATE_CART:
            localStorage.setItem('cart_products', JSON.stringify(action.payload.metaData.cart_products))
            return {
                ...state,
                cart: action.payload.metaData
            }


        default:
            return state;
    }

}

export default CartReducer
