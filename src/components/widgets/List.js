import React, {useState} from 'react';
import {connect} from 'react-redux';
import {useQuery} from '@apollo/react-hooks';
import {TASKS} from '../../core/graphql/rff/queries/q_tasks';
import classProvider from '../../core/tools/classProvider';
import {InlineIcon} from '@iconify/react';
import userShield from '@iconify/icons-fa-solid/user-shield';
import usersIcon from '@iconify/icons-fa-solid/users';
import chevronUp from '@iconify/icons-fa-solid/chevron-up';
import chevronDown from '@iconify/icons-fa-solid/chevron-down';
import {ADD_TASK} from '../../core/graphql/rff/mutations/m_addTask';
import Task from './Task';
import flagVariant from '@iconify/icons-mdi/flag-variant';
import flagVariantOutline from '@iconify/icons-mdi/flag-variant-outline';

const mapStateToProps = (state) => {
  return {
    theme: state.appState.theme,
    user: state.loginState.user
  };
};

// task list rendering component
const List = (props) => {
  const handleSaveTask = props.handleSaveTask;
  const updateCacheWithTask = props.updateCacheWithTask;
  const list = props.list;
  const userToken = localStorage.getItem('rffUserToken').substring(7);
  const [expanded, setExpanded] = useState(false);
  const {data, loading, error} = useQuery(TASKS, {
    variables: {
      token: userToken,
      listID: list.id
    }
  });

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
              return <Task key={t.id} status={true} task={t} updateCacheWithTask={updateCacheWithTask}/>;
            })}
          </tbody>
        </table>
      );
    } else {
      return <TaskEmpty/>;
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
    <div className='listContainer'>
      <div key={`${list.listType}:${list.id}`} className='componentContainer'>
        <div className='component'>
          <strong><p className={classProvider(props.theme, 'text')}>
            <InlineIcon icon={list.listType === 'PrivateList' ? userShield : usersIcon}/> {list.title}
          </p></strong>
        </div>
        <button title={expanded ? 'hide list' : 'show list'} onClick={() => setExpanded(!expanded)}
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

export default connect(mapStateToProps)(List);