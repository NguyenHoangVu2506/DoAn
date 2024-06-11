import { Action } from ".";
import { PostData } from "../../utils";


export const getListBlog = (data) => async (dispatch) => {
    try {
        const response = await PostData('/blog/listblog', data);
        console.log('response:', response)
        return dispatch({ type: Action.GET_BLOGLIST, payload: response.data });
    } catch (err) {
        console.log(err)
        return err.response.data
    }

};

export const getBlogDetails = (data) => async (dispatch) => {
    try {
        const response = await PostData('/blog/getBlogDetails', data);
        console.log('response:', response)
        return dispatch({ type: Action.GET_BLOG_DETAILS, payload: response.data });
    } catch (err) {
        console.log(err)
        return err.response.data
    }

};

export const getBlogByTopicId = (data) => async (dispatch) => {
    try {
        const response = await PostData('/blog/listBlogByTopicId', data);
        console.log('response:', response)
        return dispatch({ type: Action.GET_BLOG_TOPIC_ID, payload: response.data });
    } catch (err) {
        console.log(err)
        return err.response.data
    }

};