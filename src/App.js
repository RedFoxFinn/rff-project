import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

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
import Tasker from './components/Tasker';
import Transporter from './components/Transporter';
import Connector from './core/services/Connector';

import {initCountries} from './core/store/reducers/CountryReducer';

const mapDispatchToProps = {
  initCountries
};
const mapStateToProps = (state) => {
  return {
    appState: state.appState,
    dishyState: state.dishyState
  };
};

const App = (props) => {
  useEffect(() => {
    document.body.className = props.appState.theme;
  });
  useEffect(() => {
    async function init() {
      await Connector.getCountries().then(response => {
        props.initCountries(response.data);
      });
    }
    init();
  }, []);

  return(
    <div className='appContainer'>
      <Router>
        <Navigation/>
        <Switch>
          <Route exact path='/' render={(props) => <LandingPage {...props}/>}/>
          <Route path='/about' render={(props) => <About {...props}/>}/>
          <Route path='/admin' render={(props) => <AdminTools {...props}/>}/>
          <Route path='/calculate' render={(props) => <Calculate {...props}/>}/>
          <Route path='/dashboard' render={(props) => <Dashboard {...props}/>}/>
          <Route path='/dishy' render={(props) => <Dishy {...props}/>}/>
          <Route path='/login' render={(props) => <LoginPage {...props}/>}/>
          <Route path='/countries' render={(props) => <OpenCountry {...props}/>}/>
          <Route path='/tasker' render={(props) => <Tasker {...props}/>}/>
          <Route path='/transit' render={(props) => <Transporter {...props}/>}/>
        </Switch>
      </Router>
    </div>
  );
};



export default connect(mapStateToProps, mapDispatchToProps)(App);
