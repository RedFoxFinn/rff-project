
const initialState = {
  carbSearch: '',
  proteinSearch: '',
  spiceSearch: '',
  methodSearch: '',
  newDish: false,
  newDishCarbs: [],
  newDishProteins: [],
  newDishSpices: [],
  newDishMethods: [],
  newDishName: '',
  newDishNote: ''
};

const DishyReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'setCarbSearch':
    return {...state, carbSearch: action.carbSearch};
  case 'setProteinSearch':
    return {...state, proteinSearch: action.proteinSearch};
  case 'setSpiceSearch':
    return {...state, spiceSearch: action.spiceSearch};
  case 'setMethodSearch':
    return {...state, methodSearch: action.methodSearch};
  case 'setNewDish':
    return {...state, newDish: true};
  case 'setNewDishName':
    return {...state, newDishName: action.newDishName};
  case 'setNewDishNote':
    return {...state, newDishNote: action.newDishNote};
  case 'setNewDishCarbs':
    return {...state, newDishCarbs: [...state.newDishCarbs, action.carb]};
  case 'setNewDishProteins':
    return {...state, newDishProteins: [...state.newDishProteins, action.protein]};
  case 'setNewDishSpices':
    return {...state, newDishSpices: [...state.newDishSpices, action.spice]};
  case 'setNewDishMethods':
    return {...state, newDishMethods: [...state.newDishMethods, action.method]};
  case 'resetNewDish':
    return {...state, newDish: false, newDishCarbs: [], newDishProteins: [], newDishSpices: [], newDishMethods: [], newDishName: '', newDishNote: ''};
  default:
    return state;
  }
};

export const initDish = () => {
  return async dispatch => {
    dispatch({
      type: 'setNewDish'
    });
  };
};

export const resetDish = () => {
  return async dispatch => {
    dispatch({
      type: 'resetNewDish'
    });
  };
};

export const addDishCarb = (carb) => {
  return async dispatch => {
    dispatch({
      type: 'setNewDishCarbs', carb: {name: carb.name, id: carb.id}
    });
  };
};

export const addDishProtein = (protein) => {
  return async dispatch => {
    dispatch({
      type: 'setNewDishProteins', protein: {name: protein.name, id: protein.id}
    });
  };
};

export const addDishSpice = (spice) => {
  return async dispatch => {
    dispatch({
      type: 'setNewDishSpices', spice: {name: spice.name, id: spice.id}
    });
  };
};

export const addDishMethod = (method) => {
  return async dispatch => {
    dispatch({
      type: 'setNewDishMethods', method: {name: method.name, id: method.id}
    });
  };
};

export const initDishNote = (note) => {
  return async dispatch => {
    dispatch({
      type: 'setNewDishNote', newDishNote: note
    });
  };
};

export const resetDishNote = () => {
  return async dispatch => {
    dispatch({
      type: 'setNewDishNote', newDishNote: ''
    });
  };
};

export const initDishName = (name) => {
  return async dispatch => {
    dispatch({
      type: 'setNewDishName', newDishName: name
    });
  };
};

export const resetDishName = () => {
  return async dispatch => {
    dispatch({
      type: 'setNewDishName', newDishName: ''
    });
  };
};

export const setSearchCarb = (search) => {
  return async dispatch => {
    dispatch({
      type: 'setCarbSearch', carbSearch: search
    });
  };
};

export const setSearchProtein = (search) => {
  return async dispatch => {
    dispatch({
      type: 'setProteinSearch', proteinSearch: search
    });
  };
};

export const setSearchSpice = (search) => {
  return async dispatch => {
    dispatch({
      type: 'setSpiceSearch', spiceSearch: search
    });
  };
};

export const setSearchMethod = (search) => {
  return async dispatch => {
    dispatch({
      type: 'setMethodSearch', methodSearch: search
    });
  };
};

export const resetSearchCarb = () => {
  return async dispatch => {
    dispatch({
      type: 'setCarbSearch', carbSearch: ''
    });
  };
};

export const resetSearchProtein = () => {
  return async dispatch => {
    dispatch({
      type: 'setProteinSearch', proteinSearch: ''
    });
  };
};

export const resetSearchSpice = () => {
  return async dispatch => {
    dispatch({
      type: 'setSpiceSearch', spiceSearch: ''
    });
  };
};

export const resetSearchMethod = () => {
  return async dispatch => {
    dispatch({
      type: 'setMethodSearch', methodSearch: ''
    });
  };
};

export default DishyReducer;