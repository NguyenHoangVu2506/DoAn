import { Action } from ".";
import { PostData } from "../../utils";

export const getListPage = (data) => async (dispatch) => {
  try {
    const response = await PostData('/page/getListPage', data);
    console.log('response:', response)
    return dispatch({ type: Action.GET_PAGE, payload: response.data });
  } catch (err) {
    console.log(err)
    return err.response.data
  }

};
export const getPageById = (data) => async (dispatch) => {
  try {
    const response = await PostData('/page/getPage', data);
    console.log('response:', response)
    return dispatch({ type: Action.GET_PAGE_BY_ID, payload: response.data });
  } catch (err) {
    console.log(err)
    return err.response.data
  }

};

export const PageStore = (data) => async (dispatch) => {

  try {
    const response = await PostData('/page/newPage',
      data
    );
    console.log('response:', response)
    dispatch({ type: Action.ADD_PAGE, payload: response.data });
    dispatch(getListPage({ sort: 'ctime' })); // Dispatch getListSlider after publishing

  } catch (err) {
    console.log(err)
    return err.response.data

  }

};
export const PageUpdate = (data) => async (dispatch) => {

  try {
    const response = await PostData('/page/updatePage',
      data
    );
    console.log('response:', response)
    dispatch({ type: Action.UPDATE_PAGE, payload: response.data });
    dispatch(getListPage({ sort: 'ctime' })); // Dispatch getListSlider after publishing

  } catch (err) {
    console.log(err)
    return err.response.data

  }

};
export const PagePublished = (data) => async (dispatch) => {

  try {
    const response = await PostData('/page/publishPage',
      data
    );
    console.log('response:', response)
    dispatch({ type: Action.PUBLISHED, payload: response.data });
    dispatch(getListPage({ sort: 'ctime' })); // Dispatch getListSlider after publishing

  } catch (err) {
    console.log(err)
    return err.response.data

  }

};

export const PageUnPublished = (data) => async (dispatch) => {

  try {
    const response = await PostData('/page/unpublishPage',
      data
    );
    console.log('response:', response);
    dispatch({ type: Action.UNPUBLISHED, payload: response.data });
    dispatch(getListPage({ sort: 'ctime' })); // Dispatch getListSlider after publishing
  } catch (err) {
    console.log(err)
    return err.response.data

  }

};
export const TrashPage = (data) => async (dispatch) => {

  try {
    const response = await PostData('/page/deletePageById',
      data
    );
    console.log('response:', response)
    dispatch({ type: Action.DELETETRASH, payload: response.data });
    dispatch(getListPage({ sort: 'ctime' })); // Dispatch getListSlider after publishing
    dispatch(ListTrashPage1({ sort: 'ctime' }));

  } catch (err) {
    console.log(err)
    return err.response.data

  }

};
export const ListTrashPage1 = (data) => async (dispatch) => {
  try {
    const response = await PostData('/page/getDeletePageList',
      data
    );
    console.log('response:', response)
    return dispatch({ type: Action.LISTTRASH, payload: response.data });
  } catch (err) {
    console.log(err)
    return err.response.data

  }

};

export const PageRestore = (data) => async (dispatch) => {

  try {
    const response = await PostData('/page/restorePageById',
      data
    );
    console.log('response:', response)
    dispatch({ type: Action.RESTORE, payload: response.data });
    dispatch(getListPage({ sort: 'ctime' })); // Dispatch getListSlider after publishing
  } catch (err) {
    console.log(err)
    return err.response.data

  }

};
export const RemovePage = (data) => async (dispatch) => {

  try {
    const response = await PostData('/page/removePage',
      data
    );
    console.log('response:', response)
    dispatch({ type: Action.DELETE, payload: response.data });
    dispatch(getListPage({ sort: 'ctime' })); // Dispatch getListSlider after publishing
    dispatch(ListTrashPage1({ sort: 'ctime' }));
  } catch (err) {
    console.log(err)
    return err.response.data

  }

};
