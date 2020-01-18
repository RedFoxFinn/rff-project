

const initialState = {
  user: null,
  username: '',
  password: ''
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

export default LoginReducer;