

const initialState = {
  repository: {
    url: 'https://github.com/RedFoxFinn/rff-project',
    name: 'rff-demo-project'
  },
  theme: 'light',
  application: 'Home'
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'fu':
      return {...state};
    case 'switchApplication':
      return {...state, application: action.application};
    case 'switchTheme':
      return {...state, theme: action.theme};
    default:
      return state;
  }
};

export default AppReducer;