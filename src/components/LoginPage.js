import React from 'react';
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
      variables: {
        username: props.loginState.username,
        password: props.loginState.password
      }
    }).then((result, errors) => {
      if (!errors) {
        const loginToken = result.data.login.value;
        client.query({
          query: ME,
          variables: {
            token: loginToken.substring(7)
          }
        }).then((result) => props.loginSuccess(result.data.me)
          && props.handleInfo('logged in successfully')
          && localStorage.setItem('rffUserToken', loginToken)
          && <Redirect push to='/'/>
        );
      } else {
        props.handleError(errors[0]);
        props.loginFailure();
      }
    });
  };

  return (
    <div className='app'>
      {localStorage.getItem('rffUserToken') && <Redirect push to='/'/>}
      <div className='appContainer'>
        <form className='commonElements'>
          <input type='text' placeholder='username' onChange={({target}) => props.setUsername(target.value)}
            className={classProvider(props.theme, 'formElement')} value={props.loginState.username} autoComplete={true}/>
          <input type='password' placeholder='password' onChange={({target}) => props.setPassword(target.value)}
            className={classProvider(props.theme, 'formElement')} value={props.loginState.password} autoComplete={true}/>
          <button type='button' onClick={() => handleLogin()}
            className={classProvider(props.theme, 'formElement')}>login</button>
          <Link to='/register' onClick={() => props.switchApp('Register')}
            className={classProvider(props.theme, 'formElement')}>register</Link>
        </form>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);