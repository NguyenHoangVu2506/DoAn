import { Action } from ".";
import { PostData } from "../../utils";


export const uploadSingleImage = (data) => async (dispatch) => {
    try {
        const response = await PostData('/upload/uploadImageSingle', data);
        console.log('response:', response)
        return dispatch({ type: Action.UPLOAD_IMAGE_SINGLE, payload: response.data });
    } catch (err) {
        console.log(err)
        err.response.data
    }

};

