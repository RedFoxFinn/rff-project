

const initialState = {
  repository: {
    url: 'https://github.com/RedFoxFinn/rff-project',
    name: 'rff-demo-project'
  },
  theme: 'light',
  application: 'Home',
  notification: null
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'fu':
    return {...state};
  case 'switchApplication':
    return {...state, application: action.application};
  case 'switchTheme':
    return {...state, theme: action.theme};
  case 'setNotification':
    return {...state, notification: action.notification};
  case 'resetNotification':
    return {...state, notification: null};
  default:
    return state;
  }
};

export const switchApp = (app) => {
  return async dispatch => {
    dispatch({
      type: 'switchApplication', application: app
    });
  };
};

export const switchTheme = (theme) => {
  return async dispatch => {
    dispatch({
      type: 'switchTheme', theme: theme
    });
  };
};

export const handleError = (error) => {
  return async dispatch => {
    dispatch({
      type: 'setNotification', notification: {type: 'error', message: error.message}
    });
    setTimeout(() => {
      dispatch({
        type: 'resetNotification'
      });
    }, 4000);
  };
};
export const handleInfo = (info) => {
  return async dispatch => {
    dispatch({
      type: 'setNotification', notification: {type: 'info', message: info}
    });
    setTimeout(() => {
      dispatch({
        type: 'resetNotification'
      });
    }, 4000);
  };
};

export default AppReducer;