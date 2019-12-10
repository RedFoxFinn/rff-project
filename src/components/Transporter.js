import React from 'react';
import {connect} from "react-redux";

import classProvider from '../core/tools/classProvider';
import '../core/style/global.css';

const mapStateToProps = (state) => {
  return {
    appState: state.appState
  }
};

const Transporter = (props) => {
  return(
    <div>
      <p>Transporter</p>
    </div>
  );
};

export default connect(mapStateToProps)(Transporter);