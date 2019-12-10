import React from 'react';
import {connect} from 'react-redux';
import {useQuery} from '@apollo/react-hooks';

import classProvider from '../../core/tools/classProvider';
import '../../core/style/global.css';
import {METHOD_COUNT} from '../../core/graphql/queries/q_methodCount.js';

const mapStateToProps = (state) => {
  return {
    appState: state.appState
  };
};

const MethodCount = (props) => {
  const methodResult = useQuery(METHOD_COUNT);
  let data = 0;

  const Count = () => {
    if (!methodResult.loading) {
      if (methodResult.data) {
        data = methodResult.data.methodCount;
        return (
          <p className={classProvider(props.appState.theme, 'description')}>
            <strong>{data}</strong> cooking methods available</p>
        );
      }
    }
    return (
      <p className={classProvider(props.appState.theme, 'description')}>
        <strong>fetching</strong> count for cooking methods</p>
    );
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

export default connect(mapStateToProps)(MethodCount);