import React, {useState} from 'react';
import {connect} from 'react-redux';
import {InlineIcon} from '@iconify/react';
import flagVariant from '@iconify/icons-mdi/flag-variant';
import flagVariantOutline from '@iconify/icons-mdi/flag-variant-outline';
import classProvider from '../../core/tools/classProvider';
import {useApolloClient} from '@apollo/react-hooks';

const mapStateToProps = (state) => {
  return {
    theme: state.appState.theme
  };
};

const Task = (props) => {
  const client = useApolloClient();
  const userToken = localStorage.getItem('rffUserToken').substring(7);
  const task = props.task;

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
        onClick={() => props.handlePriority(task)}>
          {task.priority
            ? 'priority off'
            : 'priority on'}
        </button></td>
        <td className={classProvider(props.theme, 'tableCell')}><button className={task.active
          ? classProvider(props.theme, 'deactivator')
          : classProvider(props.theme, 'activator')}
        onClick={() => props.handleCompletion(task)}>
          {task.active
            ? 'done'
            : 'undone'}
        </button></td>
        <td className={classProvider(props.theme, 'tableCell')}>
          <button className={classProvider(props.theme, 'deactivator')}
            onClick={() => props.handleRemoval(task)}>remove</button></td>
      </tr>
    );
  }
};

export default connect(mapStateToProps)(Task);