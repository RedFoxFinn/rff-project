

const initialState = {
  user: null
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'loginSuccess':
    return {...state, user: action.user};
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