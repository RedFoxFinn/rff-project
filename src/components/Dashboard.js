import React from 'react';
import {connect} from 'react-redux';

import classProvider from '../core/tools/classProvider';
import '../core/style/global.css';
import '../core/style/dashboard.css';

import CountryCount from './widgets/CountryCount';
import DishCount from './widgets/DishCount';
import GroupCount from './widgets/GroupCount';
import ListCount from './widgets/ListCount';
import MethodCount from './widgets/MethodCount';
import TaskCount from './widgets/TaskCount';
import IngredientCount from './widgets/IngredientCount';
import TrackedStopsCount from './widgets/TrackedStopsCount';
import {Link} from 'react-router-dom';

const mapStateToProps = (state) => {
  return {
    appState: state.appState,
    theme: state.appState.theme,
    user: state.loginState.user
  };
};

const Dashboard = (props) => {
  const common = [
    {app: 'Calculate', link: '/calculate'},
    {app: 'Dishy', link: '/dishy'},
    {app: 'OpenCountry', link: '/countries'},
  ];
  const advanced = [
    {app: 'Tasker', link: '/tasker'},
    {app: 'Transporter', link: '/transit'},
  ];

  const ApplicationsCommon = () => {
    return (
      <div className='appWidgets'>
        {common.map(a => {
          return (
            <div key={`app:${a.app}`} className='dashTile'>
              <div className='app'>
                <div className='appContainer'>
                  <Link className={classProvider(props.theme, 'tileDescription')} push to={a.link}>{a.app}</Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const ApplicationsAdvanced = () => {
    return (
      <div className='appWidgets'>
        {advanced.map(a => {
          return (
            <div key={`app:${a.app}`} className='dashTile'>
              <div className='app'>
                <div className='appContainer'>
                  <Link className={classProvider(props.theme, 'tileDescription')} push to={a.link}>{a.app}</Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const WidgetsCommon = () => {
    return (
      <div className='appWidgets'>
        <CountryCount/>
        <DishCount/>
        <IngredientCount/>
        <MethodCount/>
      </div>
    );
  };

  const WidgetsAdvanced = () => {
    return (
      <div className='appWidgets'>
        <GroupCount/>
        <ListCount/>
        <TaskCount/>
        <TrackedStopsCount/>
      </div>
    );
  };

  return(
    <div className='app'>
      <div className='appContainer'>
        <h4 className={classProvider(props.appState.theme, 'heading')}>Available applications:</h4>
        <ApplicationsCommon/>
        {props.user ? <ApplicationsAdvanced/> : null}
        <h4 className={classProvider(props.appState.theme, 'heading')}>Statistics:</h4>
        <WidgetsCommon/>
        {props.user ? <WidgetsAdvanced/> : null}
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Dashboard);