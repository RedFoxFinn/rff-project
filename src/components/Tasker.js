// RFF demo project
// TaskerReducer.js
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
import flagVariantOutline from '@iconify/icons-mdi/flag-variant-outline';
import flagVariant from '@iconify/icons-mdi/flag-variant';

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
import {GROUPS} from '../core/graphql/rff/queries/q_groups';

const mapStateToProps = (state) => {
  return {
    theme: state.appState.theme,
    user: state.loginState.user,
    tasker: state.taskerState
  };
};

const mapDispatchToProps = {
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

  const Flagged = ({flagged}) => {
    return flagged
      ? <p className='flagged'>priority {<InlineIcon icon={flagVariant}/>}</p>
      : <p className='flagged'>non priority {<InlineIcon icon={flagVariantOutline}/>}</p>;
  };
  const Empty = ({type}) => {
    return (
      <div className='taskList'>
        <p className={classProvider(props.theme, 'tileDescription')}>no accessible {type} lists</p>
      </div>
    );
  };
  const Error = ({type}) => {
    return (
      <div className='taskList'>
        <p className={classProvider(props.theme, 'tileError')}>error occurred while loading {type} lists</p>
      </div>
    );
  };
  const Loading = ({type}) => {
    return (
      <div className='taskList'>
        <p className={classProvider(props.theme, 'tileLoading')}>loading {type} lists</p>
      </div>
    );
  };
  const TaskEmpty = () => {
    return (
      <div className='listContainer'>
        <Task status='empty' task={{task: 'no tasks'}}/>
      </div>
    );
  };
  const TaskError = () => {
    return (
      <div className='listContainer'>
        <Task status='error' task={{task: 'error occurred'}}/>
      </div>
    );
  };
  const TaskLoading = () => {
    return (
      <div className='listContainer'>
        <Task status='loading' task={{task: 'loading tasks'}}/>
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
          <p className={classProvider(props.theme, 'tileError')}>login needed</p>
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
          ? <div className='taskList'>
            <AddList listType='private'/>
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
          ? <div className='taskList'>
            <AddList listType='group'/>
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

    return (
      <div className='listContainer'>
        <div key={`${list.listType}:${list.id}`} className='componentContainer'>
          <div className='component'>
            <strong><p className={classProvider(props.theme, 'text')}>
              <InlineIcon icon={list.listType === 'PrivateList' ? userShield : usersIcon}/> {list.title}
            </p></strong>
          </div>
          <button onClick={() => setExpanded(!expanded)}
            className={expanded
              ? classProvider(props.theme, 'deactivator')
              : classProvider(props.theme, 'activator')}>{expanded ? 'hide ' : 'show '}content
          </button>
        </div>
        {data && expanded && <div className='componentContainer'>
          <div className='taskList'>
            <AddTask list={list}/>
            <Tasks tasks={data.tasks}/>
          </div>
        </div>}
        {error && <div className='componentContainer'>
          <div className='taskList'>
            <TaskError/>
          </div>
        </div>}
        {loading && <div className='componentContainer'>
          <div className='taskList'>
            <TaskLoading/>
          </div>
        </div>}
      </div>
    );
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
      return <TaskEmpty/>;
    }
  };

  const handleSaveTask = async (listID, task, priority) => {};

  const AddTask = ({list}) => {
    const [expanded, setExpanded] = useState(false);
    const [priority, setPriority] = useState(false);
    const [task, setTask] = useState('');
    return (
      <div>
        <div className='componentContainer'>
          <div className='component'>
            <p className={classProvider(props.theme, 'text')}>Add new task</p>
          </div>
          <button onClick={() => setExpanded(!expanded)}
            className={expanded
              ? classProvider(props.theme, 'deactivator')
              : classProvider(props.theme, 'activator')}>{expanded ? 'close form' : 'open form'}</button>
        </div>
        {expanded && <div className='componentContainer'>
          <form className='taskList'>
            <p className={classProvider(props.theme, 'text')}>Add new task to <strong>{list.title}</strong></p>
            <p className={classProvider(props.theme, 'text')}>{'with following content: '}</p>
            <input required minLength={2} id='newTask' className={classProvider(props.theme, 'formElement')}
              value={task} placeholder='new task'
              onChange={({target}) => setTask(target.value)}/>
            <button id='newTaskPriority' type='button' className={classProvider(props.theme, 'formElement')}
              onClick={() => setPriority(!priority)}>{<Flagged flagged={priority}/>}</button>
            <button disabled={task.length <= 0} type='button' className={task.length <= 0
              ? classProvider(props.theme, 'deactivator')
              : classProvider(props.theme, 'activator')}>save list</button>
          </form>
        </div>}
      </div>
    );
  };

  const handleSaveList = async (groupID, listType, title) => {};

  const AddList = ({listType}) => {
    const [expanded, setExpanded] = useState(false);
    const [selection, setSelection] = useState(null);
    const [groupListTitle, setGroupListTitle] = useState('');
    const [privateListTitle, setPrivateListTitle] = useState('');
    const {data, loading, error} = useQuery(GROUPS, {
      variables: {
        token: userToken
      }
    });
    const Wait = () => {
      return (
        <div className='component'>
          <p className={classProvider(props.theme, 'tileLoading')}>loading . . .</p>
        </div>
      );
    };
    const Fail = () => {
      return (
        <div className='component'>
          <p className={classProvider(props.theme, 'tileError')}>error occurred</p>
        </div>
      );
    };
    return (
      <div>
        <div className='componentContainer'>
          <div className='component'>
            <p className={classProvider(props.theme, 'text')}>Add new {listType} list</p>
          </div>
          <button onClick={() => setExpanded(!expanded)}
            className={expanded
              ? classProvider(props.theme, 'deactivator')
              : classProvider(props.theme, 'activator')}>{expanded ? 'close form' : 'open form'}</button>
        </div>
        {error && <Fail/>}
        {loading && <Wait/>}
        {expanded && data && <div className='componentContainer'>
          <div className='taskList'>
            {listType === 'group' && <select id='groupSelector' defaultValue='default' className={classProvider(props.theme, 'formElement')}
              onChange={({target}) => setSelection(JSON.parse(target.value))}>
              <option key='default' value='default' disabled>groups</option>
              {data.groups.map((g) => <option key={g.id} value={JSON.stringify(g)}>{g.title}</option>)}
            </select>}
            {listType === 'group' && selection !== null && <form className='taskList'>
              <p className={classProvider(props.theme, 'text')}>Add new task list for <strong>{selection.title}</strong></p>
              <p className={classProvider(props.theme, 'text')}>{'with following title: '}</p>
              <input required minLength={2} id='newGroupListTitle' className={classProvider(props.theme, 'formElement')}
                placeholder='new list title' value={groupListTitle}
                onChange={({target}) => setGroupListTitle(target.value)}/>
              <button disabled={groupListTitle.length <= 0} type='button' className={groupListTitle.length <= 0
                ? classProvider(props.theme, 'deactivator')
                : classProvider(props.theme, 'activator')}>save list</button>
            </form>}
            {listType !== 'group' && <form className='taskList'>
              <p className={classProvider(props.theme, 'text')}>Add new task list for <strong>{props.user.getUsername()}</strong></p>
              <p className={classProvider(props.theme, 'text')}>{'with following title: '}</p>
              <input required minLength={2} id='newUserListTitle' className={classProvider(props.theme, 'formElement')}
                placeholder='new list title' value={privateListTitle}
                onChange={({target}) => setPrivateListTitle(target.value)}/>
              <button disabled={privateListTitle.length <= 0} type='button' className={privateListTitle.length <= 0
                ? classProvider(props.theme, 'deactivator')
                : classProvider(props.theme, 'activator')}>save list</button>
            </form>}
          </div>
        </div>}
      </div>
    );
  };

  return props.show
    ? <div className='app'>
      <Lists/>
    </div>
    : <Redirect push to='/'/>;
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasker);