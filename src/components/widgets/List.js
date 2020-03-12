// RFF demo project
// List.js
// React component that renders list & tasks for task management

import React, {useState} from 'react';
import {connect} from 'react-redux';
import {useApolloClient, useQuery, useSubscription} from '@apollo/react-hooks';
import {TASKS} from '../../core/graphql/rff/queries/q_tasks';
import classProvider from '../../core/tools/classProvider';
import {InlineIcon} from '@iconify/react';
import userShield from '@iconify/icons-fa-solid/user-shield';
import usersIcon from '@iconify/icons-fa-solid/users';
import chevronUp from '@iconify/icons-fa-solid/chevron-up';
import chevronDown from '@iconify/icons-fa-solid/chevron-down';
import flagVariant from '@iconify/icons-mdi/flag-variant';
import flagVariantOutline from '@iconify/icons-mdi/flag-variant-outline';
import {TASK_ADDED} from '../../core/graphql/rff/subscriptions/s_taskAdded';
import {TASK_UPDATED} from '../../core/graphql/rff/subscriptions/s_taskUpdated';
import {TASK_REMOVED} from '../../core/graphql/rff/subscriptions/s_taskRemoved';
import {ADD_TASK} from '../../core/graphql/rff/mutations/m_addTask';
import {TASK_PRIORITY} from '../../core/graphql/rff/mutations/m_taskPriority';
import {TASK_DEACTIVATION} from '../../core/graphql/rff/mutations/m_taskDeactivation';
import {TASK_ACTIVATION} from '../../core/graphql/rff/mutations/m_taskActivation';
import {REMOVE_TASK} from '../../core/graphql/rff/mutations/m_removeTask';
import {handleError, handleInfo} from '../../core/store/reducers/AppReducer';

const mapStateToProps = (state) => {
  return {
    theme: state.appState.theme,
    user: state.loginState.user
  };
};

const mapDispatchToProps = {
  handleError, handleInfo
};

