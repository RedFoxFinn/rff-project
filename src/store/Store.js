import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import AppReducer from '../reducers/AppReducer';
import LoginReducer from "../reducers/LoginReducer";
import RegReducer from "../reducers/RegReducer";

const reducers = combineReducers({
  appState: AppReducer,
  loginStat: LoginReducer,
  regState: RegReducer
});

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;