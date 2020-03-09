import React from 'react';
import {connect} from 'react-redux';
import {useQuery, useApolloClient} from '@apollo/react-hooks';
import classProvider from '../core/tools/classProvider';
import '../core/style/global.css';
import {InlineIcon} from '@iconify/react';
import usersCog from '@iconify/icons-fa-solid/users-cog';
import userCog from '@iconify/icons-fa-solid/user-cog';
import userTimes from '@iconify/icons-fa-solid/user-times';
import saveIcon from '@iconify/icons-fa-regular/save';
import trashAlt from '@iconify/icons-fa-regular/trash-alt';
import {USERS} from '../core/graphql/rff/queries/q_users';
import {ADD_GROUP} from '../core/graphql/rff/mutations/m_addGroup';
import {UPDATE_USER} from '../core/graphql/rff/mutations/m_updateUser';
import {REMOVE_USER} from '../core/graphql/rff/mutations/m_removeUser';

import {handleInfo, handleError} from '../core/store/reducers/AppReducer';
import {Redirect} from 'react-router-dom';

const mapStateToProps = (state) => {
  return {
    theme: state.appState.theme,
    user: state.loginState.user
  };
};
const mapDispatchToProps = {
  handleInfo, handleError
};

const Users = (props) => {
  const userToken = localStorage.getItem('rffUserToken').substring(7);
  const client = useApolloClient();
  const {data, error, loading} = useQuery(USERS, {
    variables: {token: userToken}
  });

  const handleRemoval = async ({id, username}) => {
    const variables = {
      token: userToken,
      id: id
    };
    await client.mutate({
      mutation: REMOVE_USER,
      errorPolicy: 'ignore',
      variables: variables
    }).then((result) => {
      const {data} = result;
      if (data !== null) {
        props.handleInfo(`User removed: ${username}`);
      } else {
        props.handleError(`Error occurred with user: cannot remove ${username}`);
      }
    });
  };
  /*const handleEdit = async () => {
    const variables = {
      token: userToken,
      content: document.getElementById('addNewsContent').value,
      category: document.getElementById('addNewsCategory').value
    };
    await client.mutate({
      mutation: ADD_NEWS,
      errorPolicy: 'ignore',
      variables: variables
    }).then((result) => {
      const {data} = result;
      if (data !== null) {
        updateCacheWithNews('added', data.addNews);
        document.getElementById('addNewsContent').value = '';
        document.getElementById('addNewsCategory').value = '';
      } else {
        props.handleError(`Error occurred with news: cannot add ${variables.content}`);
      }
    });
  };*/

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
        <td className={classProvider(props.theme, 'tableCell')}>
          <button className={user.role === 'user'
            ? classProvider(props.theme, 'activator') : classProvider(props.theme, 'deactivator')}>
            {user.role === 'user' ? 'promote' : 'demote'}</button>
        </td>
        <td className={classProvider(props.theme, 'tableCell')}>{user.active ? 'true' : 'false'}</td>
        <td className={classProvider(props.theme, 'tableCell')}>
          <button className={user.role === 'user'
            ? classProvider(props.theme, 'deactivator') : classProvider(props.theme, 'activator')}>
            {user.active ? 'deactivate' : 'activate'}</button>
        </td>
        {user.removable && <td className={classProvider(props.theme, 'tableCell')}>
          <button title='remove user' className={classProvider(props.theme, 'deactivator')}>
            <InlineIcon icon={userTimes}/></button></td>}
      </tr>
    );
  };

  return props.user && (props.user.getRole() === 'admin' || props.user.getRole() === 'owner')
    ?
    <>
      {error && <Error/>}
      {loading && <Loading/>}
      {data && <ManageUsers/>}
    </>
    : <Redirect push to='/'/>;
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);