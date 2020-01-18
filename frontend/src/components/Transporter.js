import React from 'react';
import {connect} from 'react-redux';

import classProvider from '../core/tools/classProvider';
import '../core/style/global.css';
import '../core/style/transporter.css';
import HslHrtIcon from './icons/hsl/HslHrtIcon';

const mapStateToProps = (state) => {
  return {
    theme: state.appState.theme,
    stops: state.loginState.user.stops
  };
};

const mapDispatchToProps = {};

const Transporter = (props) => {
  return(
    <div className='app'>
      <div className='appContainer'>
        <h5 className={classProvider(props.theme, 'heading')}>Tracked stops:</h5>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Transporter);