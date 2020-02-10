import React, {} from 'react';
import {connect} from 'react-redux';

import classProvider from '../core/tools/classProvider';
import {loginFailure, loginSuccess, setUsername, setPassword} from '../core/store/reducers/LoginReducer';
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
  loginFailure, loginSuccess, setUsername, setPassword, switchApp, handleInfo, handleError
};

const LoginPage = (props) => {
  const client = useApolloClient();
  const [login] = useMutation(LOGIN);

  const handleLogin = () => {
    login({
      errorPolicy: 'ignore',
      variables: {
        username: props.loginState.username,
        password: props.loginState.password
      }
    }).then(result => {
      const {data} = result;
      if (data !== null) {
        const loginToken = data.login.value;
        client.query({
          query: ME,
          variables: {
            token: loginToken.substring(7)
          }
        }).then((result) => {
          props.loginSuccess(result.data.me);
          localStorage.setItem('rffUserToken', loginToken);
          props.handleInfo('logged in successfully');
        });
      } else {
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
          <input id='loginUsername' type='text' placeholder='username' onChange={({target}) => props.setUsername(target.value)}
            className={classProvider(props.theme, 'formElement')} value={props.loginState.username} autoComplete={true}/>
          <input id='loginPassword' type='password' placeholder='password' onChange={({target}) => props.setPassword(target.value)}
            className={classProvider(props.theme, 'formElement')} value={props.loginState.password} autoComplete={true}/>
          <button id='loginButton' type='button' onClick={() => handleLogin()}
            className={classProvider(props.theme, 'formElement')}>login</button>
          <Link id='gotoRegisterButton' to='/register' onClick={() => props.switchApp('Register')}
            className={classProvider(props.theme, 'formElement')}>register</Link>
        </form>
      </div>
    </div>
    : <Redirect push to='/'/>;
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);