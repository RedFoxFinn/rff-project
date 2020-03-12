// RFF demo project
// App.js
// webapp file - provides Redux store and Apollo clients for application components
// creates client side routing for webapp with React Router
// creates base structure for app layout


// imports
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {HashRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {ApolloClient} from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {setContext} from 'apollo-link-context';
import {ApolloProvider} from '@apollo/react-hooks';
import {split} from 'apollo-link';
import {WebSocketLink} from 'apollo-link-ws';
import {getMainDefinition} from 'apollo-utilities';
import {loginSuccess} from './core/store/reducers/LoginReducer';
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
import {handleError, handleInfo, switchApp} from './core/store/reducers/AppReducer';
import {ME} from './core/graphql/rff/queries/q_me';

// prop mappings for Redux global state & thunk helper functions
const mapDispatchToProps = {
  initCountries, switchApp, loginSuccess, handleError, handleInfo
};
const mapStateToProps = (state) => {
  return {
    theme: state.appState.theme,
    app: state.appState.application,
    dishyState: state.dishyState,
    loginState: state.loginState
  };
};

// ApolloClient definitions: links & clients for different sections of the webapp
const wsLink = new WebSocketLink({
  uri: process.env.NODE_ENV === 'development'
    ? 'ws://localhost:4010/graphql'
    : process.env.REACT_APP_RFF_WEBSOCKET,
  options: {reconnect: true}
});
const httpLink = createHttpLink({
  uri: process.env.NODE_ENV === 'development'
    ? 'http://localhost:4010/graphql'
    : process.env.REACT_APP_RFF_ENDPOINT
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
  uri: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql'
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
  const loginToken = localStorage.getItem('rffUserToken');

  // hook that handles webapp background styling
  useEffect(() => {
    document.body.className = props.theme;
  });
  // hook that handles querying data from country API for webapp
  useEffect(() => {
    async function init() {
      await Connector.getCountries().then(response => {
        props.initCountries(response.data);
      });
    }
    init();
  }, [props]);
  // hook that handles restoring login if localstorage already has token stored
  useEffect(() => {
    loginToken !== null && rffClient.query({
      query: ME,
      variables: {
        token: loginToken.substring(7)
      }
    }).then((result, errors) => {
      if (!errors) {
        props.loginSuccess(result.data.me);
        props.handleInfo('Login restored');
      } else {
        props.handleError(errors[0]);
      }
    });
  }, [loginToken, rffClient]);

  // webapp definitions: provides routing for most webapp sections
  const Rff = () => {
    const {user} = props.loginState;
    return (
      <Switch>
        <Route exact path='/' render={(props) => <LandingPage {...props} show={true}/>}/>
        <Route path='/about' render={(props) => <About {...props} show={true}/>}/>
        <Route path='/admin' render={(props) => <AdminTools {...props}
          show={loginToken !== null && user !== null && (user.getRole() === 'admin' || user.getRole() === 'owner')}/>}/>
        <Route path='/calculate' render={(props) => <Calculate {...props} show={true}/>}/>
        <Route path='/countries' render={(props) => <OpenCountry {...props} show={true}/>}/>
        <Route path='/dashboard' render={(props) => <Dashboard {...props} show={loginToken !== null ? 'advanced' : 'common'}/>}/>
        <Route path='/dishy' render={(props) => <Dishy {...props} show={loginToken !== null ? 'advanced' : 'common'}/>}/>
        <Route path='/login' render={(props) => <LoginPage {...props} show={loginToken === null}/>}/>
        <Route path='/register' render={(props) => <RegistrationPage {...props} show={loginToken === null}/>}/>
        <Route path='/tasker' render={(props) => <Tasker {...props} show={loginToken !== null}/>}/>
        <Route path='/user' render={(props) => <UserPage {...props} show={loginToken !== null}/>}/>
      </Switch>
    );
  };

  // webapp definitions: provides routing for public transport information section
  const Hsl = () => {
    return (
      <Switch>
        <Route path='/transit' render={(props) => <Transporter {...props}/>}/>
      </Switch>
    );
  };

  // webapp definitions: provides navigation & correct ApolloClients for the different sections of the webapp
  return (
    <div className='appContainer'>
      <Router basename='/'>
        <ApolloProvider client={rffClient}>
          <Navigation/>
          <Rff/>
        </ApolloProvider>
        <ApolloProvider client={hslClient}>
          <Hsl/>
        </ApolloProvider>
      </Router>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
