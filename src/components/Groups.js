import React from 'react';
import {connect} from 'react-redux';
import {useQuery, useApolloClient, useSubscription} from '@apollo/react-hooks';
import classProvider from '../core/tools/classProvider';
import '../core/style/global.css';
import {InlineIcon} from '@iconify/react';
import usersCog from '@iconify/icons-fa-solid/users-cog';
import usersIcon from '@iconify/icons-fa-solid/users';
import usergroupDeleteOutline from '@iconify/icons-ant-design/usergroup-delete-outline';
import usergroupAddOutline from '@iconify/icons-ant-design/usergroup-add-outline';
import {ALL_GROUPS} from '../core/graphql/rff/queries/q_allGroups';
import {ADD_GROUP} from '../core/graphql/rff/mutations/m_addGroup';
import {UPDATE_GROUP} from '../core/graphql/rff/mutations/m_updateGroup';
import {REMOVE_GROUP} from '../core/graphql/rff/mutations/m_removeGroup';

import {handleInfo, handleError} from '../core/store/reducers/AppReducer';
import {GROUP_ADDED} from '../core/graphql/rff/subscriptions/s_groupAdded';
import {GROUP_UPDATED} from '../core/graphql/rff/subscriptions/s_groupUpdated';
import {GROUP_REMOVED} from '../core/graphql/rff/subscriptions/s_groupRemoved';

const mapStateToProps = (state) => {
  return {
    theme: state.appState.theme,
    user: state.loginState.user
  };
};
const mapDispatchToProps = {
  handleInfo, handleError
};

const Groups = (props) => {
  const userToken = localStorage.getItem('rffUserToken').substring(7);
  const client = useApolloClient();
  const {data, error, loading} = useQuery(ALL_GROUPS, {
    variables: {token: userToken}
  });

  useSubscription(GROUP_ADDED, {
    fetchPolicy: '',
    onSubscriptionData: ({subscriptionData}) => {
      const group = subscriptionData.data.groupAdded;
      updateCacheWithGroup('added', group);
    }
  });
  useSubscription(GROUP_UPDATED, {
    fetchPolicy: '',
    onSubscriptionData: ({subscriptionData}) => {
      const group = subscriptionData.data.groupUpdated;
      updateCacheWithGroup('updated', group);
    }
  });
  useSubscription(GROUP_REMOVED, {
    fetchPolicy: '',
    onSubscriptionData: ({subscriptionData}) => {
      const group = subscriptionData.data.groupRemoved;
      updateCacheWithGroup('removed', group);
    }
  });

  const updateCacheWithGroup = async (eventType, group) => {
    const includedIn = (set, object) => set.map(g => g.id).includes(object.id);
    const dataInStore = await client.readQuery({
      query: ALL_GROUPS, variables: {
        token: userToken}});

    switch (eventType) {
    case 'added':
      if (!includedIn(dataInStore.allGroups, group)) {
        await client.writeQuery({
          query: ALL_GROUPS,
          variables: {
            token: userToken,
          },
          data: {allGroups: dataInStore.allGroups.concat(group)}
        });
        props.handleInfo(`Group added: ${group.title}`);
      }
      break;
    case 'updated':
      if (includedIn(dataInStore.allGroups, group)) {
        await client.writeQuery({
          query: ALL_GROUPS,
          variables: {
            token: userToken,
          },
          data: {
            allGroups: dataInStore.allGroups.map(g => {
              return g.id === group.id ? group : g;
            })}
        });
        props.handleInfo(`Group updated: ${group.title}`);
      }
      break;
    case 'removed':
      if(includedIn(dataInStore.allGroups, group)) {
        await client.writeQuery({
          query: ALL_GROUPS,
          variables: {
            token: userToken,
          },
          data: {
            allGroups: dataInStore.allGroups.forEach(g => {
              if (g.id !== group.id) return g;
            })}
        });
        props.handleInfo(`Group removed: ${group.title}`);
      }
      break;
    default:
      break;
    }
  };

  const handleAddition = async () => {
    const variables = {
      token: userToken,
      title: document.getElementById('addGroupTitle').value
    };
    await client.mutate({
      mutation: ADD_GROUP,
      errorPolicy: 'ignore',
      variables: variables
    }).then((result) => {
      const {data} = result;
      if (data !== null) {
        updateCacheWithGroup('added', data.addGroup);
        document.getElementById('addGroupTitle').value = '';
      } else {
        props.handleError(`Error occurred with group: cannot create ${variables.title}`);
      }
    });
  };
  const handleRemoval = async ({id, title}) => {
    const variables = {
      token: userToken,
      id: id
    };
    await client.mutate({
      mutation: REMOVE_GROUP,
      errorPolicy: 'ignore',
      variables: variables
    }).then((result) => {
      const {data} = result;
      if (data !== null) {
        updateCacheWithGroup('removed', data.removeGroup);
      } else {
        props.handleError(`Error occurred with group: cannot remove ${title}`);
      }
    });
  };
  const handleActivate = async ({id, active, title}) => {
    const variables = {
      token: userToken,
      id: id,
      active: !active
    };
    await client.mutate({
      mutation: UPDATE_GROUP,
      errorPolicy: 'ignore',
      variables: variables
    }).then((result) => {
      const {data} = result;
      if (data !== null) {
        updateCacheWithGroup('updated', data.updateGroup);
      } else {
        props.handleError(`Error occurred with group: cannot update ${title}`);
      }
    });
  };

  const Error = () => {
    return <>
      <h4 className={classProvider(props.theme, 'description')}>Groups:</h4>
      <p className={classProvider(props.theme, 'tileError')}>Error occurred</p>
    </>;
  };
  const Loading = () => {
    return <>
      <h4 className={classProvider(props.theme, 'description')}>Groups:</h4>
      <p className={classProvider(props.theme, 'tileLoading')}>loading . . .</p>
    </>;
  };

  const ManageUsers = () => {
    const groups = data.allGroups;
    return groups.length > 0
      ? <>
        <h4 className={classProvider(props.theme, 'description')}>Manage groups:</h4>
        <table className={classProvider(props.theme, 'table')}>
          <thead>
            <tr className={classProvider(props.theme, 'tableRow')}>
              <th className={classProvider(props.theme, 'tableCell')}>title</th>
              <th className={classProvider(props.theme, 'tableCell')}>active</th>
              <th className={classProvider(props.theme, 'tableCell')}>change status</th>
              <th className={classProvider(props.theme, 'tableCell')}>{' '}</th>
            </tr>
          </thead>
          <tbody>
            {groups.map(g => {
              return <Manage key={g.id} group={g}/>;
            })}
            <Add/>
          </tbody>
        </table>
      </> : <>
        <h4 className={classProvider(props.theme, 'description')}>Manage groups:</h4>
        <p className={classProvider(props.theme, 'news')}>no groups</p>
      </>;
  };

  const Manage = ({group}) => {
    return (
      <tr id={group.id} className={classProvider(props.theme, 'tableRow')}>
        <td id={group.id + ':title'} className={classProvider(props.theme, 'tableCell')}>{group.title}</td>
        <td id={group.id + ':status'} className={classProvider(props.theme, 'tableCell')}>{group.active ? 'true' : 'false'}</td>
        <td className={classProvider(props.theme, 'tableCell')}>
          <button id={group.id + ':statusButton'} onClick={() => handleActivate(group)} className={group.active
            ? classProvider(props.theme, 'deactivator') : classProvider(props.theme, 'activator')}>
            {group.active ? 'deactivate' : 'activate'}</button>
        </td>
        {group.removable && <td className={classProvider(props.theme, 'tableCell')}>
          <button id={group.id + ':removeButton'} title='remove group' className={classProvider(props.theme, 'deactivator')}
            onClick={() => handleRemoval(group)}>
            <InlineIcon icon={usergroupDeleteOutline}/></button></td>}
      </tr>
    );
  };

  const Add = () => {
    return (
      <tr className={classProvider(props.theme, 'tableRow')}>
        <td className={classProvider(props.theme, 'tableCell')}>
          <input id='addGroupTitle' type='text' required minLength={3} placeholder='group title'
            className={classProvider(props.theme, 'formElement')}/>
        </td>
        <td className={classProvider(props.theme, 'tableCell')}>{' '}</td>
        <td className={classProvider(props.theme, 'tableCell')}>{' '}</td>
        <td className={classProvider(props.theme, 'tableCell')}>
          <button id='saveGroup' title='save group' className={classProvider(props.theme, 'activator')}
            onClick={() => handleAddition()}><InlineIcon icon={usergroupAddOutline}/></button></td>
      </tr>
    );
  };

  return props.user.getRole() === 'admin' || props.user.getRole() === 'owner'
    ?
    <>
      {error && <Error/>}
      {loading && <Loading/>}
      {data && <ManageUsers/>}
    </>
    : null;
};

export default connect(mapStateToProps, mapDispatchToProps)(Groups);