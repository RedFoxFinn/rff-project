import React from 'react';
import {connect} from 'react-redux';

import classProvider from '../core/tools/classProvider';
import {loginFailure, loginSuccess, setUsername, setPassword} from '../core/store/reducers/LoginReducer';
import {handleError, handleInfo, switchApp} from '../core/store/reducers/AppReducer';
import '../core/style/global.css';
import {Link, Redirect} from 'react-router-dom';
import {useApolloClient, useMutation} from '@apollo/react-hooks';

const mapStateToProps = (state) => {
  return {
    theme: state.appState.theme,
    loginState: state.loginState
  };
};

const mapDispatchToProps = {
  loginFailure, loginSuccess, setUsername, setPassword, switchApp, handleInfo, handleError
};

const UserPage = (props) => {
  const client = useApolloClient();

  return (
    <div className='app'>
      <div className='appContainer'>
        <h4>haahaa!</h4>
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