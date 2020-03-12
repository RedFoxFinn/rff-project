import React from 'react';
import {connect} from 'react-redux';
import {useQuery, useApolloClient, useSubscription} from '@apollo/react-hooks';
import classProvider from '../core/tools/classProvider';
import '../core/style/global.css';
import {InlineIcon} from '@iconify/react';
import accountRemoveOutline from '@iconify/icons-mdi/account-remove-outline';
import cogOutline from '@iconify/icons-mdi/cog-outline';
import {USERS} from '../core/graphql/rff/queries/q_users';
import {ACTIVATE_USER} from '../core/graphql/rff/mutations/m_activateUser';
import {DEACTIVATE_USER} from '../core/graphql/rff/mutations/m_deactivateUser';
import {UPDATE_USER} from '../core/graphql/rff/mutations/m_updateUser';
import {REMOVE_USER} from '../core/graphql/rff/mutations/m_removeUser';
import {DEMOTE_USER} from '../core/graphql/rff/mutations/m_demoteUser';
import {PROMOTE_USER} from '../core/graphql/rff/mutations/m_promoteUser';

import {handleInfo, handleError} from '../core/store/reducers/AppReducer';
import {USER_ADDED} from '../core/graphql/rff/subscriptions/s_userAdded';
import {USER_UPDATED} from '../core/graphql/rff/subscriptions/s_userUpdated';
import {USER_REMOVED} from '../core/graphql/rff/subscriptions/s_userRemoved';

const mapStateToProps = (state) => {
  return {
    theme: state.appState.theme,
    currentUser: state.loginState.user
  };
};
const mapDispatchToProps = {
  handleInfo, handleError
};

