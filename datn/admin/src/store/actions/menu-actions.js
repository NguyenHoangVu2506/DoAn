import { Action } from "../actions";

import { PostData } from "../../utils";

export const getListMenu = (data) => async (dispatch) => {
  try {
    const response = await PostData('/menu/getListMenu', data);
    console.log('response:', response)
    return dispatch({ type: Action.GET_MENU, payload: response.data });
  } catch (err) {
    console.log(err)
  }

};
export const getMenuById = (data) => async (dispatch) => {
  try {
    const response = await PostData('/menu/getMenu', data);
    console.log('response:', response)
    return dispatch({ type: Action.GET_MENU_BY_ID, payload: response.data });
  } catch (err) {
    console.log(err)
    return err.response.data
  }

};

export const MenuStore = (data) => async (dispatch) => {

  try {
    const response = await PostData('/menu/newMenu',
      data
    );
    console.log('response:', response)
    dispatch({ type: Action.ADD_MENU, payload: response.data });
    dispatch(getListMenu({ sort: 'ctime' }));
  } catch (err) {
    console.log(err)
    return err.response.data

  }

};
export const MenuUpdate = (data) => async (dispatch) => {

  try {
    const response = await PostData('/menu/updateMenu',
      data
    );
    console.log('response:', response)
    dispatch({ type: Action.UPDATED_MENU, payload: response.data });
    dispatch(getListMenu({ sort: 'ctime' }));
  } catch (err) {
    console.log(err)
    return err.response.data

  }

};
export const MenuPublished = (data) => async (dispatch) => {

  try {
    const response = await PostData('/menu/publishMenu',
      data
    );
    console.log('response:', response)
    dispatch({ type: Action.PUBLISHED, payload: response.data });
    dispatch(getListMenu({ sort: 'ctime' })); // Dispatch getListSlider after publishing

  } catch (err) {
    console.log(err)
    return err.response.data

  }

};

export const MenuUnPublished = (data) => async (dispatch) => {

  try {
    const response = await PostData('/menu/unpublishMenu',
      data
    );
    console.log('response:', response);
    dispatch({ type: Action.UNPUBLISHED, payload: response.data });
    dispatch(getListMenu({ sort: 'ctime' })); // Dispatch getListSlider after publishing
  } catch (err) {
    console.log(err)
    return err.response.data

  }

};
export const TrashMenu = (data) => async (dispatch) => {

  try {
    const response = await PostData('/menu/deleteMenuById',
      data
    );
    console.log('response:', response)
    dispatch({ type: Action.DELETETRASH, payload: response.data });
    dispatch(getListMenu({ sort: 'ctime' })); // Dispatch getListSlider after publishing
    dispatch(ListTrashMenu1({ sort: 'ctime' }));

  } catch (err) {
    console.log(err)
    return err.response.data

  }

};
export const ListTrashMenu1 = (data) => async (dispatch) => {
  try {
    const response = await PostData('/menu/getDeleteMenuList',
      data
    );
    console.log('response:', response)
    return dispatch({ type: Action.LISTTRASH, payload: response.data });
  } catch (err) {
    console.log(err)
    return err.response.data

  }

};

export const MenuRestore = (data) => async (dispatch) => {

  try {
    const response = await PostData('/menu/restoreMenuById',
      data
    );
    console.log('response:', response)
    dispatch({ type: Action.RESTORE, payload: response.data });
    dispatch(getListMenu({ sort: 'ctime' })); // Dispatch getListSlider after publishing
  } catch (err) {
    console.log(err)
    return err.response.data

  }

};
export const RemoveMenu = (data) => async (dispatch) => {

  try {
    const response = await PostData('/menu/removeMenu',
      data
    );
    console.log('response:', response)
    dispatch({ type: Action.DELETE, payload: response.data });
    dispatch(getListMenu({ sort: 'ctime' })); // Dispatch getListSlider after publishing
    dispatch(ListTrashMenu1({ sort: 'ctime' }));
  } catch (err) {
    console.log(err)
    return err.response.data

  }

};
