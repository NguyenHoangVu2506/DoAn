import { Action } from ".";
import { PostData } from "../../utils";


export const getListSlider = (data) => async (dispatch) => {
    try {
        const response = await PostData('/slider/listSlider', data);
        console.log('response:', response)
        return dispatch({ type: Action.GET_SLIDER, payload: response.data });
    } catch (err) {
        console.log(err)
        return err.response.data
    }

};

