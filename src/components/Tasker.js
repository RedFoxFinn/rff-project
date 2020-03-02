// RFF demo project
// Tasker.js
// React component that renders task management -section of the webapp

import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import classProvider from '../core/tools/classProvider';
import '../core/style/global.css';
import '../core/style/tasker.css';
import {useApolloClient, useQuery, useSubscription} from '@apollo/react-hooks';

import Task from './widgets/Task';

import {InlineIcon} from '@iconify/react';
import userShield from '@iconify/icons-fa-solid/user-shield';
import usersIcon from '@iconify/icons-fa-solid/users';

import {GROUP_LISTS} from '../core/graphql/rff/queries/q_groupLists';
import {PRIVATE_LISTS} from '../core/graphql/rff/queries/q_privateLists';
import {TASKS} from '../core/graphql/rff/queries/q_tasks';
import {Redirect} from 'react-router-dom';

import {TASK_ACTIVATION} from '../core/graphql/rff/mutations/m_taskActivation';
import {TASK_DEACTIVATION} from '../core/graphql/rff/mutations/m_taskDeactivation';
import {TASK_PRIORITY} from '../core/graphql/rff/mutations/m_taskPriority';
import {TASK_ADDED} from '../core/graphql/rff/subscriptions/s_taskAdded';
import {TASK_UPDATED} from '../core/graphql/rff/subscriptions/s_taskUpdated';
import {TASK_REMOVED} from '../core/graphql/rff/subscriptions/s_taskRemoved';

import {LIST_ADDED_GROUP} from '../core/graphql/rff/subscriptions/s_listAddedGroup';
import {LIST_ADDED_PRIVATE} from '../core/graphql/rff/subscriptions/s_listAddedPrivate';
import {LIST_REMOVED_GROUP} from '../core/graphql/rff/subscriptions/s_listRemovedGroup';
import {LIST_REMOVED_PRIVATE} from '../core/graphql/rff/subscriptions/s_listRemovedPrivate';
import {ALL_CARBS} from '../core/graphql/rff/queries/q_allCarbs';

const mapStateToProps = (state) => {
  return {
    theme: state.appState.theme,
    user: state.loginState.user
  };
};

