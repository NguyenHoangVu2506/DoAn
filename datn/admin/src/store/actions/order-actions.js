import { Action } from "../actions";
import { GetData, PostData } from "../../utils";

export const getOrder= (data) => async (dispatch) => {
    try {
      const response = await GetData('/checkout/findAllOrder',data);
      console.log('response:', response)
      return dispatch({ type: Action.GET_ORDER,payload: response.data });
    } catch (err) {
      console.log(err)

    }
  
  };

  export const UpdateStatusOrder = (data) => async (dispatch) => {

    try {
      const response = await PostData('/checkout/updateStatusByOrder',
        data
      );
      console.log('response:', response)
      dispatch({ type: Action.UPDATE_STATUS, payload: response.data });
    //   dispatch(getListBrand({ sort: 'ctime' })); // Dispatch getListSlider after publishing
    //   dispatch(ListTrashBrand1({ sort: 'ctime' }));
  
    } catch (err) {
      console.log(err)
      return err.response.data
  
    }
  
  };
