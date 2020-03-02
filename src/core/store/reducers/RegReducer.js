// RFF demo project
// RegReducer.js
// creates reducer to Redux global state for application to use - registration

const initialState = {
  newUserName: '',
  newUserUsername: '',
  newUserPassword: '',
  confirmNewUserPassword: ''
};

const RegReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'setNewUserName':
    return {...state, newUserName: action.name};
  case 'setNewUserUsername':
    return {...state, newUserUsername: action.username};
  case 'setNewUserPassword':
    return {...state, newUserPassword: action.password};
  case 'setConfirmNewUserPassword':
    return {...state, confirmNewUserPassword: action.password};
  case 'successfulReg':
    return {...initialState};
  case 'unsuccessfulReg':
    return {...state, newUserPassword: '', confirmNewUserPassword: ''};
  case 'resetReg':
    return {...initialState};
  default:
    return state;
  }
};

export default RegReducer;