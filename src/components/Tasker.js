// RFF demo project
// Tasker.js
// React component that renders task management -section of the webapp

// imports
import React, {useState} from 'react';
import {connect} from 'react-redux';

import classProvider from '../core/tools/classProvider';
import '../core/style/global.css';
import '../core/style/tasker.css';
import {useApolloClient, useQuery, useSubscription} from '@apollo/react-hooks';
import {handleInfo, handleError} from '../core/store/reducers/AppReducer';

import {InlineIcon} from '@iconify/react';
import chevronUp from '@iconify/icons-fa-solid/chevron-up';
import chevronDown from '@iconify/icons-fa-solid/chevron-down';

import {GROUP_LISTS} from '../core/graphql/rff/queries/q_groupLists';
import {PRIVATE_LISTS} from '../core/graphql/rff/queries/q_privateLists';
import {Redirect} from 'react-router-dom';

import {LIST_ADDED_GROUP} from '../core/graphql/rff/subscriptions/s_listAddedGroup';
import {LIST_ADDED_PRIVATE} from '../core/graphql/rff/subscriptions/s_listAddedPrivate';
import {LIST_REMOVED_GROUP} from '../core/graphql/rff/subscriptions/s_listRemovedGroup';
import {LIST_REMOVED_PRIVATE} from '../core/graphql/rff/subscriptions/s_listRemovedPrivate';
import {GROUPS} from '../core/graphql/rff/queries/q_groups';
import {ADD_LIST_GROUP} from '../core/graphql/rff/mutations/m_addListGroup';
import {ADD_LIST_PRIVATE} from '../core/graphql/rff/mutations/m_addListPrivate';
import List from './widgets/List';

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
  const userToken = localStorage.getItem('rffUserToken').substring(7);
  const client = useApolloClient();
  const privateLists = useQuery(PRIVATE_LISTS, {
    variables: {
      token: userToken
    }
  });
  const groupLists = useQuery(GROUP_LISTS, {
    variables: {
      token: userToken
    }
  });

  // Apollo GraphQL subscriptions
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

  // helper function: list saving handler
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

  // helper functions for subscriptions
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
        await privateLists.refetch();
        props.handleInfo(`List added: ${list.title}`);
      }
      break;
    case 'updated':
      if (includedIn(dataInStore.privateLists, list)) {
        await privateLists.refetch();
        props.handleInfo(`List updated: ${list.title}`);
      }
      break;
    case 'removed':
      if (includedIn(dataInStore.privateLists, list)) {
        await privateLists.refetch();
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
        await groupLists.refetch();
        props.handleInfo(`List added: ${list.title}`);
      }
      break;
    case 'updated':
      if (includedIn(dataInStore.groupLists, list)) {
        await groupLists.refetch();
        props.handleInfo(`List updated: ${list.title}`);
      }
      break;
    case 'removed':
      if (includedIn(dataInStore.groupLists, list)) {
        await groupLists.refetch();
        props.handleInfo(`List removed: ${list.title}`);
      }
      break;
    default:
      break;
    }
  };

  // generic minor components, ie. query error & loading
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

  // component that gives layout base for task list rendering
  const Lists = () => {
    return (
      <div className='container'>
        {props.user
          ? <>
            <ListsP/>
            <ListsG/>
          </>
          : <p className={classProvider(props.theme, 'tileError')}>login needed</p>}
      </div>
    );
  };

  // task lists rendering components
  const ListsP = () => {
    const {data, error, loading} = privateLists;
    return (
      <div id='privateLists' className='taskList'>
        <h4 className={classProvider(props.theme, 'listHeader')}>Accessible private lists:</h4>
        <div className='taskList'>
          <AddList listType='private'/>
          {data && data.privateLists.length > 0
            ? <>{data.privateLists.map(l =>
              <List key={`privateList:${l.id}`} list={l}/>)}</>
            : <Empty type='private'/>}
        </div>
        {error && <Error type='private'/>}
        {loading && <Loading type='private'/>}
      </div>
    );
  };
  const ListsG = () => {
    const {data, error, loading} = groupLists;
    return (
      <div id='groupLists' className='taskList'>
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

  // rendering component for new list form
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
          <button title={expanded ? 'close form' : 'open form'} id={`listFormActivator_${listType}`}
            onClick={() => setExpanded(!expanded)} className={expanded
              ? classProvider(props.theme, 'deactivator')
              : classProvider(props.theme, 'activator')}>
            {expanded? <InlineIcon icon={chevronUp}/> : <InlineIcon icon={chevronDown}/>}</button>
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

  return props.show
    ? <div className='app'>
      <Lists/>
    </div>
    : <Redirect push to='/'/>;
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasker);