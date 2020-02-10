import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import classProvider from '../../core/tools/classProvider';
import '../../core/style/global.css';
import {useApolloClient, useQuery} from '@apollo/react-hooks';

import {USER_COUNT} from '../../core/graphql/rff/queries/q_userCount';

const mapStateToProps = (state) => {
  return {
    appState: state.appState
  };
};

const UserCount = (props) => {
  const userCount = useQuery(USER_COUNT, {
    variables: {
      token: localStorage.getItem('rffUserToken').substring(7)
    }
  });

  const Count = () => {
    if (props.mode === 'admin') {
      if (userCount.loading) {
        return (
          <p className={classProvider(props.appState.theme, 'tileLoading')}>loading user count</p>
        );
      } else if (userCount.error) {
        return (
          <p className={classProvider(props.appState.theme, 'tileError')}>error occurred while loading data</p>
        );
      } else if (userCount.data) {
        return (
          <p className={classProvider(props.appState.theme, 'tileDescription')}>application has <strong>{userCount.data.userCount}</strong> users</p>
        );
      }
    } else {
      return null;
    }
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

export default connect(mapStateToProps)(UserCount);