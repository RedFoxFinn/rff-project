// RFF demo project
// MethodCount.js
// React component that renders method counter based on available cooking method information

import React from 'react';
import {connect} from 'react-redux';
import {useQuery} from '@apollo/react-hooks';

import classProvider from '../../core/tools/classProvider';
import '../../core/style/global.css';
import {METHOD_COUNT} from '../../core/graphql/rff/queries/q_methodCount.js';

const mapStateToProps = (state) => {
  return {
    appState: state.appState
  };
};

const MethodCount = (props) => {
  const {data, error, loading} = useQuery(METHOD_COUNT);

  const Count = () => {
    if (!loading) {
      if (!error) {
        return data.methodCount === 1
          ? <p className={classProvider(props.appState.theme, 'tileDescription')}>
            <strong>{data.methodCount}</strong> cooking method available</p>
          : <p className={classProvider(props.appState.theme, 'tileDescription')}>
            <strong>{data.methodCount}</strong> cooking methods available</p>;
      } else {
        return <p className={classProvider(props.appState.theme, 'tileError')}>
          error occurred while loading cooking method count</p>;
      }
    }
    return <p className={classProvider(props.appState.theme, 'tileLoading')}>
      loading cooking method count</p>;
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

export default connect(mapStateToProps)(MethodCount);