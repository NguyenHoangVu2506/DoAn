import { GetData, PostData } from '../../utils'
import { Action } from '../actions'

export const addCart= ({userId, product}) => async (dispatch) => {

  try {
    const response = await PostData('/cart',{userId, product});
    console.log('response:', response)
    return dispatch({ type: Action.ADD_CART, payload: response.data });
  } catch (err) {
    console.log(err)
    return err.response.data
  }

};

export const getCart= (data) => async (dispatch) => {

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

  export const deleteCart= (data) => async (dispatch) => {

    try {
      const response = await PostData('/cart/delete',data);
      console.log('response:', response)
      return dispatch({ type: Action.DELETE_CART, payload: response.data });
    } catch (err) {
      console.log(err)
      return err.response.data
    }
  
  };

  export const deleteCartId= (data) => async (dispatch) => {

    try {
      const response = await PostData('/cart/deleteCartId',data);
      console.log('response:', response)
      return dispatch({ type: Action.DELETE_CART_ID, payload: response.data });
    } catch (err) {
      console.log(err)
      return err.response.data
    }
  
  };
