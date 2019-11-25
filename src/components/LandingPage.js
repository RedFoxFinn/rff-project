import React from 'react';
import {connect} from 'react-redux';

import classProvider from '../tools/classProvider';
import '../style/global.css';
import '../style/landing.css';

const mapStateToProps = (state) => {
  return {
    appState: state.appState,
    loginState: state.loginState
  };
};

const LandingPage = (props) => {

  const Locked = () => {
    return(
      <div className='landingElements'>
        <p className={classProvider(props.appState.theme, 'landingDescription')}>Some applications are available only for registered and logged users.</p>
        <p className={classProvider(props.appState.theme, 'landingDescription')}>If you want to use these advanced features, please log in.</p>
      </div>
    );
  };

  const Unlocked = () => {
    return(
      <div className='landingElements'>
        <p className={classProvider(props.appState.theme, 'landingDescription')}>Some applications are available only for registered and logged users.</p>
        <p className={classProvider(props.appState.theme, 'landingDescription')}>You have logged in and therefore eligible to use advanced features.</p>
      </div>
    );
  };

  return(
    <div className='app'>
      <div className='appContainer'>
        {props.loginState.user === null
          ? <Locked/>
          : <Unlocked/>
        }
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(LandingPage);