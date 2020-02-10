import React from 'react';
import {connect} from 'react-redux';

import classProvider from '../../core/tools/classProvider';
import '../../core/style/global.css';
import '../../core/style/colors.css';

const mapStateToProps = (state) => {
  return {
    appState: state.appState
  };
};

const OtherStyles = (props) => {
  return(
    <div className='app'>
      <div className='container'>
        <h4 className={classProvider(props.appState.theme, 'heading')}>Other styles:</h4>
        <div className='appElements'>
          <a className={classProvider(props.appState.theme, 'link')} href='https://fonts.google.com/specimen/Raleway'>Font: Raleway</a>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(OtherStyles);