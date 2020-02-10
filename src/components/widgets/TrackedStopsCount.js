import React from 'react';
import {connect} from 'react-redux';

import classProvider from '../../core/tools/classProvider';
import '../../core/style/global.css';

const mapStateToProps = (state) => {
  return {
    appState: state.appState
  };
};

const TrackedStopsCount = (props) => {
  const data = 0;

  const Count = () => {
    return (
      <p className={classProvider(props.appState.theme, 'tileDescription')}><strong>{data}</strong> stops timetables tracked</p>
    );
  };

  return(
    <div className='tile'>
      <div className='app'>
        <div className='container'>
          <Count/>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(TrackedStopsCount);