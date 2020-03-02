// RFF demo project
// Navigation.js
// React component that renders navigation-section of the webapp

import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {handleError, handleInfo, switchApp, switchTheme} from '../core/store/reducers/AppReducer';
import {logout, loginSuccess} from '../core/store/reducers/LoginReducer';
import classProvider from '../core/tools/classProvider';
import '../core/style/navigation.css';
import '../core/style/global.css';

import {ME} from '../core/graphql/rff/queries/q_me';
import {useApolloClient} from '@apollo/react-hooks';

const mapStateToProps = (state) => {
  return {
    appState: state.appState,
    loginState: state.loginState
  };
};

const mapDispatchToProps = {
  switchApp, switchTheme, logout, loginSuccess, handleError, handleInfo
};

const Navigation = (props) => {

  const client = useApolloClient();
  const themes = ['light', 'dark'];
  const theme = props.appState.theme;
  const loginToken = localStorage.getItem('rffUserToken');
  const setTheme = localStorage.getItem('rffTheme');

  useEffect(() => {
    loginToken !== null && client.query({
      query: ME,
      variables: {
        token: loginToken.substring(7)
      }
    }).then((result, errors) => {
      if (!errors) {
        props.loginSuccess(result.data.me);
      } else {
        props.handleError(errors[0]);
      }
    });
  }, [loginToken, client]);
  useEffect(() => {
    setTheme !== null && props.switchTheme(setTheme);
  }, []);

  const MenuModule = () => {
    return (
      <div className={classProvider(theme, 'navMenu')}>
        <button className={classProvider(theme, 'navButton')}>menu</button>
        <div className={classProvider(theme, 'navContent')}>
          <Link to='/' onClick={() => props.switchApp('Home')}>Home</Link>
          <Link to='/dashboard' onClick={() => props.switchApp('Dashboard')}>Dashboard</Link>
          <Link to='/calculate' onClick={() => props.switchApp( 'Calculate')}>Calculate</Link>
          <Link to='/countries' onClick={() => props.switchApp( 'OpenCountry')}>OpenCountry</Link>
          <Link to='/dishy' onClick={() => props.switchApp( 'Dishy')}>Dishy</Link>
          {props.loginState.user && <Link to='/tasker' onClick={() => props.switchApp( 'Tasker')}>Tasker</Link>}
          <Link to='/transit' onClick={() => props.switchApp( 'Transporter')}>Transporter</Link>
          {props.loginState.user && (props.loginState.user.role === 'admin' || props.loginState.user.role === 'owner')
            && <Link to='/admin' onClick={() => props.switchApp( 'Admin tools')}>Admin tools</Link>}
          <Link to='/about' onClick={() => props.switchApp( 'About')}>About</Link>
          <ThemeSelector/>
        </div>
      </div>
    );
  };

  const ThemeSelector = () => {
    return (
      <div className={classProvider(theme, 'navSubMenu')}>
        <button className={classProvider(theme, 'navSubButton')}>
          <strong>{props.appState.theme}</strong> theme selected
        </button>
        <div className={classProvider(theme, 'navSubContent')}>
          {themes.map((t) =>
            <a key={t} onClick={() => props.switchTheme(t)}>{t}</a>
          )}
        </div>
      </div>
    );
  };

  const LoginModule = () => {
    if (!localStorage.getItem('rffUserToken')) {
      return (
        <div className={classProvider(theme, 'loginMenu')}>
          <Link to='/login' onClick={() => props.switchApp('Login')}>login</Link>
        </div>
      );
    } else {
      return (
        <div className={classProvider(theme, 'navMenu')}>
          <button type='button' className={classProvider(theme, 'navButton')}>
            {props.loginState.user !== null ? props.loginState.user.getUsername() : null}
          </button>
          <div className={classProvider(theme, 'navContent')}>
            <Link to='/user' onClick={() => props.switchApp('UserSettings')}>settings</Link>
            <Link to='/' onClick={() => logout()}>logout</Link>
          </div>
        </div>
      );
    }
  };

  function logout() {
    props.logout();
    localStorage.removeItem('rffUserToken');
    props.handleInfo('logged out');
    props.switchApp('Home');
  }

  const NotificationModule = () => {
    const notification = props.appState.notification;

    if (notification && notification.type === 'info') {
      return (
        <div className='commonElements'>
          <h4 id='notification' className={classProvider(theme, 'notificationInfo')}>{notification.message}</h4>
        </div>
      );
    } else if (notification && notification.type === 'error') {
      return (
        <div className='commonElements'>
          <h4 id='notification' className={classProvider(theme, 'notificationError')}>{notification.message}</h4>
        </div>
      );
    } else {
      return (
        <div className='commonElements'>
          <h4 id='notification' className={classProvider(theme, 'notificationNull')}>{' '}</h4>
        </div>
      );
    }
  };

  return(
    <div className='navRow'>
      <MenuModule/>
      <NotificationModule/>
      <LoginModule/>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
