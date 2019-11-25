

const initialState = {
  user: null,
  username: '',
  password: ''
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'login':
      return {...state, user: action.user, username: '', password: ''};
    case 'logout':
      return {...state, user: null};
    case 'setUsername':
      return {...state, username: action.username};
    case 'setPassword':
      return {...state, password: action.password};
    default:
      return state;
  }
};

export default LoginReducer;