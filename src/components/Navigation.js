import React from 'react';
import {connect} from "react-redux";
import {Link} from 'react-router-dom';

import classProvider from '../tools/classProvider';
import '../style/navigation.css';
import '../style/global.css';

const mapStateToProps = (state) => {
  return {
    appState: state.appState,
    loginState: state.loginState
  }
};

const Navigation = (props) => {
  
  const themes = ['light', 'dark', 'dev'];

  const switchApp = (app) => {
    props.dispatch({type: 'switchApplication', application: app});
  };

  const Menu = () => {
    const theme = props.appState.theme;
    return (
      <div className={classProvider(theme, 'navMenu')}>
        <button className={classProvider(theme, 'navButton')}>
          Menu
        </button>
        <div className={classProvider(theme, 'navContent')}>
          <Link to='/' onClick={() => switchApp('Home')}>Home</Link>
          <Link to='/dashboard' onClick={() => switchApp('Dashboard')}>Dashboard</Link>
          <Link to='/calculate' onClick={() => switchApp( 'Calculate')}>Calculate</Link>
          <Link to='/countries' onClick={() => switchApp( 'OpenCountry')}>OpenCountry</Link>
          <Link to='/dishy' onClick={() => switchApp( 'Dishy')}>Dishy</Link>
          <Link to='/tasker' onClick={() => switchApp( 'Tasker')}>Tasker</Link>
          <Link to='/transit' onClick={() => switchApp( 'Transporter')}>Transporter</Link>
          <Link to='/admin' onClick={() => switchApp( 'Admin tools')}>Admin tools</Link>
          <Link to='/about' onClick={() => switchApp( 'About')}>About</Link>
          <Link to='/default' onClick={() => switchApp( 'CRA Default')}>CRA Default</Link>
        </div>
      </div>
    );
  };

  const ThemeSelector = () => {
    const theme = props.appState.theme;
    return (
      <div className={classProvider(theme, 'navMenu')}>
        <button className={classProvider(theme, 'navButton')}>
          <strong>{props.appState.theme}</strong> theme selected
        </button>
        <div className={classProvider(theme, 'navContent')}>
          {themes.map((t) =>
            <a key={t} onClick={event => switchTheme(event, t)}>{t}</a>
          )}
        </div>
      </div>
    );
  };

  const LoginModule = () => {
    const theme = props.appState.theme;
    return (
      <div>
        <button>
          {props.loginState.user ? 'logout' : 'login'}
        </button>
        <div>
        </div>
      </div>
    );
  };

  function switchTheme(event, theme) {
    event.preventDefault();
    props.dispatch({type: 'switchTheme', theme: theme});
  }

  return(
    <div className='navRow'>
      <Menu/>
      <h3 className={classProvider(props.appState.theme, 'heading')}>{props.appState.application}</h3>
      <ThemeSelector/>
    </div>
  )
};

export default connect(mapStateToProps)(Navigation);
