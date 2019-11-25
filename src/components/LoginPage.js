import React from 'react';
import {connect} from 'react-redux';

import classProvider from '../tools/classProvider';
import '../style/global.css';

const mapStateToProps = (state) => {
  return {
    appState: state.appState
  };
};

const LoginPage = (props) => {
  return(
    <div>
      <p>LoginPage</p>
    </div>
  );
};

export default connect(mapStateToProps)(LoginPage);