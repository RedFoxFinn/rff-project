import React from 'react';
import {connect} from 'react-redux';

import classProvider from '../core/tools/classProvider';
import {
  setNewUsername, setNewPassword, setNewPasswordConfirm, registerFailure, registerSuccess
} from '../core/store/reducers/LoginReducer';
import '../core/style/global.css';

const mapStateToProps = (state) => {
  return {
    theme: state.appState.theme,
    loginState: state.loginState
  };
};

const mapDispatchToProps = {
  setNewUsername, setNewPassword, setNewPasswordConfirm, registerFailure, registerSuccess
};

const RegistrationPage = (props) => {

  const register = (event) => {
    event.preventDefault();
    console.error('attempt!');
  };

  return(
    <div className='app'>
      <div className='appContainer'>
        <form className='commonElements'>
          <input type='text' required minLength={4} placeholder='username'
            onChange={({target}) => props.setNewUsername(target.value)}
            className={classProvider(props.theme, 'formElement')} value={props.loginState.newUsername} autoComplete={true}/>
          <input type='password' required minLength={8} placeholder='password'
            onChange={({target}) => props.setNewPassword(target.value)}
            className={classProvider(props.theme, 'formElement')} value={props.loginState.newPassword} autoComplete={false}/>
          <input type='password' required minLength={8} placeholder='re-type password'
            onChange={({target}) => props.setNewPasswordConfirm(target.value)}
            className={classProvider(props.theme, 'formElement')} value={props.loginState.newPasswordConfirm} autoComplete={false}/>
          <button type='button' disabled={props.loginState.newPassword !== props.loginState.newPasswordConfirm}
            onClick={(event) => register(event)}
            className={classProvider(props.theme, 'formElement')}>register</button>
        </form>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);