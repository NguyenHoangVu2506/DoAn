import { PostData } from "../../utils";
import { Action } from "../actions";

export const productImageList = (data) => async (dispatch) => {

    try {
        const response = await PostData('/gallery/image_spu_id', data);
        console.log('response:', response)
        return dispatch({ type: Action.GET_IMAGE_LIST, payload: response.data });
    } catch (err) {
        console.log(err)
  
    }

};