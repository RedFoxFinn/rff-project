// RFF demo project
// Task.js
// React component that renders task of the tasker-section of the webapp

import React, {} from 'react';
import {connect} from 'react-redux';

import classProvider from '../../core/tools/classProvider';
import '../../core/style/global.css';
import '../../core/style/tasker.css';

const mapStateToProps = (state) => {
  return {
    theme: state.appState.theme
  };
};

const Task = (props) => {
  const handlePriority = () => {};

  if (props.status === 'error') {
    return (
      <div className='taskContainer'>
        <p className={classProvider(props.theme, 'tileError')}>{props.task.task}</p>
      </div>
    );
  } else if (props.status === 'loading') {
    return (
      <div className='taskContainer'>
        <p className={classProvider(props.theme, 'tileLoading')}>{props.task.task}</p>
      </div>
    );
  } else if (props.status === 'empty') {
    return (
      <div className='taskContainer'>
        <p className={classProvider(props.theme, 'task')}>{props.task.task}</p>
      </div>
    );
  } else {
    const task = props.task;
    return (
      <div className='taskContainer'>
        <p className={classProvider(props.theme, 'task')}>{task.task}</p>
        <p className={classProvider(props.theme, 'task')}>{task.priority}</p>
        <p className={classProvider(props.theme, 'task')}>{task.active}</p>
        <p className={classProvider(props.theme, 'task')}>{task.creator.username}</p>
      </div>
    );
  }
};

export default connect(mapStateToProps)(Task);