import React from 'react';
import {connect} from 'react-redux';

import classProvider from '../core/tools/classProvider';
import '../core/style/global.css';

import {handleInfo, handleError} from '../core/store/reducers/AppReducer';
import {ADD_USER} from '../core/graphql/rff/mutations/m_addUser';
import {useApolloClient} from '@apollo/react-hooks';

const mapStateToProps = (state) => {
  return {
    theme: state.appState.theme,
    loginState: state.loginState
  };
};

const mapDispatchToProps = {
  handleError, handleInfo
};

const RegistrationPage = (props) => {
  const client = useApolloClient();

  const register = async (event) => {
    event.preventDefault();
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
    const confirm = document.getElementById('regConfirm').value;
    console.error('attempt!');
    password === confirm
      ? await client.mutate({
        mutation: ADD_USER,
        variables: {
          username: username,
          password: password
        }
      }).then((result, errors) => {
        if (!errors) {
          props.handleInfo(`${username} registered`);
        } else {
          props.handleError(errors[0]);
        }
      })
      : props.handleError({message: 'New passwords do not match'});
    document.getElementById('regUsername').value = '';
    document.getElementById('regPassword').value = '';
    document.getElementById('regConfirm').value = '';
  };

  return(
    <div className='app'>
      <div className='appContainer'>
        <form className='commonElements' onSubmit={(event) => register(event)}>
          <input id='regUsername' type='text' required minLength={4} placeholder='username'
            className={classProvider(props.theme, 'formElement')} autoComplete={true}/>
          <input id='regPassword' type='password' required minLength={8} placeholder='password'
            className={classProvider(props.theme, 'formElement')} autoComplete={false}/>
          <input id='regConfirm' type='password' required minLength={8} placeholder='re-type password'
            className={classProvider(props.theme, 'formElement')} autoComplete={false}/>
          <button type='submit' className={classProvider(props.theme, 'formElement')}>register</button>
        </form>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);