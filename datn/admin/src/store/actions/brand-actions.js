import { Action } from "../actions";
import { PostData } from "../../utils";

export const getListBrand = (data) => async (dispatch) => {
  try {
    const response = await PostData('/brand/getBrandList', data);
    console.log('response:', response)
    return dispatch({ type: Action.GET_BRAND, payload: response.data });
  } catch (err) {
    console.log(err)
    return err.response.data
  }

};
export const BrandStore = (data) => async (dispatch) => {

  try {
    const response = await PostData('/brand',
      data
    );
    console.log('response:', response)
    dispatch({ type: Action.ADD_BRAND, payload: response.data });
    dispatch(getListBrand({ sort: 'ctime' }));
  } catch (err) {
    console.log(err)
    return err.response.data

  }

};
export const getBrandById = (data) => async (dispatch) => {
  try {
    const response = await PostData('/brand/getBrand', data);
    console.log('response:', response)
    return dispatch({ type: Action.GET_BRAND_BY_ID, payload: response.data });
  } catch (err) {
    console.log(err)
    return err.response.data
  }

};
export const BrandUpdate = (data) => async (dispatch) => {

  try {
    const response = await PostData('/brand/update',
      data
    );
    console.log('response:', response)
    dispatch({ type: Action.UPDATE_BRAND, payload: response.data });
    dispatch(getListBrand({ sort: 'ctime' }));
  } catch (err) {
    console.log(err)
    return err.response.data
  }
};
export const BrandPublished = (data) => async (dispatch) => {

  try {
    const response = await PostData('/brand/publishBrand',
      data
    );
    console.log('response:', response)
    dispatch({ type: Action.PUBLISHED, payload: response.data });
    dispatch(getListBrand({ sort: 'ctime' })); // Dispatch getListSlider after publishing

  } catch (err) {
    console.log(err)
    return err.response.data

  }

};

export const BrandUnPublished = (data) => async (dispatch) => {

  try {
    const response = await PostData('/brand/unpublishBrand',
      data
    );
    console.log('response:', response);
    dispatch({ type: Action.UNPUBLISHED, payload: response.data });
    dispatch(getListBrand({ sort: 'ctime' })); // Dispatch getListSlider after publishing
  } catch (err) {
    console.log(err)
    return err.response.data

  }

};
export const TrashBrand = (data) => async (dispatch) => {

  try {
    const response = await PostData('/brand/deleteBrand',
      data
    );
    console.log('response:', response)
    dispatch({ type: Action.DELETETRASH, payload: response.data });
    dispatch(getListBrand({ sort: 'ctime' })); // Dispatch getListSlider after publishing
    dispatch(ListTrashBrand1({ sort: 'ctime' }));

  } catch (err) {
    console.log(err)
    return err.response.data

  }

};
export const ListTrashBrand1 = (data) => async (dispatch) => {
  try {
    const response = await PostData('/brand/getDeleteBrandList',
      data
    );
    console.log('response:', response)
    return dispatch({ type: Action.LISTTRASH, payload: response.data });
  } catch (err) {
    console.log(err)
    return err.response.data

  }

};

export const BrandRestore = (data) => async (dispatch) => {

  try {
    const response = await PostData('/brand/restoreBrand',
      data
    );
    console.log('response:', response)
    dispatch({ type: Action.RESTORE, payload: response.data });
    dispatch(getListBrand({ sort: 'ctime' })); // Dispatch getListSlider after publishing
  } catch (err) {
    console.log(err)
    return err.response.data

  }

};
export const RemoveBrand = (data) => async (dispatch) => {

  try {
    const response = await PostData('/brand/removeBrand',
      data
    );
    console.log('response:', response)
    dispatch({ type: Action.DELETE, payload: response.data });
    dispatch(getListBrand({ sort: 'ctime' })); // Dispatch getListSlider after publishing
    dispatch(ListTrashBrand1({ sort: 'ctime' }));
  } catch (err) {
    console.log(err)
    return err.response.data

  }

};
