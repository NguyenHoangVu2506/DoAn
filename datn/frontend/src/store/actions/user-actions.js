import { GetData, PostData } from '../../utils'
import { Action } from '../actions'


export const SetAuthToken = async (tokens) => {

  tokens ? localStorage.setItem("tokens", JSON.stringify(tokens)) : localStorage.clear();

}

export const onSignup = ({ user_email, user_password, user_name }) => async (dispatch) => {

  try {
    const response = await PostData('/user/signup', {
      user_email, user_password, user_name
    });
    console.log('response:', response)
    return dispatch({ type: Action.SIGNUP, payload: response.data });

  } catch (err) {
    console.log(err)
    return err.response.data

  }

};

export const onLogin = ({ user_email, user_password }) => async (dispatch) => {

  try {

    const response = await PostData('/user/login', {
      user_email, user_password
    });
    const tokens = await response.data.metaData.tokens
    console.log("tokens", tokens)
    await SetAuthToken(tokens);

    return dispatch({ type: Action.LOGIN, payload: response.data });

  } catch (err) {
    console.error(err);
    return err.response.data
  }
};

export const onLoginWithFacebook = ({ userId, provider }) => async (dispatch) => {

  try {
    console.log(' userId, provider', userId + provider)
    const response = await PostData('auth/facebook/login-success', {
      userId, provider
    });
    const tokens = await response.data.metaData.tokens
    console.log("tokens", tokens)
    await SetAuthToken(tokens);
    return dispatch({ type: Action.LOGIN_WITH_FACEBOOK, payload: response.data });

  } catch (err) {
    console.log(err)
    return err.response.data

  }
};
export const onLoginWithGoogle = ({ userId, provider }) => async (dispatch) => {

  try {
    console.log(' userId, provider', userId + provider)

    const response = await PostData('/auth/google/login-success', {
      userId, provider
    });
    const tokens = await response.data.metaData.tokens
    console.log("tokens", tokens)
    await SetAuthToken(tokens);
    return dispatch({ type: Action.LOGIN_WITH_GOOGLE, payload: response.data });

  } catch (err) {
    console.log(err)
    return err.response.data

  }
};


export const onViewProfile = () => async (dispatch) => {

  try {

    const response = await GetData('/user/v1/api/customer/profile');

    return dispatch({ type: Action.PROFILE, payload: response.data });

  } catch (err) {
    console.log(err)
    return err.response.data

  }
};

export const onLogout = () => async (dispatch) => {

  try {
    const response = await PostData('/user/logout', {});
    return dispatch({ type: Action.LOGOUT, payload: response.data });
  } catch (err) {
    console.log(err)
    return err.response.data

  }

};

export const onInsertAddress = (data) => async (dispatch) => {

  try {
    const response = await PostData('/user/address', data);
    return dispatch({ type: Action.ADD_ADDRESS, payload: response.data });
  } catch (err) {
    console.log(err)
    return err.response.data

  }

};

export const onGetAddress = (data) => async (dispatch) => {

  try {
    const response = await PostData('/user/get_address', data);
    return dispatch({ type: Action.GET_ADDRESS, payload: response.data });
  } catch (err) {
    console.log(err)
    return err.response.data

  }

};