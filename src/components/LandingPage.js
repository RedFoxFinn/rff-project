import React from 'react';
import {connect} from 'react-redux';

import classProvider from '../core/tools/classProvider';
import '../core/style/global.css';

const mapStateToProps = (state) => {
  return {
    appState: state.appState,
    loginState: state.loginState
  };
};

const LandingPage = (props) => {

  const Locked = () => {
    return(
      <div className='commonElements'>
        <p className={classProvider(props.appState.theme, 'description')}>Some applications are available only for registered and logged users.</p>
        <p className={classProvider(props.appState.theme, 'description')}>If you want to use these advanced features, please log in.</p>
      </div>
    );
  };

  const Unlocked = () => {
    return(
      <div className='commonElements'>
        <p className={classProvider(props.appState.theme, 'description')}>Some applications are available only for registered and logged users.</p>
        <p className={classProvider(props.appState.theme, 'description')}>You have logged in and therefore eligible to use advanced features.</p>
      </div>
    );
  };

  return(
    <div className='app'>
      <div className='container'>
        {props.loginState.user === null
          ? <Locked/>
          : <Unlocked/>
        }
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(LandingPage);