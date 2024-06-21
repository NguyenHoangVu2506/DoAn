import { Action } from "../actions";
import { PostData } from "../../utils";


export const getListBlog = (data) => async (dispatch) => {
    try {
        const response = await PostData('/blog/listblog', data);
        console.log('response:', response)
        return dispatch({ type: Action.GET_BLOGLIST, payload: response.data });
    } catch (err) {
        console.log(err)
  
    }
};

export const getBlogDetails = (data) => async (dispatch) => {
    try {
        const response = await PostData('/blog/getBlogDetails', data);
        console.log('response:', response)
        return dispatch({ type: Action.GET_BLOG_DETAILS, payload: response.data });
    } catch (err) {
        console.log(err)
  
    }

};

export const getBlogByTopicId = (data) => async (dispatch) => {
    try {
        const response = await PostData('/blog/listBlogByTopicId', data);
        console.log('response:', response)
        return dispatch({ type: Action.GET_BLOG_TOPIC_ID, payload: response.data });
    } catch (err) {
        console.log(err)
  
    }

};
export const BlogStore = (data) => async (dispatch) => {

    try {
        const response = await PostData('/blog',
            data
        );
        console.log('response:', response)
        dispatch({ type: Action.ADD_BLOG, payload: response.data });
        dispatch(getListBlog({ sort: 'ctime' }));

    } catch (err) {
        console.log(err)
  

    }

};
export const getBlogById = (data) => async (dispatch) => {
    try {
        const response = await PostData('/blog/findOneBlog', data);
        console.log('response:', response)
        return dispatch({ type: Action.GET_BLOG_BY_ID, payload: response.data });
    } catch (err) {
        console.log(err)
  
    }

};
export const BlogUpdate = (data) => async (dispatch) => {

    try {
        const response = await PostData('/blog/updateBlog',
            data
        );
        console.log('response:', response)
        dispatch({ type: Action.UPDATE_BLOG, payload: response.data });
        dispatch(getListBlog({ sort: 'ctime' }));
    } catch (err) {
        console.log(err)
  

    }

};
export const BlogPublished = (data) => async (dispatch) => {

    try {
        const response = await PostData('/blog/pulishBlog',
            data
        );
        console.log('response:', response)
        dispatch({ type: Action.PUBLISHED, payload: response.data });
        dispatch(getListBlog({ sort: 'ctime' })); // Dispatch getListSlider after publishing

    } catch (err) {
        console.log(err)
  

    }

};

export const BlogUnPublished = (data) => async (dispatch) => {

    try {
        const response = await PostData('/blog/unpulishBlog',
            data
        );
        console.log('response:', response);
        dispatch({ type: Action.UNPUBLISHED, payload: response.data });
        dispatch(getListBlog({ sort: 'ctime' })); // Dispatch getListSlider after publishing
    } catch (err) {
        console.log(err)
  

    }

};
export const TrashBlog = (data) => async (dispatch) => {

    try {
        const response = await PostData('/blog/deleteBlogById',
            data
        );
        console.log('response:', response)
        dispatch({ type: Action.DELETETRASH, payload: response.data });
        dispatch(getListBlog({ sort: 'ctime' })); // Dispatch getListSlider after publishing
        dispatch(ListTrashBlog1({ sort: 'ctime' }));

    } catch (err) {
        console.log(err)
  

    }

};
export const ListTrashBlog1 = (data) => async (dispatch) => {
    try {
        const response = await PostData('/blog/getDeleteBlogList',
            data
        );
        console.log('response:', response)
        return dispatch({ type: Action.LISTTRASH, payload: response.data });
    } catch (err) {
        console.log(err)
  

    }

};

export const BlogRestore = (data) => async (dispatch) => {

    try {
        const response = await PostData('/blog/restoreBlogById',
            data
        );
        console.log('response:', response)
        dispatch({ type: Action.RESTORE, payload: response.data });
        dispatch(getListBlog({ sort: 'ctime' })); // Dispatch getListSlider after publishing
    } catch (err) {
        console.log(err)
  

    }

};
export const RemoveBlog = (data) => async (dispatch) => {

    try {
        const response = await PostData('/blog/removeBlog',
            data
        );
        console.log('response:', response)
        dispatch({ type: Action.DELETE, payload: response.data });
        dispatch(getListBlog({ sort: 'ctime' })); // Dispatch getListSlider after publishing
        dispatch(ListTrashBlog1({ sort: 'ctime' }));
    } catch (err) {
        console.log(err)
  

    }

};
