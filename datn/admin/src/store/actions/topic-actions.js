import { Action } from ".";
import { PostData } from "../../utils";


export const getTopic = (data) => async (dispatch) => {
  try {
    const response = await PostData('/topic/allTopic', data);
    console.log('response:', response)
    return dispatch({ type: Action.GET_TOPIC, payload: response.data });
  } catch (err) {
    console.log(err)
    return err.response.data
  }

};
export const TopicStore = (data) => async (dispatch) => {

  try {
    const response = await PostData('/topic',
      data
    );
    console.log('response:', response)
    dispatch({ type: Action.ADD_TOPIC, payload: response.data });
    dispatch(getTopic({ sort: 'ctime' }));
  } catch (err) {
    console.log(err)
    return err.response.data

  }

};
export const getTopicById = (data) => async (dispatch) => {
  try {
    const response = await PostData('/topic/findTopicById', data);
    console.log('response:', response)
    return dispatch({ type: Action.GET_TOPIC_BY_ID, payload: response.data });
  } catch (err) {
    console.log(err)
    return err.response.data
  }
};
export const TopicUpdate = (data) => async (dispatch) => {

  try {
    const response = await PostData('/topic/updateTopic',
      data
    );
    console.log('response:', response)
    dispatch({ type: Action.UPDATE_TOPIC, payload: response.data });
    dispatch(getTopic({ sort: 'ctime' }));
  } catch (err) {
    console.log(err)
    return err.response.data

  }

};
export const TopicPublished = (data) => async (dispatch) => {

  try {
    const response = await PostData('/topic/pulishTopic',
      data
    );
    console.log('response:', response)
    dispatch({ type: Action.PUBLISHED, payload: response.data });
    dispatch(getTopic({ sort: 'ctime' })); // Dispatch getListSlider after publishing

  } catch (err) {
    console.log(err)
    return err.response.data

  }

};

export const TopicUnPublished = (data) => async (dispatch) => {

  try {
    const response = await PostData('/topic/unpulishTopic',
      data
    );
    console.log('response:', response);
    dispatch({ type: Action.UNPUBLISHED, payload: response.data });
    dispatch(getTopic({ sort: 'ctime' })); // Dispatch getListSlider after publishing
  } catch (err) {
    console.log(err)
    return err.response.data

  }

};
export const TrashTopic = (data) => async (dispatch) => {

  try {
    const response = await PostData('/topic/deleteTopicById',
      data
    );
    console.log('response:', response)
    dispatch({ type: Action.DELETETRASH, payload: response.data });
    dispatch(getTopic({ sort: 'ctime' })); // Dispatch getListSlider after publishing
    dispatch(ListTrashTopic1({ sort: 'ctime' }));

  } catch (err) {
    console.log(err)
    return err.response.data

  }

};
export const ListTrashTopic1 = (data) => async (dispatch) => {
  try {
    const response = await PostData('/topic/getDeleteTopicList',
      data
    );
    console.log('response:', response)
    return dispatch({ type: Action.LISTTRASH, payload: response.data });
  } catch (err) {
    console.log(err)
    return err.response.data

  }

};

export const TopicRestore = (data) => async (dispatch) => {

  try {
    const response = await PostData('/topic/restoreTopicById',
      data
    );
    console.log('response:', response)
    dispatch({ type: Action.RESTORE, payload: response.data });
    dispatch(getTopic({ sort: 'ctime' })); // Dispatch getListSlider after publishing
  } catch (err) {
    console.log(err)
    return err.response.data

  }

};
export const RemoveTopic = (data) => async (dispatch) => {

  try {
    const response = await PostData('/topic/removeTopic',
      data
    );
    console.log('response:', response)
    dispatch({ type: Action.DELETE, payload: response.data });
    dispatch(getTopic({ sort: 'ctime' })); // Dispatch getListSlider after publishing
    dispatch(ListTrashTopic1({ sort: 'ctime' }));
  } catch (err) {
    console.log(err)
    return err.response.data

  }

};
