// RFF demo project
// GroupCount.js
// React component that renders group counter based on user groups in the webapp

import React from 'react';
import {connect} from 'react-redux';

import classProvider from '../../core/tools/classProvider';
import '../../core/style/global.css';
import {useQuery} from '@apollo/react-hooks';

import {GROUP_COUNT} from '../../core/graphql/rff/queries/q_groupCount';

const mapStateToProps = (state) => {
  return {
    appState: state.appState
  };
};

const GroupCount = (props) => {
  const userToken = localStorage.getItem('rffUserToken').substring(7);

  const Count = () => {
    const {data, error, loading} = useQuery(GROUP_COUNT, {
      variables: {
        token: userToken
      }
    });
    if (!loading) {
      if (!error) {
        return data.groupCount === 1
          ? <p className={classProvider(props.appState.theme, 'tileDescription')}>
            <strong>{data.groupCount}</strong> group accessible</p>
          : <p className={classProvider(props.appState.theme, 'tileDescription')}>
            <strong>{data.groupCount}</strong> groups accessible</p>;
      } else {
        return <p className={classProvider(props.appState.theme, 'tileError')}>
          error occurred while loading group count</p>;
      }
    } else {
      return <p className={classProvider(props.appState.theme, 'tileLoading')}>
        loading group count</p>;
    }
  };
  const CountAdmin = () => {
    const {data, error, loading} = useQuery(GROUP_COUNT, {
      variables: {
        token: userToken,
        mode: 'admin'
      }
    });
    if (!loading) {
      if (!error) {
        return <p className={classProvider(props.appState.theme, 'tileDescription')}>
          <strong>all {data.groupCount}</strong> groups accessible
        </p>;
      } else {
        return <p className={classProvider(props.appState.theme, 'tileError')}>
          error occurred while loading group count
        </p>;
      }
    } else {
      return <p className={classProvider(props.appState.theme, 'tileLoading')}>
        loading group count
      </p>;
    }
  };

  return(
    <div className='tile'>
      <div className='app'>
        <div className='container'>
          {props.mode !== 'admin' ? <Count/> : <CountAdmin/>}
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(GroupCount);