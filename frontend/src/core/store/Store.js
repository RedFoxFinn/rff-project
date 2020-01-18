import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import AppReducer from './reducers/AppReducer';
import CountryReducer from './reducers/CountryReducer';
import LoginReducer from './reducers/LoginReducer';
import RegReducer from './reducers/RegReducer';
import DishyReducer from './reducers/DishyReducer';

const reducers = combineReducers({
  appState: AppReducer,
  countryState: CountryReducer,
  loginState: LoginReducer,
  regState: RegReducer,
  dishyState: DishyReducer
});

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;