const Users = (props) => {
  const userToken = localStorage.getItem('rffUserToken').substring(7);
  const client = useApolloClient();
  const {data, error, loading, refetch} = useQuery(USERS, {
    variables: {token: userToken}
  });

  useSubscription(USER_ADDED, {
    fetchPolicy: '',
    onSubscriptionData: ({subscriptionData}) => {
      const user = subscriptionData.data.userAdded;
      updateCacheWithUser('added', user);
    }
  });
  useSubscription(USER_UPDATED, {
    fetchPolicy: '',
    onSubscriptionData: ({subscriptionData}) => {
      const user = subscriptionData.data.userUpdated;
      updateCacheWithUser('updated', user);
    }
  });
  useSubscription(USER_REMOVED, {
    fetchPolicy: '',
    onSubscriptionData: ({subscriptionData}) => {
      const user = subscriptionData.data.userRemoved;
      updateCacheWithUser('removed', user);
    }
  });

  const updateCacheWithUser = async (eventType, user) => {
    const includedIn = (set, object) => set.map(u => u.id).includes(object.id);
    const dataInStore = await client.readQuery({
      query: USERS, variables: {
        token: userToken}});

    switch (eventType) {
    case 'added':
      if (!includedIn(dataInStore.users, user)) {
        await refetch();
        props.handleInfo(`User added: ${user.username}`);
      }
      break;
    case 'updated':
      if (includedIn(dataInStore.users, user)) {
        await refetch();
        props.handleInfo(`User updated: ${user.username}`);
      }
      break;
    case 'removed':
      if(includedIn(dataInStore.users, user)) {
        await refetch();
        props.handleInfo(`User removed: ${user.username}`);
      }
      break;
    default:
      break;
    }
  };

  const handleRemoval = async ({id}) => {
    const variables = {
      token: userToken,
      id: id
    };
    await client.mutate({
      mutation: REMOVE_USER,
      variables: variables
    }).then((result) => {
      const {data, errors} = result;
      if (data !== null) {
        updateCacheWithUser('removed', data.removeUser);
      } else {
        props.handleError(errors[0].message);
      }
    });
  };
  const handleActive = async ({id, active}) => {
    const variables = {
      token: userToken,
      id: id
    };
    await client.mutate({
      mutation: active ? DEACTIVATE_USER : ACTIVATE_USER,
      variables: variables
    }).then((result) => {
      const {data, errors} = result;
      if (data !== null) {
        updateCacheWithUser('added', active ? data.deactivateUser : data.activateUser);
      } else {
        props.handleError(errors[0].message);
      }
    });
  };
  const handleRole = async ({id, role}) => {
    const variables = {
      token: userToken,
      id: id
    };
    role !== 'owner' && await client.mutate({
      mutation: role === 'user' ? PROMOTE_USER : DEMOTE_USER,
      variables: variables
    }).then((result) => {
      const {data, errors} = result;
      if (data !== null) {
        updateCacheWithUser('updated', role === 'user' ? data.promoteUser : data.demoteUser);
      } else {
        props.handleError(errors[0].message);
      }
    });
  };

  const Error = () => {
    return <>
      <h4 className={classProvider(props.theme, 'description')}>News:</h4>
      <p className={classProvider(props.theme, 'tileError')}>Error occurred</p>
    </>;
  };
  const Loading = () => {
    return <>
      <h4 className={classProvider(props.theme, 'description')}>News:</h4>
      <p className={classProvider(props.theme, 'tileLoading')}>loading . . .</p>
    </>;
  };

  const ManageUsers = () => {
    const users = data.users;
    return users.length > 0
      ? <>
        <h4 className={classProvider(props.theme, 'description')}>Manage users:</h4>
        <table className={classProvider(props.theme, 'table')}>
          <thead>
            <tr className={classProvider(props.theme, 'tableRow')}>
              <th className={classProvider(props.theme, 'tableCell')}>username</th>
              <th className={classProvider(props.theme, 'tableCell')}>role</th>
              <th className={classProvider(props.theme, 'tableCell')}>change role</th>
              <th className={classProvider(props.theme, 'tableCell')}>activated</th>
              <th className={classProvider(props.theme, 'tableCell')}>change status</th>
              <th className={classProvider(props.theme, 'tableCell')}>{' '}</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => {
              return <Manage key={u.id} user={u}/>;
            })}
          </tbody>
        </table>
      </> : <>
        <h4 className={classProvider(props.theme, 'description')}>Manage news:</h4>
        <p className={classProvider(props.theme, 'news')}>no news</p>
      </>;
  };

  const Manage = ({user}) => {
    return (
      <tr className={classProvider(props.theme, 'tableRow')}>
        <td className={classProvider(props.theme, 'tableCell')}>{user.username}</td>
        <td className={classProvider(props.theme, 'tableCell')}>{user.role}</td>
        {user.role !== 'owner' && props.currentUser.getId() !== user.id
          ? <td className={classProvider(props.theme, 'tableCell')}>
            <button title={user.role === 'user' ? 'promote' : 'demote'}
              id={`${user.id}-roleButton`}
              onClick={() => handleRole(user)} className={user.role === 'user'
                ? classProvider(props.theme, 'activator')
                : classProvider(props.theme, 'deactivator')}>
              <InlineIcon icon={cogOutline}/></button></td>
          : <td className={classProvider(props.theme, 'tableCell')}>{' '}</td>}
        <td className={classProvider(props.theme, 'tableCell')}>{user.active ? 'true' : 'false'}</td>
        {props.currentUser.getId() !== user.id && <td className={classProvider(props.theme, 'tableCell')}>
          <button title={user.active ? 'deactivate' : 'activate'} id={`${user.id}-activatorButton`}
            className={user.active ? classProvider(props.theme, 'deactivator')
              : classProvider(props.theme, 'activator')}
            onClick={() => handleActive(user)}><InlineIcon icon={cogOutline}/></button></td>}
        {user.removable && <td className={classProvider(props.theme, 'tableCell')}>
          <button title='remove user' id={`${user.id}-removeButton`}
            className={classProvider(props.theme, 'deactivator')}
            onClick={() => handleRemoval(user)}><InlineIcon icon={accountRemoveOutline}/></button></td>}
      </tr>
    );
  };

  return props.show
    ?
    <>
      {error && <Error/>}
      {loading && <Loading/>}
      {data && <ManageUsers/>}
    </>
    : null;
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);