// RFF demo project
// LoginReducer.js
// creates reducer to Redux global state for application to use - login

import User from '../../classes/User';

const initialState = {
  user: null
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'loginSuccess':
    return {...state, user: new User(action.user)};
  case 'loginFailure':
    return {...state};
  case 'logout':
    return {...initialState};
  default:
    return state;
  }
};

export const loginFailure = () => {
  return async dispatch => {
    dispatch({type: 'loginFailure'});
  };
};
export const loginSuccess = (user) => {
  return async dispatch => {
    dispatch({type: 'loginSuccess', user: user});
  };
};
export const logout = () => {
  return async dispatch => {
    dispatch({type: 'logout'});
  };
};

export default LoginReducer;