const Tasker = (props) => {
  let userToken;
  const client = useApolloClient();
  useSubscription(TASK_ADDED, {
    onSubscriptionData: ({subscriptionData}) => {
      const task = subscriptionData.data.taskAdded;
      updateCacheWithTask('added', task);
    }
  });
  useSubscription(TASK_UPDATED, {
    onSubscriptionData: ({subscriptionData}) => {
      const task = subscriptionData.data.taskAdded;
      updateCacheWithTask('updated', task);
    }
  });
  useSubscription(TASK_REMOVED, {
    onSubscriptionData: ({subscriptionData}) => {
      const task = subscriptionData.data.taskAdded;
      updateCacheWithTask('removed', task);
    }
  });
  useSubscription(LIST_ADDED_PRIVATE, {
    onSubscriptionData: ({subscriptionData}) => {
      const list = subscriptionData.data.listAddedPrivate;
      // updateCacheWithList('added', list);
    }
  });
  useSubscription(LIST_REMOVED_PRIVATE, {
    onSubscriptionData: ({subscriptionData}) => {
      const list = subscriptionData.data.listRemovedPrivate;
      // updateCacheWithList('removed', list);
    }
  });
  useSubscription(LIST_ADDED_GROUP, {
    onSubscriptionData: ({subscriptionData}) => {
      const list = subscriptionData.data.listAddedGroup;
      // updateCacheWithList('added', list);
    }
  });
  useSubscription(LIST_REMOVED_GROUP, {
    onSubscriptionData: ({subscriptionData}) => {
      const list = subscriptionData.data.listRemovedGroup;
      // updateCacheWithList('removed', list);
    }
  });

  // helper functions for subscriptions
  const updateCacheWithTask = async (eventType, listID, task) => {
    const includedIn = (set, object) => set.map(t => t.id).includes(object.id);
    const dataInStore = await client.readQuery({
      query: TASKS, variables: {
        token: userToken,
        listID: listID
      }});

    switch (eventType) {
    case 'added':
      if (!includedIn(dataInStore.tasks, task)) {
        await client.writeQuery({
          query: TASKS,
          data: {tasks: dataInStore.tasks.concat(task)}
        });
        props.handleInfo(`Task added: ${task.task}`);
      }
      break;
    case 'updated':
      if (includedIn(dataInStore.tasks, task)) {
        await client.writeQuery({
          query: TASKS,
          data: {
            tasks: dataInStore.tasks.map(t => {
              return t.id === task.id ? task : t;
            })}
        });
        props.handleInfo(`Task updated: ${task.task}`);
      }
      break;
    case 'removed':
      if (includedIn(dataInStore.tasks, task)) {
        await client.writeQuery({
          query: TASKS,
          data: {
            tasks: dataInStore.tasks.forEach(t => {
              if (t.id !== task.id) return t;
            })}
        });
        props.handleInfo(`Task removed: ${task.task}`);
      }
      break;
    default:
      break;
    }
  };
  const updateCacheWithList = async (eventType, listType, list) => {
    const includedIn = (set, object) => set.map(l => l.id).includes(object.id);
    if (listType === 'private') {
      const dataInStore = await client.readQuery({
        query: PRIVATE_LISTS, variables: {
          token: userToken
        }});

      switch (eventType) {
      case 'added':
        if (!includedIn(dataInStore.privateLists, list)) {
          await client.writeQuery({
            query: PRIVATE_LISTS,
            data: {privateLists: dataInStore.privateLists.concat(list)}
          });
          props.handleInfo(`List added: ${list.title}`);
        }
        break;
      case 'updated':
        if (includedIn(dataInStore.privateLists, list)) {
          await client.writeQuery({
            query: PRIVATE_LISTS,
            data: {
              privateLists: dataInStore.privateLists.map(l => {
                return l.id === list.id ? list : l;
              })}
          });
          props.handleInfo(`List updated: ${list.title}`);
        }
        break;
      case 'removed':
        if (includedIn(dataInStore.privateLists, list)) {
          await client.writeQuery({
            query: PRIVATE_LISTS,
            data: {
              privateLists: dataInStore.privateLists.forEach(l => {
                if (l.id !== list.id) return l;
              })}
          });
          props.handleInfo(`List removed: ${list.title}`);
        }
        break;
      default:
        break;
      }
    } else {
      const dataInStore = await client.readQuery({
        query: GROUP_LISTS, variables: {
          token: userToken
        }});

      switch (eventType) {
      case 'added':
        if (!includedIn(dataInStore.groupLists, list)) {
          await client.writeQuery({
            query: GROUP_LISTS,
            data: {groupLists: dataInStore.groupLists.concat(list)}
          });
          props.handleInfo(`List added: ${list.title}`);
        }
        break;
      case 'updated':
        if (includedIn(dataInStore.groupLists, list)) {
          await client.writeQuery({
            query: GROUP_LISTS,
            data: {
              groupLists: dataInStore.groupLists.map(l => {
                return l.id === list.id ? list : l;
              })}
          });
          props.handleInfo(`List updated: ${list.title}`);
        }
        break;
      case 'removed':
        if (includedIn(dataInStore.groupLists, list)) {
          await client.writeQuery({
            query: GROUP_LISTS,
            data: {
              groupLists: dataInStore.groupLists.forEach(l => {
                if (l.id !== list.id) return l;
              })}
          });
          props.handleInfo(`List removed: ${list.title}`);
        }
        break;
      default:
        break;
      }
    }
  };

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
        <div className='container'>
          <ListsP/>
          <ListsG/>
        </div>
      );
    } else {
      return (
        <div className='container'>
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
        </div>
      );
    }
  };

  const AddTask = () => {};

  const AddList = () => {};

  return props.show
    ? <div className='app'>
      <Lists/>
    </div>
    : <Redirect push to='/'/>;
};

export default connect(mapStateToProps)(Tasker);