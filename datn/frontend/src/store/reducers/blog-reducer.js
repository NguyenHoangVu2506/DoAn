import { Action } from '../actions'

const initialState = {
    allBlog: null,
    onBlogByTopicId: null,
    blogDetails:null,
}


const BlogReducer = (state = initialState, action) => {

    switch (action.type) {
        case Action.GET_BLOGLIST:
            return {
                ...state,
                allBlog: action.payload.metaData
            }
        case Action.GET_BLOG_TOPIC_ID:
            return {
                ...state,
                onBlogByTopicId: action.payload.metaData
            }
        case Action.GET_BLOG_DETAILS:
            return {
                ...state,
                blogDetails: action.payload.metaData
            }

        default:
            return state;
    }

}

export default BlogReducer
