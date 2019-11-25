import React from 'react';
import {connect} from 'react-redux';

import classProvider from '../tools/classProvider';
import '../style/global.css';

import Colors from './widgets/Colors';
import Technologies from './widgets/Technologies';
import OtherStyles from './widgets/OtherStyles';

const mapStateToProps = (state) => {
  return {
    appState: state.appState
  };
};

const About = (props) => {
  return(
    <div className='app'>
      <div className='appContainer'>
        <Technologies/>
        <Colors/>
        <OtherStyles/>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(About);