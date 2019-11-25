import React from 'react';
import {connect} from "react-redux";

import classProvider from '../tools/classProvider';
import '../style/global.css';

const mapStateToProps = (state) => {
  return {
    appState: state.appState
  }
};

const Tasker = (props) => {
  return(
    <div>
      <p>Tasker</p>
    </div>
  );
};

export default connect(mapStateToProps)(Tasker);