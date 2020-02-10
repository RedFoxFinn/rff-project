import React from 'react';
import {connect} from 'react-redux';

import classProvider from '../../core/tools/classProvider';
import {useQuery} from '@apollo/react-hooks';
import '../../core/style/global.css';

import {ALL_LIST_COUNT} from '../../core/graphql/rff/queries/q_allListCount';
import {LIST_COUNT} from '../../core/graphql/rff/queries/q_listCount';

const mapStateToProps = (state) => {
  return {
    appState: state.appState
  };
};

const ListCount = (props) => {
  const userToken = localStorage.getItem('rffUserToken').substring(7);

  const Count = () => {
    const {data, error, loading} = useQuery(LIST_COUNT, {
      variables: {
        token: userToken
      }
    });
    if (loading) {
      return <p className={classProvider(props.appState.theme, 'tileLoading')}>loading task list count</p>;
    } else {
      if (error) {
        return <p className={classProvider(props.appState.theme, 'tileError')}>error occurred while loading task list
          count</p>;
      } else if (data) {
        return <p className={classProvider(props.appState.theme, 'tileDescription')}>
          <strong>{data.listCount}</strong> task lists accessible</p>;
      }
    }
  };
  const CountAdmin = () => {
    const {data, error, loading} = useQuery(ALL_LIST_COUNT, {
      variables: {
        token: userToken
      }
    });
    if (loading) {
      return <p className={classProvider(props.appState.theme, 'tileLoading')}>
        loading task list count
      </p>;
    } else {
      if (!error) {
        return <p className={classProvider(props.appState.theme, 'tileDescription')}>
          <strong>{data.allListCount}</strong> task lists in database
        </p>;
      } else {
        return <p className={classProvider(props.appState.theme, 'tileError')}>
          error occurred while loading task list count
        </p>;
      }
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

export default connect(mapStateToProps)(ListCount);