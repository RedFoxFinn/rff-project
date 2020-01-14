import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {ApolloClient} from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {setContext} from 'apollo-link-context';
import {ApolloProvider} from '@apollo/react-hooks';
import {split} from 'apollo-link';
import {WebSocketLink} from 'apollo-link-ws';
import {getMainDefinition} from 'apollo-utilities';

import './core/style/root.css';

import Navigation from './components/Navigation';
import AdminTools from './components/AdminTools';
import About from './components/About';
import Calculate from './components/Calculate';
import Dashboard from './components/Dashboard';
import Dishy from './components/Dishy';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import OpenCountry from './components/OpenCountry';
import RegistrationPage from './components/RegistrationPage';
import Tasker from './components/Tasker';
import Transporter from './components/Transporter';
import Connector from './core/services/Connector';
import UserPage from './components/UserSettings';

import {initCountries} from './core/store/reducers/CountryReducer';
import {switchApp} from './core/store/reducers/AppReducer';

const mapDispatchToProps = {
  initCountries, switchApp
};
const mapStateToProps = (state) => {
  return {
    theme: state.appState.theme,
    app: state.appState.application,
    dishyState: state.dishyState,
    user: state.loginState.user
  };
};

const getWsUriRff = () => {
  return process.env.NODE_ENV === 'production'
    ? '/graphql'
    : 'ws://localhost:4010/graphql';
};
const getUriRff = () => {
  return process.env.NODE_ENV === 'production'
    ? '/graphql'
    : 'http://localhost:4010/graphql';
};
const getUriHsl = () => {
  return 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';
};

const wsLink = new WebSocketLink({
  uri: getWsUriRff(),
  options: {reconnect: true}
});
const httpLink = createHttpLink({
  uri: getUriRff(),
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
const rffLink = split(
  ({query}) => {
    const {kind, operation} = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  authLink.concat(httpLink)
);

const hslLink = createHttpLink({
  uri: getUriHsl()
});

const rffClient = new ApolloClient({
  link: rffLink,
  cache: new InMemoryCache(),
  connectToDevTools: process.env.NODE_ENV === 'development'
});

const hslClient = new ApolloClient({
  link: hslLink,
  cache: new InMemoryCache(),
  connectToDevTools: process.env.NODE_ENV === 'development'
});

const App = (props) => {
  const url = window.location.href;
  useEffect(() => {
    document.body.className = props.theme;
  });
  useEffect(() => {
    switch (url) {
    case RegExp(/about/).test(url):
      props.switchApp('About');
      break;
    case RegExp(/admin/).test(url):
      props.switchApp('Admin tools');
      break;
    case RegExp(/calculate/).test(url):
      props.switchApp('Calculate');
      break;
    case RegExp(/countries/).test(url):
      props.switchApp('OpenCountry');
      break;
    case RegExp(/dashboard/).test(url):
      props.switchApp('Dashboard');
      break;
    case RegExp(/dishy/).test(url):
      props.switchApp('Dishy');
      break;
    case RegExp(/home/).test(url):
      props.switchApp('Home');
      break;
    case RegExp(/tasker/).test(url):
      props.switchApp('Tasker');
      break;
    case RegExp(/transit/).test(url):
      props.switchApp('Transporter');
      break;
    case RegExp(/login/).test(url):
      props.switchApp('Login');
      break;
    default:
      props.switchApp('Home');
      break;
    }
  }, [props, url]);
  useEffect(() => {
    async function init() {
      await Connector.getCountries().then(response => {
        props.initCountries(response.data);
      });
    }
    init();
  }, [props]);

  return(
    <div className='appContainer'>
      <Router basename='/'>
        <ApolloProvider client={rffClient}>
          <Navigation/>
          <Switch>
            <Route exact path='/' render={(props) => <LandingPage {...props} show={true}/>}/>
            <Route path='/about' render={(props) => <About {...props} show={true}/>}/>
            <Route path='/admin' render={(props) => <AdminTools {...props} show={true}/>}/>
            <Route path='/calculate' render={(props) => <Calculate {...props} show={true}/>}/>
            <Route path='/countries' render={(props) => <OpenCountry {...props} show={true}/>}/>
            <Route path='/dashboard' render={(props) => <Dashboard {...props} show={true}/>}/>
            <Route path='/dishy' render={(props) => <Dishy {...props} show={true}/>}/>
            <Route path='/login' render={(props) => <LoginPage {...props} show={true}/>}/>
            <Route path='/register' render={(props) => <RegistrationPage {...props} show={true}/>}/>
            <Route path='/tasker' render={(props) => <Tasker {...props} show={true}/>}/>
            <Route path='/user' render={(props) => <UserPage {...props} show={true}/>}/>
          </Switch>
        </ApolloProvider>
        <ApolloProvider client={hslClient}>
          <Switch>
            <Route path='/transit' render={(props) => <Transporter {...props}/>}/>
          </Switch>
        </ApolloProvider>
      </Router>
    </div>
  );
};



export default connect(mapStateToProps, mapDispatchToProps)(App);
