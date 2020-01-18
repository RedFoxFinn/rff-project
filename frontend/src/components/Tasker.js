import React from 'react';
import {connect} from 'react-redux';

import classProvider from '../core/tools/classProvider';
import '../core/style/global.css';

const mapStateToProps = (state) => {
  return {
    appState: state.appState
  };
};

const Tasker = (props) => {
  return(
    <div className='app'>
      <div className='appContainer'>
        <p>Tasker</p>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Tasker);