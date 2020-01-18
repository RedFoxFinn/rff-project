import React from 'react';
import {connect} from 'react-redux';

import classProvider from '../core/tools/classProvider';
import {
  loginFailure, loginSuccess, setUsername, setPassword
} from '../core/store/reducers/LoginReducer';
import {handleError, handleInfo, switchApp} from '../core/store/reducers/AppReducer';
import '../core/style/global.css';
import {Link, Redirect} from 'react-router-dom';
import {useApolloClient, useMutation} from '@apollo/react-hooks';

import {LOGIN} from '../core/graphql/rff/mutations/m_login';
import {ME} from '../core/graphql/rff/queries/q_me';
import {UPDATE_USER} from '../core/graphql/rff/mutations/m_updateUser';

const mapStateToProps = (state) => {
  return {
    theme: state.appState.theme,
    user: state.loginState.user
  };
};

const mapDispatchToProps = {
  loginFailure, loginSuccess, setUsername, setPassword, switchApp, handleInfo, handleError
};

const UserPage = (props) => {
  const client = useApolloClient();

  const UserManager = () => {
    return (
      <div className='commonElements'>
        <h5 className={classProvider(props.theme, 'heading')}>User information</h5>
        <UserData/>
        <br/>
        <h5 className={classProvider(props.theme, 'heading')}>Change password</h5>
        <ChangePassword/>
        <br/>
        <h5 className={classProvider(props.theme, 'heading')}>Change username</h5>
        <ChangeUsername/>
      </div>
    );
  };

  const UserData = () => {
    return (
      <>
        <p className={classProvider(props.theme, 'description')}>User: <strong>{props.user.username}</strong></p>
        <p className={classProvider(props.theme, 'description')}>Role: <strong>{props.user.role}</strong></p>
        <p className={classProvider(props.theme, 'description')}>Active: <strong>{props.user.active ? 'true' : 'false'}</strong></p>
        <p className={classProvider(props.theme, 'description')}>Removable: <strong>{props.user.removable ? 'true' : 'false'}</strong></p>
        <p className={classProvider(props.theme, 'description')}>ID: <strong>{props.user.id}</strong></p>
      </>
    );
  };

  const ChangeUsername = () => {
    return (
      <form className='appContainer' onSubmit={(event) => handleUsernameChange(event)}>
        <input id='changeUsernamePW' type='password' required placeholder='password' autoComplete={true}
          className={classProvider(props.theme, 'formElement')}/>
        <input id='changeUsernameNew' type='text' required placeholder='new username' autoComplete={false}
          className={classProvider(props.theme, 'formElement')}/>
        <button type='submit' className={classProvider(props.theme, 'formElement')}>change username</button>
      </form>
    );
  };

  const ChangePassword = () => {
    return (
      <form className='appContainer' onSubmit={(event) => handlePasswordChange(event)}>
        <input id='changePasswordOld' type='password' required placeholder='old password' autoComplete={true}
          className={classProvider(props.theme, 'formElement')}/>
        <input id='changePasswordNew' type='password' required placeholder='new password' autoComplete={false}
          className={classProvider(props.theme, 'formElement')}/>
        <input id='changePasswordConfirm' type='password' required placeholder='retype new password' autoComplete={false}
          className={classProvider(props.theme, 'formElement')}/>
        <button type='submit' className={classProvider(props.theme, 'formElement')}>
          change password
        </button>
      </form>
    );
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();
    const password = document.getElementById('changePasswordOld').value;
    const newPassword = document.getElementById('changePasswordNew').value;
    const confirm = document.getElementById('changePasswordConfirm').value;
    newPassword === confirm
      ? await client.mutate({
        mutation: UPDATE_USER,
        variables: {
          token: localStorage.getItem('rffUserToken').toString().substring(7),
          password: password,
          newPassword: newPassword === confirm && newPassword
        }
      }).then((result, errors) => {
        if (!errors) {
          client.mutate({
            mutation: LOGIN,
            variables: {
              username: props.user.username,
              password: newPassword
            }
          }).then((result, errors) => {
            if (!errors) {
              const token = result.data.login.value;
              client.query({
                query: ME,
                variables: {
                  token: token.substring(7)
                }
              }).then((result, errors) => {
                if (!errors) {
                  localStorage.setItem('rffUserToken', token);
                  props.loginSuccess(result.data.me);
                  props.handleInfo('login renewed');
                } else {
                  props.loginFailure();
                  props.handleError(errors[0]);
                }
              });
            } else {
              props.handleError(errors[0]);
            }
          });
        } else {
          props.handleError(errors[0]);
        }
      })
      : props.handleError({message: 'New passwords do not match'});
    document.getElementById('changePasswordOld').value = '';
    document.getElementById('changePasswordNew').value = '';
    document.getElementById('changePasswordConfirm').value = '';
  };

  const handleUsernameChange = async (event) => {
    event.preventDefault();
    const password = document.getElementById('changeUsernamePW').value;
    const newUsername = document.getElementById('changeUsernameNew').value;
    await client.mutate({
      mutation: UPDATE_USER,
      variables: {
        token: localStorage.getItem('rffUserToken').toString().substring(7),
        password: password,
        newUsername: newUsername
      }
    }).then((result, errors) => {
      if (!errors) {
        client.mutate({
          mutation: LOGIN,
          variables: {
            username: newUsername,
            password: password
          }
        }).then((result, errors) => {
          if (!errors) {
            const token = result.data.login.value;
            client.query({
              query: ME,
              variables: {
                token: token.substring(7)
              }
            }).then((result, errors) => {
              if (!errors) {
                localStorage.setItem('rffUserToken', token);
                props.loginSuccess(result.data.me);
                props.handleInfo('login renewed');
              } else {
                props.loginFailure();
                props.handleError(errors[0]);
              }
            });
          } else {
            props.handleError(errors[0]);
          }
        });
      }
    });
  };

  return (
    <div className='app'>
      <div className='appContainer'>
        {props.user && <UserManager/>}
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);

/*<form className='commonElements'>
//           <input type='text' placeholder='username' onChange={({target}) => props.setUsername(target.value)}
//                  className={classProvider(props.theme, 'formElement')} value={props.loginState.username} autoComplete={true}/>
//           <input type='password' placeholder='password' onChange={({target}) => props.setPassword(target.value)}
//                  className={classProvider(props.theme, 'formElement')} value={props.loginState.password} autoComplete={true}/>
//           <button type='button' onClick={() => handleLogin()}
//                   className={classProvider(props.theme, 'formElement')}>login</button>
//           <Link to='/register' onClick={() => props.switchApp('Register')}
//                 className={classProvider(props.theme, 'formElement')}>register</Link>
//         </form>*/