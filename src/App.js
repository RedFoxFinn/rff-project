import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './style/root.css';

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
import Connector from './services/Connector';

import {initCountries} from './store/reducers/CountryReducer';

const mapDispatchToProps = {
  initCountries
};
const mapStateToProps = (state) => {
  return {
    appState: state.appState
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
          <Route exact path='/' component={LandingPage}/>
          <Route path='/about' component={About}/>
          <Route path='/admin' component={AdminTools}/>
          <Route path='/calculate' component={Calculate}/>
          <Route path='/dashboard' component={Dashboard}/>
          <Route path='/dishy' component={Dishy}/>
          <Route path='/login' component={LoginPage}/>
          <Route path='/countries' component={OpenCountry}/>
          <Route path='/tasker' component={Tasker}/>
          <Route path='/transit' component={Transporter}/>
        </Switch>
      </Router>
    </div>
  );
};



export default connect(mapStateToProps, mapDispatchToProps)(App);
