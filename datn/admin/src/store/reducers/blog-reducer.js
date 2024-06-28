import { Action } from '../actions'

const initialState = {
    allBlog: null,
    onBlogByTopicId: null,
    blogDetails: null,
    createBlog: null,
    listBlogById: null,
    updateBlog: null,
    publishedBlog: null,
    unpublishedBlog: null,
    restoreBlog: null,
    listDelBlog: null,
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
        case Action.ADD_BLOG:
            return {
                ...state,
                createBlog: action.payload.metaData
            }
        case Action.UPDATE_BLOG:
            return {
                ...state,
                updateBlog: action.payload.metaData
            }

        case Action.GET_BLOG_BY_ID:
            return {
                ...state,
                listBlogById: action.payload.metaData
            }
        case Action.PUBLISHED:
            return {
                ...state,
                publishedBlog: action.payload.metaData
            }
        case Action.UNPUBLISHED:
            return {
                ...state,
                unpublishedBlog: action.payload.metaData
            }
        case Action.DELETETRASH:
            return {
                ...state,
                deleteTrash: action.payload.metaData,

            }
        case Action.RESTORE:
            return {
                ...state,
                restoreBlog: action.payload.metaData,
                listDelBlog: state.listDelBlog.filter(blog => blog._id !== action.payload.metaData._id)
            }
        case Action.DELETE:
            return {
                ...state,
                deleteBlog: action.payload.metaData
            }
        case Action.LISTTRASH:
            return {
                ...state,
                listDelBlog: action.payload.metaData
            }

        default:
            return state;
    }

}

export default BlogReducer
