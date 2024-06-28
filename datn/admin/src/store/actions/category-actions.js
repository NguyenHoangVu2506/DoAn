import { PostData } from "../../utils";
import { Action } from "../actions";

export const getCategory = (data) => async (dispatch) => {
  try {
    const response = await PostData('/category/findAllCategory', data);
    console.log('response:', response)
    return dispatch({ type: Action.GET_CATEGORY, payload: response.data });
  } catch (err) {
    console.log(err)
    return err.response.data
  }

};
export const getCategoryByParentId = (data) => async (dispatch) => {

  try {
    const response = await PostData('/category/listcategory', data);
    console.log('response:', response)
    return dispatch({ type: Action.GET_CATEGORY_BY_PARENT_ID, payload: response.data });
  } catch (err) {
    console.log(err)
    return err.response.data
  }

};

export const getChildCategoryByParentId = (data) => async (dispatch) => {

  try {
    const response = await PostData('/category/listcategory', data);
    console.log('response:', response)
    return dispatch({ type: Action.GET_CHILD_CATEGORY_BY_PARENT_ID, payload: response.data });
  } catch (err) {
    console.log(err)
    return err.response.data
  }

};
export const CategoryStore = (data) => async (dispatch) => {

  try {
    const response = await PostData('/category',
      data
    );
    console.log('response:', response)
    return dispatch({ type: Action.ADD_CATEGORY, payload: response.data });
    dispatch(getCategory({ sort: 'ctime' }));
  } catch (err) {
    console.log(err)
    return err.response.data

  }

};
export const getCategoryById = (data) => async (dispatch) => {
  try {
    const response = await PostData('/category/getCategory', data);
    console.log('response:', response)
    return dispatch({ type: Action.GET_CATEGORY_BY_ID, payload: response.data });
  } catch (err) {
    console.log(err)
    return err.response.data
  }

};
export const CategoryUpdate = (data) => async (dispatch) => {

  try {
    const response = await PostData('/category/update',
      data
    );
    console.log('response:', response)
    dispatch({ type: Action.UPDATE_CATEGORY, payload: response.data });
    dispatch(getCategory({ sort: 'ctime' }));
  } catch (err) {
    console.log(err)
    return err.response.data
  }
};
export const CategoryPublished = (data) => async (dispatch) => {

  try {
    const response = await PostData('/category/publishCategory',
      data
    );
    console.log('response:', response)
    dispatch({ type: Action.PUBLISHED, payload: response.data });
    dispatch(getCategory({ sort: 'ctime' })); // Dispatch getListSlider after publishing

  } catch (err) {
    console.log(err)
    return err.response.data

  }

};

export const CategoryUnPublished = (data) => async (dispatch) => {

  try {
    const response = await PostData('/category/unpublishCategory',
      data
    );
    console.log('response:', response);
    dispatch({ type: Action.UNPUBLISHED, payload: response.data });
    dispatch(getCategory({ sort: 'ctime' })); // Dispatch getListSlider after publishing
  } catch (err) {
    console.log(err)
    return err.response.data

  }

};
export const TrashCategory = (data) => async (dispatch) => {

  try {
    const response = await PostData('/category/deleteCategory',
      data
    );
    console.log('response:', response)
    dispatch({ type: Action.DELETETRASH, payload: response.data });
    dispatch(getCategory({ sort: 'ctime' })); // Dispatch getListSlider after publishing
    dispatch(ListTrashCategory1({ sort: 'ctime' }));

  } catch (err) {
    console.log(err)
    return err.response.data

  }

};
export const ListTrashCategory1 = (data) => async (dispatch) => {
  try {
    const response = await PostData('/category/getDeleteCategoryList',
      data
    );
    console.log('response:', response)
    return dispatch({ type: Action.LISTTRASH, payload: response.data });
  } catch (err) {
    console.log(err)
    return err.response.data

  }

};

export const CategoryRestore = (data) => async (dispatch) => {

  try {
    const response = await PostData('/category/restoreCategory',
      data
    );
    console.log('response:', response)
    dispatch({ type: Action.RESTORE, payload: response.data });
    dispatch(getCategory({ sort: 'ctime' })); // Dispatch getListSlider after publishing
  } catch (err) {
    console.log(err)
    return err.response.data

  }

};
export const RemoveCategory = (data) => async (dispatch) => {

  try {
    const response = await PostData('/category/removeCategory',
      data
    );
    console.log('response:', response)
    dispatch({ type: Action.DELETE, payload: response.data });
    dispatch(getCategory({ sort: 'ctime' })); // Dispatch getListSlider after publishing
    dispatch(ListTrashCategory1({ sort: 'ctime' }));
  } catch (err) {
    console.log(err)
    return err.response.data

  }

};