// task list rendering component
const List = (props) => {
  const client = useApolloClient();
  const list = props.list;
  const userToken = localStorage.getItem('rffUserToken').substring(7);
  const [expanded, setExpanded] = useState(false);
  const {data, loading, error, refetch} = useQuery(TASKS, {
    variables: {
      token: userToken,
      listID: list.id
    }
  });

  // helper function for subscriptions
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
        await refetch();
        props.handleInfo(`Task added: ${task.task}`);
      }
      break;
    case 'updated':
      if (includedIn(dataInStore.tasks, task)) {
        await refetch();
        props.handleInfo(`Task updated: ${task.task}`);
      }
      break;
    case 'removed':
      if (includedIn(dataInStore.tasks, task)) {
        await refetch();
        props.handleInfo(`Task removed: ${task.task}`);
      }
      break;
    default:
      break;
    }
  };

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

  // helper functions: task handlers
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
        variables: variables
      }).then((result) => {
        const {data, errors} = result;
        if (data !== null) {
          updateCacheWithTask('added', data.addTask);
        } else {
          props.handleError(errors[0].message);
        }
      });
    }
  };
  const handleTaskPriority = async ({id, priority}) => {
    const variables = {
      token: userToken,
      id: id,
      priority: !priority
    };
    await client.mutate({
      mutation: TASK_PRIORITY,
      variables: variables
    }).then((result) => {
      const {data, errors} = result;
      if (data !== null) {
        updateCacheWithTask('updated', data.taskPriority);
      } else {
        props.handleError(errors[0].message);
      }
    });
  };
  const handleTaskCompletion = async ({id, active}) => {
    const variables = {
      token: userToken,
      id: id
    };
    await client.mutate({
      mutation: active ? TASK_DEACTIVATION : TASK_ACTIVATION,
      variables: variables
    }).then((result) => {
      const {data, errors} = result;
      if (data !== null) {
        updateCacheWithTask('updated', active ? data.taskDeactivation : data.taskActivation);
      } else {
        props.handleError(errors[0].message);
      }
    });
  };
  const handleTaskRemoval = async ({id}) => {
    const variables = {
      token: userToken,
      id: id
    };
    await client.mutate({
      mutation: REMOVE_TASK,
      variables: variables
    }).then((result) => {
      const {data, errors} = result;
      if (data !== null) {
        updateCacheWithTask('removed', data.removeTask);
      } else {
        props.handleError(errors[0].message);
      }
    });
  };

  const Flagged = ({flagged}) => {
    return flagged
      ? <p className='flagged'>priority {<InlineIcon icon={flagVariant}/>}</p>
      : <p className='flagged'>non priority {<InlineIcon icon={flagVariantOutline}/>}</p>;
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
              return <Task key={t.id} status='data' task={t}/>;
            })}
          </tbody>
        </table>
      );
    } else {
      return <TaskEmpty/>;
    }
  };

  const Task = ({task, status}) => {
    const Flagged = ({flagged}) => {
      return flagged
        ? <InlineIcon icon={flagVariant}/>
        : <InlineIcon icon={flagVariantOutline}/>;
    };

    if (status === 'error') {
      return <td className={classProvider(props.theme, 'tableCell')}>{task.task}</td>;
    } else if (status === 'loading') {
      return <td className={classProvider(props.theme, 'tableCell')}>{task.task}</td>;
    } else if (status === 'empty') {
      return <td className={classProvider(props.theme, 'tableCell')}>{task.task}</td>;
    } else {
      return (
        <tr className={classProvider(props.theme, 'tableRow')}>
          <td className={classProvider(props.theme, 'tableCell')}>{task.task}</td>
          <td className={classProvider(props.theme, 'tableCell')}><Flagged flagged={task.priority}/></td>
          <td className={classProvider(props.theme, 'tableCell')}><button className={task.priority
            ? classProvider(props.theme, 'deactivator')
            : classProvider(props.theme, 'activator')}
          onClick={() => handleTaskPriority(task)}>
            {task.priority
              ? 'priority off'
              : 'priority on'}
          </button></td>
          <td className={classProvider(props.theme, 'tableCell')}><button className={task.active
            ? classProvider(props.theme, 'deactivator')
            : classProvider(props.theme, 'activator')}
          onClick={() => handleTaskCompletion(task)}>
            {task.active
              ? 'done'
              : 'undone'}
          </button></td>
          <td className={classProvider(props.theme, 'tableCell')}>
            <button className={classProvider(props.theme, 'deactivator')}
              onClick={() => handleTaskRemoval(task)}>remove</button></td>
        </tr>
      );
    }
  };

  //rendering component for new task form
  const AddTask = ({list}) => {
    const [expanded, setExpanded] = useState(false);
    const [priority, setPriority] = useState(false);
    return (
      <div id='newTaskForm'>
        <div className='componentContainer'>
          <div className='component'>
            <p className={classProvider(props.theme, 'text')}>Add new task</p>
          </div>
          <button title={expanded ? 'close form' : 'open form'} id='taskFormActivator' onClick={() => setExpanded(!expanded)}
            className={expanded
              ? classProvider(props.theme, 'deactivator')
              : classProvider(props.theme, 'activator')}>
            {expanded ? <InlineIcon icon={chevronUp}/> : <InlineIcon icon={chevronDown}/>}</button>
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

  return (
    <div id={`${list.id}`} className='listContainer'>
      <div className='componentContainer'>
        <div className='component'>
          <strong><p className={classProvider(props.theme, 'text')}>
            <InlineIcon icon={list.listType === 'PrivateList' ? userShield : usersIcon}/> {list.title}
          </p></strong>
        </div>
        <button id={`${list.id}:listExpander`} title={expanded ? 'hide list' : 'show list'} onClick={() => setExpanded(!expanded)}
          className={expanded
            ? classProvider(props.theme, 'deactivator')
            : classProvider(props.theme, 'activator')}>
          {expanded ? <InlineIcon icon={chevronUp}/> : <InlineIcon icon={chevronDown}/>}</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(List);