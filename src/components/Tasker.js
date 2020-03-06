// RFF demo project
// TaskerReducer.js
// React component that renders task management -section of the webapp

// imports
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import classProvider from '../core/tools/classProvider';
import '../core/style/global.css';
import '../core/style/tasker.css';
import {useApolloClient, useQuery, useSubscription} from '@apollo/react-hooks';
import {handleInfo, handleError} from '../core/store/reducers/AppReducer';

import {InlineIcon} from '@iconify/react';
import userShield from '@iconify/icons-fa-solid/user-shield';
import usersIcon from '@iconify/icons-fa-solid/users';
import flagVariantOutline from '@iconify/icons-mdi/flag-variant-outline';
import flagVariant from '@iconify/icons-mdi/flag-variant';

import {GROUP_LISTS} from '../core/graphql/rff/queries/q_groupLists';
import {PRIVATE_LISTS} from '../core/graphql/rff/queries/q_privateLists';
import {TASKS} from '../core/graphql/rff/queries/q_tasks';
import {Redirect} from 'react-router-dom';

import {TASK_ADDED} from '../core/graphql/rff/subscriptions/s_taskAdded';
import {TASK_UPDATED} from '../core/graphql/rff/subscriptions/s_taskUpdated';
import {TASK_REMOVED} from '../core/graphql/rff/subscriptions/s_taskRemoved';

import {LIST_ADDED_GROUP} from '../core/graphql/rff/subscriptions/s_listAddedGroup';
import {LIST_ADDED_PRIVATE} from '../core/graphql/rff/subscriptions/s_listAddedPrivate';
import {LIST_REMOVED_GROUP} from '../core/graphql/rff/subscriptions/s_listRemovedGroup';
import {LIST_REMOVED_PRIVATE} from '../core/graphql/rff/subscriptions/s_listRemovedPrivate';
import {GROUPS} from '../core/graphql/rff/queries/q_groups';
import {ADD_TASK} from '../core/graphql/rff/mutations/m_addTask';
import {ADD_LIST_GROUP} from '../core/graphql/rff/mutations/m_addListGroup';
import {ADD_LIST_PRIVATE} from '../core/graphql/rff/mutations/m_addListPrivate';
import {TASK_PRIORITY} from '../core/graphql/rff/mutations/m_taskPriority';
import {TASK_ACTIVATION} from '../core/graphql/rff/mutations/m_taskActivation';
import {TASK_DEACTIVATION} from '../core/graphql/rff/mutations/m_taskDeactivation';
import {REMOVE_TASK} from '../core/graphql/rff/mutations/m_removeTask';

// prop mappers
const mapStateToProps = (state) => {
  return {
    theme: state.appState.theme,
    user: state.loginState.user,
    tasker: state.taskerState
  };
};
const mapDispatchToProps = {
  handleError, handleInfo
};

