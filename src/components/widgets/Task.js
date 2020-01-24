
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
  if (!props.status) {
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