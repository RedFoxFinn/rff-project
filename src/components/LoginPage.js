import React, {} from 'react';
import {connect} from 'react-redux';

import classProvider from '../core/tools/classProvider';
import {loginFailure, loginSuccess} from '../core/store/reducers/LoginReducer';
import {handleError, handleInfo, switchApp} from '../core/store/reducers/AppReducer';
import '../core/style/global.css';
import {Link, Redirect} from 'react-router-dom';
import {useApolloClient, useMutation} from '@apollo/react-hooks';
import {LOGIN} from '../core/graphql/rff/mutations/m_login';
import {ME} from '../core/graphql/rff/queries/q_me';

const mapStateToProps = (state) => {
  return {
    theme: state.appState.theme,
    loginState: state.loginState
  };
};

const mapDispatchToProps = {
  loginFailure, loginSuccess, switchApp, handleInfo, handleError
};

const LoginPage = (props) => {
  const client = useApolloClient();
  const [login] = useMutation(LOGIN);

  const handleLogin = () => {
    login({
      errorPolicy: 'ignore',
      variables: {
        username: document.getElementById('loginUsername').value,
        password: document.getElementById('loginPassword').value
      }
    }).then((result) => {
      const {data} = result;
      let loginToken;
      if (data !== null) {
        loginToken = data.login.value;
        client.query({
          query: ME,
          variables: {
            token: loginToken.substring(7)
          }
        }).then((result) => {
          document.getElementById('loginUsername').value = '';
          document.getElementById('loginPassword').value = '';
          localStorage.setItem('rffUserToken', loginToken);
          props.loginSuccess(result.data.me);
          props.handleInfo('logged in successfully');
        });
      } else {
        document.getElementById('loginPassword').value = '';
        props.handleError('invalid username or password');
        props.loginFailure();
      }
    });
  };

  return props.show
    ? <div className='app'>
      {localStorage.getItem('rffUserToken') && <Redirect push to='/'/>}
      <div className='container'>
        <form className='commonElements'>
          <input id='loginUsername' type='text' placeholder='username'
            className={classProvider(props.theme, 'formElement')}/>
          <input id='loginPassword' type='password' placeholder='password'
            className={classProvider(props.theme, 'formElement')}/>
          <button id='loginButton' type='button' onClick={() => handleLogin()}
            className={classProvider(props.theme, 'formElement')}>{'login >'}</button>
          <Link id='gotoRegisterButton' to='/register' onClick={() => props.switchApp('Register')}
            className={classProvider(props.theme, 'formElement')}>{'register >'}</Link>
        </form>
      </div>
    </div>
    : <Redirect push to='/'/>;
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);