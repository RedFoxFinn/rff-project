// RFF demo project
// Task.js
// React component that renders task of the tasker-section of the webapp

import React, {} from 'react';
import {connect} from 'react-redux';

import classProvider from '../../core/tools/classProvider';
import '../../core/style/global.css';
import '../../core/style/tasker.css';
import {handleError, handleInfo} from '../../core/store/reducers/AppReducer';
import {TASK_PRIORITY} from '../../core/graphql/rff/mutations/m_taskPriority';
import {TASK_ACTIVATION} from '../../core/graphql/rff/mutations/m_taskActivation';
import {TASK_DEACTIVATION} from '../../core/graphql/rff/mutations/m_taskDeactivation';
import {REMOVE_TASK} from '../../core/graphql/rff/mutations/m_removeTask';
import {InlineIcon} from '@iconify/react';
import flagVariant from '@iconify/icons-mdi/flag-variant';
import flagVariantOutline from '@iconify/icons-mdi/flag-variant-outline';

const mapStateToProps = (state) => {
  return {
    theme: state.appState.theme
  };
};
const mapDispatchToProps = {
  handleError, handleInfo
};

const Task = (props) => {
  const task = props.task;
  const handlePriority = () => {
  };

  const Flagged = ({flagged}) => {
    return flagged
      ? <InlineIcon icon={flagVariant}/>
      : <InlineIcon icon={flagVariantOutline}/>;
  };

  if (props.status === 'error') {
    return (
      <tr className={classProvider(props.theme, 'tableRow')}>
        <td className={classProvider(props.theme, 'tableCell')}>{task.task}</td>
      </tr>
    );
  } else if (props.status === 'loading') {
    return (
      <tr className={classProvider(props.theme, 'tableRow')}>
        <td className={classProvider(props.theme, 'tableCell')}>{task.task}</td>
      </tr>
    );
  } else if (props.status === 'empty') {
    return (
      <tr className={classProvider(props.theme, 'tableRow')}>
        <td className={classProvider(props.theme, 'tableCell')}>{task.task}</td>
      </tr>
    );
  } else {
    return (
      <tr className={classProvider(props.theme, 'tableRow')}>
        <td className={classProvider(props.theme, 'tableCell')}>{task.task}</td>
        <td className={classProvider(props.theme, 'tableCell')}><Flagged flagged={task.priority}/></td>
        <td className={classProvider(props.theme, 'tableCell')}><button className={task.priority
          ? classProvider(props.theme, 'deactivator')
          : classProvider(props.theme, 'activator')}>
          {task.priority
            ? 'priority off'
            : 'priority on'}
        </button></td>
        <td className={classProvider(props.theme, 'tableCell')}><button className={task.active
          ? classProvider(props.theme, 'deactivator')
          : classProvider(props.theme, 'activator')}>
          {task.active
            ? 'done'
            : 'undone'}
        </button></td>
        <td className={classProvider(props.theme, 'tableCell')}>
          <button className={classProvider(props.theme, 'deactivator')}>remove</button></td>
      </tr>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);