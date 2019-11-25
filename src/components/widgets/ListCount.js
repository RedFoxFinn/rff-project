import React from 'react';
import {connect} from "react-redux";

import classProvider from '../../tools/classProvider';
import '../../style/global.css';

const mapStateToProps = (state) => {
  return {
    appState: state.appState
  }
};

const ListCount = (props) => {
  const data = 0;
  
  const Count = () => {
    if (props.mode === 'admin') {
      return (
        <p className={classProvider(props.appState.theme, 'description')}><strong>all</strong> task lists accessible</p>
      );
    } else {
      return (
        <p className={classProvider(props.appState.theme, 'description')}><strong>{data}</strong> task lists accessible</p>
      );
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

export default connect(mapStateToProps)(ListCount);