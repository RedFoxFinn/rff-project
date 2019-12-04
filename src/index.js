import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import App from './App';

import * as serviceWorker from './serviceWorker';

import store from './store/Store';
import {ApolloClient} from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {setContext} from 'apollo-link-context';
import {ApolloProvider} from '@apollo/react-hooks';
import {split} from 'apollo-link';
import {WebSocketLink} from 'apollo-link-ws';
import {getMainDefinition} from 'apollo-utilities';

const getWsUri = () => {
  switch (process.env.NODE_ENV) {
  case 'production' || 'prod' || 'PROD':
    return 'ws://kettula.herokuapp.com/api';
  case 'development' || 'dev' || 'DEV':
    return 'ws://localhost:4010/api';
  case 'testing' || 'test' || 'TEST':
    return 'ws://localhost:3000/api';
  default:
    return 'ws://localhost:4010/api';
  }
};
const getUri = () => {
  switch (process.env.NODE_ENV) {
  case 'production' || 'prod' || 'PROD':
    return 'https://kettula.herokuapp.com/api';
  case 'development' || 'dev' || 'DEV':
    return 'http://localhost:4010/api';
  case 'testing' || 'test' || 'TEST':
    return 'http://localhost:3000/api';
  default:
    return 'http://localhost:4010/api';
  }
};

const wsLink = new WebSocketLink({
  uri: getWsUri(),
  options: {reconnect: true}
});
const httpLink = createHttpLink({
  uri: getUri()
});
const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem('rffUserToken');
  return {
    headers: {
      ...headers,
      authorization: token ? token : null
    }
  };
});
const link = split(
  ({query}) => {
    const {kind, operation} = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App/>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
