

const initialState = {
  user: null,
  username: '',
  password: '',
  newUsername: '',
  newPassword: '',
  newPasswordConfirm: ''
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'loginSuccess':
    return {...state, user: action.user, username: '', password: ''};
  case 'loginFailure':
    return {...state, password: ''};
  case 'logout':
    return {...initialState};
  case 'setUsername':
    return {...state, username: action.username};
  case 'setPassword':
    return {...state, password: action.password};
  case 'setNewUsername':
    return {...state, newUsername: action.username};
  case 'setNewPassword':
    return {...state, newPassword: action.password};
  case 'setNewPasswordConfirm':
    return {...state, newPasswordConfirm: action.password};
  case 'registerFailure':
    return {...state, newPassword: '', newPasswordConfirm: ''};
  case 'registerSuccess':
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
export const setUsername = (username) => {
  return async dispatch => {
    dispatch({type: 'setUsername', username: username});
  };
};
export const setPassword = (password) => {
  return async dispatch => {
    dispatch({type: 'setPassword', password: password});
  };
};
export const logout = () => {
  return async dispatch => {
    dispatch({type: 'logout'});
  };
};

export const setNewUsername = (username) => {
  return async dispatch => {
    dispatch({type: 'setNewUsername', username: username});
  };
};
export const setNewPassword = (password) => {
  return async dispatch => {
    dispatch({type: 'setNewPassword', password: password});
  };
};
export const setNewPasswordConfirm = (password) => {
  return async dispatch => {
    dispatch({type: 'setNewPasswordConfirm', password: password});
  };
};
export const registerFailure = () => {
  return async dispatch => {
    dispatch({type: 'registerFailure'});
  };
};
export const registerSuccess = () => {
  return async dispatch => {
    dispatch({type: 'registerSuccess'});
  };
};

export default LoginReducer;