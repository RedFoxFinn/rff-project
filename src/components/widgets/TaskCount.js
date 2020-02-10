import React from 'react';
import {connect} from 'react-redux';

import classProvider from '../../core/tools/classProvider';
import '../../core/style/global.css';

import {TASK_COUNT} from '../../core/graphql/rff/queries/q_taskCount';
import {ALL_TASK_COUNT} from '../../core/graphql/rff/queries/q_allTaskCount';
import {useQuery} from '@apollo/react-hooks';

const mapStateToProps = (state) => {
  return {
    appState: state.appState
  };
};

const TaskCount = (props) => {
  const userToken = localStorage.getItem('rffUserToken').substring(7);

  const Count = () => {
    const {data, error, loading} = useQuery(TASK_COUNT, {
      variables: {
        token: userToken,
        countType: 'total'
      }
    });
    if (!loading) {
      if (!error) {
        return <p className={classProvider(props.appState.theme, 'tileDescription')}>
          <strong>{data.taskCount}</strong> tasks listed in accessible lists
        </p>;
      } else {
        return <p className={classProvider(props.appState.theme, 'tileError')}>
          error occurred while loading task count
        </p>;
      }
    } else {
      return <p className={classProvider(props.appState.theme, 'tileLoading')}>
        loading task count
      </p>;
    }
  };
  const CountAdmin = () => {
    const {data, error, loading} = useQuery(ALL_TASK_COUNT, {
      variables: {
        token: userToken
      }
    });
    if (!loading) {
      if (!error) {
        return <p className={classProvider(props.appState.theme, 'tileDescription')}>
          <strong>{data.allTaskCount}</strong> tasks listed in the database
        </p>;
      } else {
        return <p className={classProvider(props.appState.theme, 'tileError')}>
          error occurred while loading task count
        </p>;
      }
    } else {
      return <p className={classProvider(props.appState.theme, 'tileLoading')}>
        loading task count
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

export default connect(mapStateToProps)(TaskCount);