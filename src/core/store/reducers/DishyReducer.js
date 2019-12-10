
const initialState = {
  carbSearch: '',
  proteinSearch: '',
  spiceSearch: '',
  methodSearch: '',
  newCarb: '',
  newProtein: '',
  newSpice: '',
  newMethod: '',
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
  case 'resetCarbSearch':
    return {...state, carbSearch: ''};
  case 'setProteinSearch':
    return {...state, proteinSearch: action.proteinSearch};
  case 'resetProteinSearch':
    return {...state, proteinSearch: ''};
  case 'setSpiceSearch':
    return {...state, spiceSearch: action.spiceSearch};
  case 'resetSpiceSearch':
    return {...state, spiceSearch: ''};
  case 'setMethodSearch':
    return {...state, methodSearch: action.methodSearch};
  case 'resetMethodSearch':
    return {...state, methodSearch: ''};
  case 'setNewCarb':
    return {...state, newCarb: action.newCarb};
  case 'resetNewCarb':
    return {...state, newCarb: ''};
  case 'setNewProtein':
    return {...state, newProtein: action.newProtein};
  case 'resetNewProtein':
    return {...state, newProtein: ''};
  case 'setNewSpice':
    return {...state, newSpice: action.newSpice};
  case 'resetNewSpice':
    return {...state, newSpice: ''};
  case 'setNewMethod':
    return {...state, newMethod: action.newMethod};
  case 'resetNewMethod':
    return {...state, newMethod: ''};
  case 'setNewDishName':
    return {...state, newDishName: action.newDishName};
  case 'resetNewDishName':
    return {...state, newDishName: ''};
  case 'setNewDishNote':
    return {...state, newDishNote: action.newDishNote};
  case 'resetNewDishNote':
    return {...state, newDishNote: ''};
  case 'setNewDishCarbs':
    return {...state, newDishCarbs: action.carbs};
  case 'setNewDishProteins':
    return {...state, newDishProteins: action.proteins};
  case 'setNewDishSpices':
    return {...state, newDishSpices: action.spices};
  case 'setNewDishMethods':
    return {...state, newDishMethods: action.methods};
  case 'resetNewDish':
    return {...state, newDishCarbs: [], newDishProteins: [], newDishSpices: [], newDishMethods: [], newDishName: '', newDishNote: ''};
  default:
    return state;
  }
};

export default DishyReducer;