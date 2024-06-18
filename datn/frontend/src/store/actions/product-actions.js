import { GetData, PostData } from '../../utils'
import { Action } from '../actions'

export const onAllProduct = (data) => async (dispatch) => {
  try {
    const response = await PostData('/spu/all_products',data);
    console.log('response:', response)
    return dispatch({ type: Action.ALL_PRODUCTS, payload: response.data });

  } catch (err) {
    console.log(err)
    return err.response.data
  }
};

export const onProductDetail = (data) => async (dispatch) => {
  try {
    const response = await PostData('/spu/findProductDetail',data);
    console.log('response:', response)
    return dispatch({ type: Action.PRODUCT_DETAIL, payload: response.data });

  } catch (err) {
    console.log(err)
    return err.response.data
  }
};

export const getProductByCatId = (data) => async (dispatch) => {
  try {
    const response = await PostData('/spu/findProductsByCategory',data);
    console.log('response:', response)
    return dispatch({ type: Action.GET_PRODUCT_BY_CAT_ID, payload: response.data });

  } catch (err) {
    console.log(err)
    return err.response.data
  }
};
export const getProductByBrandId = (data) => async (dispatch) => {
  try {
    const response = await PostData('/spu/findProductsByBrand',data);
    console.log('response:', response)
    return dispatch({ type: Action.GET_PRODUCT_BY_BRAND_ID, payload: response.data });
  } catch (err) {
    console.log(err)
    return err.response.data
  }
};

export const productById = (data) => async (dispatch) => {
  try {
    const response = await PostData('/spu/get_spu_info', data);
    console.log('response:', response)
    return dispatch({ type: Action.GET_SPU_INFO, payload: response.data });

  } catch (err) {
    console.log(err)

  }

};

