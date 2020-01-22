import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import classProvider from '../core/tools/classProvider';
import '../core/style/global.css';
import {useQuery} from '@apollo/react-hooks';

import {GROUP_LISTS} from '../core/graphql/rff/queries/q_groupLists';
import {PRIVATE_LISTS} from '../core/graphql/rff/queries/q_privateLists';
import {TASKS} from '../core/graphql/rff/queries/q_tasks';

const mapStateToProps = (state) => {
  return {
    theme: state.appState.theme,
    user: state.loginState.user
  };
};

const Tasker = (props) => {
  const Lists = () => {
    if (props.user) {
      const token = localStorage.getItem('rffUserToken').substring(7);
      return (
        <div>
          <ListsP userToken={token}/>
          <ListsG userToken={token}/>
        </div>
      );
    } else {
      return (
        <div>
          <h4>login needed</h4>
        </div>
      );
    }
  };

  const ListsP = ({userToken}) => {
    const {data, loading, error} = useQuery(PRIVATE_LISTS, {
      variables: {
        token: userToken
      }
    });
    if (!loading) {
      if (!error) {
        const lists = data.privateLists;
        return (
          <div>
            <h4>Accessible private lists:</h4>
            <div>
              {lists.length() > 0
                ? lists.map(l => <List key={`privateList:${l.id}`} list={l}/>)
                : <h4>no private lists accessible</h4>}
            </div>
          </div>
        );
      } else {
        console.error(error);
        return (
          <div>
            <h4>error occurred while loading private lists</h4>
          </div>
        );
      }
    } else {
      return (
        <div>
          <h4>loading private lists</h4>
        </div>
      );
    }
  };

  const ListsG = ({userToken}) => {
    const {data, loading, error} = useQuery(GROUP_LISTS, {
      variables: {
        token: userToken
      }
    });
    if (!loading) {
      if (!error) {
        const lists = data.groupLists;
        return (
          <div>
            <h4>Accessible group lists:</h4>
            {lists.length() > 0
              ? lists.map(l => <List key={`groupList:${l.id}`} list={l}/>)
              : <h4>no group lists accessible</h4>}
          </div>
        );
      } else {
        console.error(error);
        return (
          <div>
            <h4>error occurred while loading group lists</h4>
          </div>
        );
      }
    } else {
      return (
        <div>
          <h4>loading group lists</h4>
        </div>
      );
    }
  };

  const List = ({list}) => {
    if (list.listType === 'private') {
      return (
        <p>{`${list.listType}:${list.id}`}</p>
      );
    } else {
      return (
        <p>{`${list.listType}:${list.id}`}</p>
      );
    }
  };

  return(
    <div className='app'>
      <div className='appContainer'>
        <Lists/>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Tasker);