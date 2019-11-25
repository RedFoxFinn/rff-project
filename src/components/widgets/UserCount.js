import React from 'react';
import {connect} from "react-redux";

import classProvider from '../../tools/classProvider';
import '../../style/global.css';

const mapStateToProps = (state) => {
  return {
    appState: state.appState
  }
};

const UserCount = (props) => {
  const data = 0;
  
  const Count = () => {
    if (props.mode === 'admin') {
      return (
        <p className={classProvider(props.appState.theme, 'description')}>application has <strong>{data}</strong> users</p>
      );
    } else {
      return null;
    }
  };
  
  return(
    <div className='appWidget'>
      <div className='app'>
        <div className='appContainer'>
          <Count/>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(UserCount);