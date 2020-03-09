import React, {useState} from 'react';
import {connect} from 'react-redux';
import {InlineIcon} from '@iconify/react';
import flagVariant from '@iconify/icons-mdi/flag-variant';
import flagVariantOutline from '@iconify/icons-mdi/flag-variant-outline';
import classProvider from '../../core/tools/classProvider';
import {TASK_PRIORITY} from '../../core/graphql/rff/mutations/m_taskPriority';
import {TASK_DEACTIVATION} from '../../core/graphql/rff/mutations/m_taskDeactivation';
import {TASK_ACTIVATION} from '../../core/graphql/rff/mutations/m_taskActivation';
import {REMOVE_TASK} from '../../core/graphql/rff/mutations/m_removeTask';
import {useApolloClient} from '@apollo/react-hooks';
import {TASKS} from '../../core/graphql/rff/queries/q_tasks';

const mapStateToProps = (state) => {
  return {
    theme: state.appState.theme
  };
};

const Task = (props) => {
  const client = useApolloClient();
  const userToken = localStorage.getItem('rffUserToken').substring(7);
  const task = props.task;

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
        props.updateCacheWithTask('updated', data.taskPriority);
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
        props.updateCacheWithTask('updated', active ? data.taskDeactivation : data.taskActivation);
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
        props.updateCacheWithTask('removed', data.removeTask);
      } else {
        props.handleError(`Error occurred with task: cannot remove ${task}`);
      }
    });
  };

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

export default connect(mapStateToProps)(Task);