const Tasker = (props) => {
  let userToken;
  const client = useApolloClient();

  // Apollo GraphQL subscriptions
  useSubscription(TASK_ADDED, {
    fetchPolicy: '',
    onSubscriptionData: ({subscriptionData}) => {
      const task = subscriptionData.data.taskAdded;
      updateCacheWithTask('added', task);
    }
  });
  useSubscription(TASK_UPDATED, {
    fetchPolicy: '',
    onSubscriptionData: ({subscriptionData}) => {
      const task = subscriptionData.data.taskUpdated;
      updateCacheWithTask('updated', task);
    }
  });
  useSubscription(TASK_REMOVED, {
    fetchPolicy: '',
    onSubscriptionData: ({subscriptionData}) => {
      const task = subscriptionData.data.taskRemoved;
      updateCacheWithTask('removed', task);
    }
  });
  useSubscription(LIST_ADDED_PRIVATE, {
    fetchPolicy: '',
    onSubscriptionData: ({subscriptionData}) => {
      const list = subscriptionData.data.listAddedPrivate;
      updateCacheWithPrivatelist('added', list);
    }
  });
  useSubscription(LIST_REMOVED_PRIVATE, {
    fetchPolicy: '',
    onSubscriptionData: ({subscriptionData}) => {
      const list = subscriptionData.data.listRemovedPrivate;
      updateCacheWithPrivatelist('removed', list);
    }
  });
  useSubscription(LIST_ADDED_GROUP, {
    fetchPolicy: '',
    onSubscriptionData: ({subscriptionData}) => {
      const list = subscriptionData.data.listAddedGroup;
      updateCacheWithGrouplist('added', list);
    }
  });
  useSubscription(LIST_REMOVED_GROUP, {
    fetchPolicy: '',
    onSubscriptionData: ({subscriptionData}) => {
      const list = subscriptionData.data.listRemovedGroup;
      updateCacheWithGrouplist('removed', list);
    }
  });

  // helper functions for subscriptions
  const updateCacheWithTask = async (eventType, task) => {
    const includedIn = (set, object) => set.map(t => t.id).includes(object.id);
    const dataInStore = await client.readQuery({
      query: TASKS, variables: {
        listID: task.listID,
        token: userToken
      }});

    switch (eventType) {
    case 'added':
      if (!includedIn(dataInStore.tasks, task)) {
        await client.writeQuery({
          query: TASKS,
          variables: {
            token: userToken,
            listID: task.listID
          },
          data: {tasks: dataInStore.tasks.concat(task)}
        });
        props.handleInfo(`Task added: ${task.task}`);
      }
      break;
    case 'updated':
      if (includedIn(dataInStore.tasks, task)) {
        await client.writeQuery({
          query: TASKS,
          variables: {
            token: userToken,
            listID: task.listID
          },
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
          variables: {
            token: userToken,
            listID: task.listID
          },
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
  const updateCacheWithPrivatelist = async (eventType, list) => {
    const includedIn = (set, object) => set.map(l => l.id).includes(object.id);
    const dataInStore = await client.readQuery({
      query: PRIVATE_LISTS, variables: {
        token: userToken
      }
    });
    switch (eventType) {
    case 'added':
      if (!includedIn(dataInStore.privateLists, list)) {
        await client.writeQuery({
          query: PRIVATE_LISTS,
          variables: {
            token: userToken
          },
          data: {privateLists: dataInStore.privateLists.concat(list)}
        });
        props.handleInfo(`List added: ${list.title}`);
      }
      break;
    case 'updated':
      if (includedIn(dataInStore.privateLists, list)) {
        await client.writeQuery({
          query: PRIVATE_LISTS,
          variables: {
            token: userToken
          },
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
          variables: {
            token: userToken
          },
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
  };
  const updateCacheWithGrouplist = async (eventType, list) => {
    const includedIn = (set, object) => set.map(l => l.id).includes(object.id);
    const dataInStore = await client.readQuery({
      variables: {
        token: userToken,
      },
      query: GROUP_LISTS
    });

    switch (eventType) {
    case 'added':
      if (!includedIn(dataInStore.groupLists, list)) {
        await client.writeQuery({
          query: GROUP_LISTS,
          variables: {
            token: userToken
          },
          data: {groupLists: dataInStore.groupLists.concat(list)}
        });
        props.handleInfo(`List added: ${list.title}`);
      }
      break;
    case 'updated':
      if (includedIn(dataInStore.groupLists, list)) {
        await client.writeQuery({
          query: GROUP_LISTS,
          variables: {
            token: userToken
          },
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
          variables: {
            token: userToken
          },
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
  };

  // generic minor components, ie. task priority, query error & loading
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

  // component that gives layout base for task list rendering
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

  // task lists rendering components
  const ListsP = () => {
    const {data, loading, error} = useQuery(PRIVATE_LISTS, {
      variables: {
        token: userToken
      }
    });
    return (
      <div className='taskList'>
        <h4 className={classProvider(props.theme, 'listHeader')}>Accessible private lists:</h4>
        <div className='taskList'>
          <AddList listType='private'/>
          {data && data.privateLists.length > 0
            ? <>{data.privateLists.map(l => <List key={`privateList:${l.id}`} list={l}/>)}</>
            : <Empty type='private'/>}
        </div>
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
        <div className='taskList'>
          <AddList listType='group'/>
          {data && data.groupLists.length > 0
            ? <>{data.groupLists.map(l => <List key={`groupList:${l.id}`} list={l}/>)}</>
            : <Empty type='group'/>}
        </div>
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
              : classProvider(props.theme, 'activator')}>{expanded ? 'hide ' : 'show '}list
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

  // task rendering component
  const Tasks = ({tasks}) => {
    if (tasks.length > 0) {
      return (
        <table className={classProvider(props.theme, 'table')}>
          <thead>
            <tr className={classProvider(props.theme, 'tableRow')}>
              <th className={classProvider(props.theme, 'tableCell')}>task</th>
              <th className={classProvider(props.theme, 'tableCell')}>priority</th>
              <th className={classProvider(props.theme, 'tableCell')}>change priority</th>
              <th className={classProvider(props.theme, 'tableCell')}>mark done</th>
              <th className={classProvider(props.theme, 'tableCell')}>{' '}</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(t => {
              return <Task key={t.id} status={true} task={t}/>;
            })}
          </tbody>
        </table>
      );
    } else {
      return <TaskEmpty/>;
    }
  };

  // helper functions: task & list saving handlers
  const handleSaveTask = async (listID, priority) => {
    const variables = {
      token: userToken,
      listID: listID,
      task: document.getElementById('newTask').value,
      priority: priority
    };
    if (userToken) {
      await client.mutate({
        mutation: ADD_TASK,
        errorPolicy: 'ignore',
        variables: variables
      }).then((result) => {
        const {data} = result;
        if (data !== null) {
          updateCacheWithTask('added', data.addTask);
        } else {
          props.handleError(`Error occurred with task: cannot add ${variables.task}`);
        }
      });
    }
  };
  const handleSaveList = async (groupID, listType) => {
    let variables;
    if (listType === 'GroupList') {
      variables = {
        token: userToken,
        group: groupID,
        title: document.getElementById('newGrouplistTitle').value
      };
      await client.mutate({
        mutation: ADD_LIST_GROUP,
        variables: variables,
        errorPolicy: 'ignore'
      }).then((result) => {
        const {data} = result;
        if (data !== null) {
          updateCacheWithGrouplist('added', data.addListGroup);
          document.getElementById('newGrouplistTitle').value = '';
        } else {
          props.handleError(`Error occurred with list: cannot add ${variables.title}`);
        }
      });
    } else {
      variables = {
        token: userToken,
        title: document.getElementById('newPrivatelistTitle').value
      };
      await client.mutate({
        mutation: ADD_LIST_PRIVATE,
        variables: variables,
        errorPolicy: 'ignore'
      }).then((result) => {
        const {data} = result;
        if (data !== null) {
          updateCacheWithPrivatelist('added', data.addListPrivate);
          document.getElementById('newPrivatelistTitle').value = '';
        } else {
          props.handleError(`Error occurred with list: cannot add ${variables.title}`);
        }
      });
    }
  };

  // rendering components for new task & list forms
  const AddTask = ({list}) => {
    const [expanded, setExpanded] = useState(false);
    const [priority, setPriority] = useState(false);
    return (
      <div id='newTaskForm'>
        <div className='componentContainer'>
          <div className='component'>
            <p className={classProvider(props.theme, 'text')}>Add new task</p>
          </div>
          <button id='taskFormActivator' onClick={() => setExpanded(!expanded)}
            className={expanded
              ? classProvider(props.theme, 'deactivator')
              : classProvider(props.theme, 'activator')}>{expanded ? 'close ' : 'open '}form</button>
        </div>
        {expanded && <table className={classProvider(props.theme, 'table')}>
          <thead>
            <tr className={classProvider(props.theme, 'tableRow')}>
              <th className={classProvider(props.theme, 'tableCell')}>list</th>
              <th className={classProvider(props.theme, 'tableCell')}>task</th>
              <th className={classProvider(props.theme, 'tableCell')}>priority</th>
              <th className={classProvider(props.theme, 'tableCell')}>{' '}</th>
            </tr>
          </thead>
          <tbody>
            <tr className={classProvider(props.theme, 'tableRow')}>
              <td className={classProvider(props.theme, 'tableCell')}><strong>{list.title}</strong></td>
              <td className={classProvider(props.theme, 'tableCell')}>
                <input required minLength={2} id='newTask'
                  className={classProvider(props.theme, 'formElement')}
                  placeholder='new task'/></td>
              <td className={classProvider(props.theme, 'tableCell')}>
                <button id='newTaskPriority' type='button' className={classProvider(props.theme, 'formElement')}
                  onClick={() => setPriority(!priority)}>{<Flagged flagged={priority}/>}</button>
              </td>
              <td className={classProvider(props.theme, 'tableCell')}>
                <button type='button' className={classProvider(props.theme, 'activator')}
                  onClick={() => handleSaveTask(list.id, priority)}>save list</button>
              </td>
            </tr>
          </tbody>
        </table>}
      </div>
    );
  };
  const AddList = ({listType}) => {
    const [expanded, setExpanded] = useState(false);
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
    const Group = () => {
      const [groupSelection, setGroupSelection] = useState(null);
      return (
        <div className='taskList'>
          {listType === 'group' && <select id='groupSelector' defaultValue='default' className={classProvider(props.theme, 'formElement')}
            onChange={({target}) => setGroupSelection(JSON.parse(target.value))}>
            <option key='default' value='default' disabled>groups</option>
            {data.groups.map((g) => <option key={g.id} value={JSON.stringify(g)}>{g.title}</option>)}
          </select>}
          {groupSelection !== null && <table className={classProvider(props.theme, 'table')}>
            <thead>
              <tr className={classProvider(props.theme, 'tableRow')}>
                <th className={classProvider(props.theme, 'tableCell')}>group</th>
                <th className={classProvider(props.theme, 'tableCell')}>title</th>
                <th className={classProvider(props.theme, 'tableCell')}>{' '}</th>
              </tr>
            </thead>
            <tbody>
              <tr className={classProvider(props.theme, 'tableRow')}>
                <td className={classProvider(props.theme, 'tableCell')}><strong>{groupSelection.title}</strong></td>
                <td className={classProvider(props.theme, 'tableCell')}><input required minLength={2}
                  id='newGrouplistTitle'
                  className={classProvider(props.theme, 'formElement')}
                  placeholder='new list title'/></td>
                <td className={classProvider(props.theme, 'tableCell')}><button type='button'
                  className={classProvider(props.theme, 'activator')}
                  onClick={() => handleSaveList(groupSelection.id, 'GroupList')}>save list</button></td>
              </tr>
            </tbody>
          </table>}
        </div>
      );
    };
    const Private = () => {
      return (
        <table className={classProvider(props.theme, 'table')}>
          <thead>
            <tr className={classProvider(props.theme, 'tableRow')}>
              <th className={classProvider(props.theme, 'tableCell')}>user</th>
              <th className={classProvider(props.theme, 'tableCell')}>title</th>
              <th className={classProvider(props.theme, 'tableCell')}>{' '}</th>
            </tr>
          </thead>
          <tbody>
            <tr className={classProvider(props.theme, 'tableRow')}>
              <td className={classProvider(props.theme, 'tableCell')}><strong>{props.user.getUsername()}</strong></td>
              <td className={classProvider(props.theme, 'tableCell')}><input required minLength={2}
                className={classProvider(props.theme, 'formElement')}
                placeholder='new list title' id='newPrivatelistTitle'/></td>
              <td className={classProvider(props.theme, 'tableCell')}><button type='button'
                className={classProvider(props.theme, 'activator')}
                onClick={() => handleSaveList(null, 'PrivateList')}>save list</button></td>
            </tr>
          </tbody>
        </table>
      );
    };
    return (
      <div id={`newListForm_${listType}`}>
        <div className='componentContainer'>
          <div className='component'>
            <p className={classProvider(props.theme, 'text')}>Add new {listType} list</p>
          </div>
          <button id={`listFormActivator_${listType}`} onClick={() => setExpanded(!expanded)}
            className={expanded
              ? classProvider(props.theme, 'deactivator')
              : classProvider(props.theme, 'activator')}>{expanded ? 'close ' : 'open '}form</button>
        </div>
        {error && <Fail/>}
        {loading && <Wait/>}
        {expanded && data && <div className='componentContainer'>
          <div className='taskList'>
            {listType === 'group' && <Group/>}
            {listType !== 'group' && <Private/>}
          </div>
        </div>}
      </div>
    );
  };

  const handlePriority = async ({id, priority, task}) => {
    const variables = {
      token: userToken,
      id: id,
      priority: !priority
    };
    await client.mutate({
      mutation: TASK_PRIORITY,
      variables: variables,
      errorPolicy: 'ignore'
    }).then((result) => {
      const {data} = result;
      if (data !== null) {
        updateCacheWithTask('updated', data.taskPriority);
      } else {
        props.handleError(`Error occurred with task: cannot update ${task}`);
      }
    });
  };
  const handleCompletion = async ({id, task, active}) => {
    const variables = {
      token: userToken,
      id: id
    };
    await client.mutate({
      mutation: active ? TASK_DEACTIVATION : TASK_ACTIVATION,
      variables: variables,
      errorPolicy: 'ignore'
    }).then((result) => {
      const {data} = result;
      if (data !== null) {
        updateCacheWithTask('updated', active ? data.taskDeactivation : data.taskActivation);
      } else {
        props.handleError(`Error occurred with task: cannot update ${task}`);
      }
    });
  };
  const handleRemoval = async ({id, task}) => {
    const variables = {
      token: userToken,
      id: id
    };
    await client.mutate({
      mutation: REMOVE_TASK,
      errorPolicy: 'ignore',
      variables: variables
    }).then((result) => {
      const {data} = result;
      if (data !== null) {
        updateCacheWithTask('removed', data.removeTask);
      } else {
        props.handleError(`Error occurred with task: cannot remove ${task}`);
      }
    });
  };

  const Task = ({task}) => {
    const Flagged = ({flagged}) => {
      return flagged
        ? <InlineIcon icon={flagVariant}/>
        : <InlineIcon icon={flagVariantOutline}/>;
    };

    if (props.status === 'error') {
      return <td className={classProvider(props.theme, 'tableCell')}>{task.task}</td>;
    } else if (props.status === 'loading') {
      return <td className={classProvider(props.theme, 'tableCell')}>{task.task}</td>;
    } else if (props.status === 'empty') {
      return <td className={classProvider(props.theme, 'tableCell')}>{task.task}</td>;
    } else {
      return (
        <tr className={classProvider(props.theme, 'tableRow')}>
          <td className={classProvider(props.theme, 'tableCell')}>{task.task}</td>
          <td className={classProvider(props.theme, 'tableCell')}><Flagged flagged={task.priority}/></td>
          <td className={classProvider(props.theme, 'tableCell')}><button className={task.priority
            ? classProvider(props.theme, 'deactivator')
            : classProvider(props.theme, 'activator')}
          onClick={() => handlePriority(task)}>
            {task.priority
              ? 'priority off'
              : 'priority on'}
          </button></td>
          <td className={classProvider(props.theme, 'tableCell')}><button className={task.active
            ? classProvider(props.theme, 'deactivator')
            : classProvider(props.theme, 'activator')}
          onClick={() => handleCompletion(task)}>
            {task.active
              ? 'done'
              : 'undone'}
          </button></td>
          <td className={classProvider(props.theme, 'tableCell')}>
            <button className={classProvider(props.theme, 'deactivator')}
              onClick={() => handleRemoval(task)}>remove</button></td>
        </tr>
      );
    }
  };

  return props.show
    ? <div className='app'>
      <Lists/>
    </div>
    : <Redirect push to='/'/>;
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasker);