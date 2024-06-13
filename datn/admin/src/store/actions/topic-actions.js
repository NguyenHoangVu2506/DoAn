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
    return dispatch({ type: Action.ADD_TOPIC, payload: response.data });

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
    return dispatch({ type: Action.UPDATE_TOPIC, payload: response.data });

  } catch (err) {
    console.log(err)
    return err.response.data

  }

};