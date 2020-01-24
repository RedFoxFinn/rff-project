

import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import classProvider from '../core/tools/classProvider';
import '../core/style/global.css';
import '../core/style/tasker.css';
import {useQuery} from '@apollo/react-hooks';

import Task from './widgets/Task';

import { InlineIcon } from '@iconify/react';
import userShield from '@iconify/icons-fa-solid/user-shield';
import usersIcon from '@iconify/icons-fa-solid/users';

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
  let userToken;

  const Lists = () => {
    if (props.user) {
      userToken = localStorage.getItem('rffUserToken').substring(7);
      return (
        <div className='appContainer'>
          <ListsP/>
          <ListsG/>
        </div>
      );
    } else {
      return (
        <div className='appContainer'>
          <h4 className={classProvider(props.theme, 'listHeader')}>login needed</h4>
        </div>
      );
    }
  };

  const ListsP = () => {
    const {data, loading, error} = useQuery(PRIVATE_LISTS, {
      variables: {
        token: userToken
      }
    });
    if (!loading) {
      if (!error) {
        const lists = data.privateLists;
        return (
          <div className='taskList'>
            <h4 className={classProvider(props.theme, 'listHeader')}>Accessible private lists:</h4>
            <div>
              {lists.map(l => <List key={`privateList:${l.id}`} list={l}/>)}
            </div>
          </div>
        );
      } else {
        console.error(error);
        return (
          <div className='taskList'>
            <p className={classProvider(props.theme, 'listHeader')}>error occurred while loading private lists</p>
          </div>
        );
      }
    } else {
      return (
        <div className='taskList'>
          <p className={classProvider(props.theme, 'listHeader')}>loading private lists</p>
        </div>
      );
    }
  };

  const ListsG = () => {
    const {data, loading, error} = useQuery(GROUP_LISTS, {
      variables: {
        token: userToken
      }
    });
    if (!loading) {
      if (!error) {
        const lists = data.groupLists;
        return (
          <div className='taskList'>
            <h4 className={classProvider(props.theme, 'heading')}>Accessible group lists:</h4>
            {lists.length > 0
              ? <div>
                {lists.map(l => <List key={`groupList:${l.id}`} list={l}/>)}
              </div>
              : <div>
                <p className={classProvider(props.theme, 'listHeader')}>{'couldn\'t find accessible group lists'}</p>
              </div>
            }
          </div>
        );
      } else {
        console.error(error);
        return (
          <div className='taskList'>
            <p className={classProvider(props.theme, 'listHeader')}>error occurred while loading group lists</p>
          </div>
        );
      }
    } else {
      return (
        <div className='taskList'>
          <p className={classProvider(props.theme, 'listHeader')}>loading group lists</p>
        </div>
      );
    }
  };

  const List = ({list}) => {
    const [expanded, setExpanded] = useState(false);
    const {data, loading, error} = useQuery(TASKS, {
      variables: {
        token: userToken,
        listID: list.id
      }
    });

    if (!loading) {
      if (!error) {
        return (
          <div key={`${list.listType}:${list.id}`} className='listElements'>
            <p className={classProvider(props.theme, 'listHeader')}
              onClick={() => setExpanded(!expanded)}>
              <InlineIcon icon={list.listType === 'PrivateList' ? userShield : usersIcon}/> <strong>{`${list.title}:${expanded}`}</strong>
            </p>
            {expanded && <div className='listContainer'>
              <Tasks tasks={data.tasks}/>
            </div>}
          </div>
        );
      } else {
        return (
          <div key={`${list.listType}:${list.id}`} className='listElements'>
            <p className={classProvider(props.theme, 'listHeader')}
              onClick={() => setExpanded(!expanded)}>
              <InlineIcon icon={list.listType === 'PrivateList' ? userShield : usersIcon}/> <strong>{`${list.title}:${expanded}`}</strong>
            </p>
            {expanded && <div className='listContainer'>
              <Task status={false} task={{task: 'error occurred while loading tasks'}}/>
            </div>}
          </div>
        );
      }
    } else {
      return (
        <div key={`${list.listType}:${list.id}`} className='listElements'>
          <p className={classProvider(props.theme, 'listHeader')}
            onClick={() => setExpanded(!expanded)}>
            <InlineIcon icon={list.listType === 'PrivateList' ? userShield : usersIcon}/> <strong>{`${list.title}:${expanded}`}</strong>
          </p>
          {expanded && <div className='listContainer'>
            <Task status={false} task={{task: 'loading tasks'}}/>
          </div>}
        </div>
      );
    }
  };

  const Tasks = ({tasks}) => {
    if (tasks.length > 0) {
      return (
        <div className='listContainer'>
          {tasks.map(t => {
            return <Task key={`task:${t.id}`} status={true} task={t}/>;
          })}
        </div>
      );
    } else {
      return (
        <div className='listContainer'>
          <Task status={false} task={{task: 'no tasks'}}/>
          <Task status={false} task={{task: 'no tasks'}}/>
          <Task status={false} task={{task: 'no tasks'}}/>
        </div>
      );
    }
  };

  return(
    <div className='app'>
      <Lists/>
    </div>
  );
};

export default connect(mapStateToProps)(Tasker);