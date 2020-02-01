

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
import {Redirect} from 'react-router-dom';

const mapStateToProps = (state) => {
  return {
    theme: state.appState.theme,
    user: state.loginState.user
  };
};

const Tasker = (props) => {
  let userToken;

  const Empty = ({type}) => {
    return (
      <div className='taskList'>
        <p className={classProvider(props.theme, 'listHeader')}>no accessible {type} lists</p>
      </div>
    );
  };
  const Error = ({type}) => {
    return (
      <div className='taskList'>
        <p className={classProvider(props.theme, 'listHeader')}>error occurred while loading {type} lists</p>
      </div>
    );
  };
  const Loading = ({type}) => {
    return (
      <div className='taskList'>
        <p className={classProvider(props.theme, 'listHeader')}>loading {type} lists</p>
      </div>
    );
  };

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
    return (
      <div className='taskList'>
        <h4 className={classProvider(props.theme, 'listHeader')}>Accessible private lists:</h4>
        {data && data.privateLists.length > 0
          ? <div>
            {data.privateLists.map(l => <List key={`privateList:${l.id}`} list={l}/>)}
          </div>
          : <Empty type='private'/>
        }
        {error && <Error type='private'/>}
        {loading && <Loading type='private'/>}
      </div>
    );
  };

  const ListsG = () => {
    const {data, loading, error} = useQuery(GROUP_LISTS, {
      variables: {
        token: userToken
      }
    });
    return (
      <div className='taskList'>
        <h4 className={classProvider(props.theme, 'heading')}>Accessible group lists:</h4>
        {data && data.groupLists.length > 0
          ? <div>
            {data.groupLists.map(l => <List key={`groupList:${l.id}`} list={l}/>)}
          </div>
          : <Empty type='group'/>}
        {loading && <Loading type='group'/>}
        {error && <Error type='group'/>}
      </div>
    );
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

  return props.show
    ? <div className='app'>
      <Lists/>
    </div>
    : <Redirect push to='/'/>;
};

export default connect(mapStateToProps)(Tasker);