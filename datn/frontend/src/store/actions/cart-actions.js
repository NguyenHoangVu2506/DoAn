import { GetData, PostData } from '../../utils'
import { Action } from '../actions'

export const addCart= ({userId, product}) => async (dispatch) => {

  try {
    const response = await PostData('/cart/addToCart',{userId, product});
    console.log('response:', response)
    return dispatch({ type: Action.ADD_CART, payload: response.data });
  } catch (err) {
    console.log(err)
    return err.response.data
  }

};

export const getCart = (data) => async (dispatch) => {

    try {
      const response = await PostData('/cart/listCart',data);
      console.log('response:', response)
      return dispatch({ type: Action.GET_CART, payload: response.data });
    } catch (err) {
      console.log(err)
      return err.response.data
    }
  
  };

  export const updateCart= (data) => async (dispatch) => {

    try {
      const response = await PostData('/cart/update',data);
      console.log('response:', response)
      return dispatch({ type: Action.UPDATE_CART, payload: response.data });
    } catch (err) {
      console.log(err)
      return err.response.data
    }
  
  };
  
  export const updateSkuFromCartV2= (data) => async (dispatch) => {

    try {
      const response = await PostData('/cart/updateSkuFromCartV2',data);
      console.log('response:', response)
      return dispatch({ type: Action.UPDATE_CART, payload: response.data });
    } catch (err) {
      console.log(err)
      return err.response.data
    }
  
  };

  export const updateQuantityCart= (data) => async (dispatch) => {

    try {
      const response = await PostData('/cart/updateQuantityFromCart',data);
      console.log('response:', response)
      return dispatch({ type: Action.UPDATE_CART, payload: response.data });
    } catch (err) {
      console.log(err)
      return err.response.data
    }
  
  };

  export const updateSkuCart= (data) => async (dispatch) => {

    try {
      const response = await PostData('/cart/updateSkuFromCart',data);
      console.log('response:', response)
      return dispatch({ type: Action.UPDATE_CART, payload: response.data });
    } catch (err) {
      console.log(err)
      return err.response.data
    }
  
  };

  export const deleteCartItem= (data) => async (dispatch) => {

    try {
      const response = await PostData('/cart/deleteCartItem',data);
      console.log('response:', response)
      return dispatch({ type: Action.DELETE_CART_ITEM, payload: response.data });
    } catch (err) {
      console.log(err)
      return err.response.data
    }
  
  };

  export const deleteCartIdUserId= (data) => async (dispatch) => {

    try {
      const response = await PostData('/cart/deleteCartIdUserId',data);
      console.log('response:', response)
      return dispatch({ type: Action.DELETE_CART_ID_USER_ID, payload: response.data });
    } catch (err) {
      console.log(err)
      return err.response.data
    }
  
  };
