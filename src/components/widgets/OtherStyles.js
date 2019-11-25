import React from 'react';
import {connect} from "react-redux";

import classProvider from '../../tools/classProvider';
import '../../style/global.css';
import '../../style/colors.css';

const mapStateToProps = (state) => {
  return {
    appState: state.appState
  }
};

const OtherStyles = (props) => {
  return(
    <div className='app'>
      <div className='appContainer'>
        <div className='appElements'>
          <h4 className={classProvider(props.appState.theme, 'heading')}>Other styles:</h4>
        </div>
        <div className='appElements'>
          <a className={classProvider(props.appState.theme, 'link')} href='https://fonts.google.com/specimen/Raleway'>Font: Raleway</a>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(OtherStyles);