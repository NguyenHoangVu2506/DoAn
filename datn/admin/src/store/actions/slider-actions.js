import { Action } from ".";
import { PostData } from "../../utils";


export const getListSlider = (data) => async (dispatch, getState) => {
  try {
    const response = await PostData('/slider/listSlider', data);
    console.log('response:', response);
    dispatch({ type: Action.GET_SLIDER, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};
export const getSliderById = (data) => async (dispatch) => {
  try {
    const response = await PostData('/slider/getSliderById', data);
    console.log('response:', response)
    return dispatch({ type: Action.GET_SLIDER_BY_ID, payload: response.data });
  } catch (err) {
    console.log(err)
    return err.response.data
  }

};

export const BannerStore = (data) => async (dispatch) => {

  try {
    const response = await PostData('/slider',
      data
    );
    console.log('response:', response)
    dispatch({ type: Action.ADD_SLIDER, payload: response.data });
    dispatch(getListSlider({ sort: 'ctime' })); // Dispatch getListSlider after publishing


  } catch (err) {
    console.log(err)
    return err.response.data

  }

};

export const BannerUpdate = (data) => async (dispatch) => {

  try {
    const response = await PostData('/slider/updateSlider',
      data
    );
    console.log('response:', response)
    dispatch({ type: Action.UPDATE_SLIDER, payload: response.data });
    dispatch(getListSlider({ sort: 'ctime' })); // Dispatch getListSlider after publishing


  } catch (err) {
    console.log(err)
    return err.response.data

  }

};
export const BannerPublished = (data) => async (dispatch) => {

  try {
    const response = await PostData('/slider/pulishSlider',
      data
    );
    console.log('response:', response)
    dispatch({ type: Action.PUBLISHED, payload: response.data });
    dispatch(getListSlider({ sort: 'ctime' })); // Dispatch getListSlider after publishing

  } catch (err) {
    console.log(err)
    return err.response.data

  }

};

export const BannerUnPublished = (data) => async (dispatch) => {

  try {
    const response = await PostData('/slider/unpulishSlider',
      data
    );
    console.log('response:', response);
    dispatch({ type: Action.UNPUBLISHED, payload: response.data });
    dispatch(getListSlider({ sort: 'ctime' })); // Dispatch getListSlider after publishing
  } catch (err) {
    console.log(err)
    return err.response.data

  }

};
export const TrashBanner = (data) => async (dispatch) => {

  try {
    const response = await PostData('/slider/deleteSliderById',
      data
    );
    console.log('response:', response)
    dispatch({ type: Action.DELETETRASH, payload: response.data });
    dispatch(getListSlider({ sort: 'ctime' })); // Dispatch getListSlider after publishing
    dispatch(ListTrashBanner1({ sort: 'ctime' }));

  } catch (err) {
    console.log(err)
    return err.response.data

  }

};
export const ListTrashBanner1 = (data) => async (dispatch) => {
  try {
    const response = await PostData('/slider/getDeleteSliderList',
      data
    );
    console.log('response:', response)
    return dispatch({ type: Action.LISTTRASH, payload: response.data });
  } catch (err) {
    console.log(err)
    return err.response.data

  }

};

export const BannerRestore = (data) => async (dispatch) => {

  try {
    const response = await PostData('/slider/restoreSliderById',
      data
    );
    console.log('response:', response)
    dispatch({ type: Action.RESTORE, payload: response.data });
    dispatch(getListSlider({ sort: 'ctime' })); // Dispatch getListSlider after publishing
  } catch (err) {
    console.log(err)
    return err.response.data

  }

};
export const RemoveBanner = (data) => async (dispatch) => {

  try {
    const response = await PostData('/slider/removeSlider',
      data
    );
    console.log('response:', response)
    dispatch({ type: Action.DELETE, payload: response.data });
    dispatch(getListSlider({ sort: 'ctime' })); // Dispatch getListSlider after publishing

  } catch (err) {
    console.log(err)
    return err.response.data

  }

};




