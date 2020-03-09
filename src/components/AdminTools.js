// RFF demo project
// AdminTools.js
// React component that renders webapp administrative tools

import React from 'react';
import {connect} from 'react-redux';

import classProvider from '../core/tools/classProvider';
import '../core/style/global.css';
import CountryCount from './widgets/CountryCount';
import GroupCount from './widgets/GroupCount';
import ListCount from './widgets/ListCount';
import TaskCount from './widgets/TaskCount';
import DishCount from './widgets/DishCount';
import IngredientCount from './widgets/IngredientCount';
import MethodCount from './widgets/MethodCount';
import TrackedStopsCount from './widgets/TrackedStopsCount';
import UserCount from './widgets/UserCount';
import {Redirect} from 'react-router-dom';
import News from './News';
import Users from './Users';

const mapStateToProps = (state) => {
  return {
    appState: state.appState,
    user: state.loginState.user
  };
};

const AdminTools = (props) => {
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
        <ListCount mode='admin'/>
        <TaskCount mode='admin'/>
        <GroupCount mode='admin'/>
        <UserCount mode='admin'/>
        <TrackedStopsCount mode='admin'/>
      </div>
    );
  };

  return props.show && props.user && (props.user.getRole() === 'admin' || props.user.getRole() === 'owner')
    ? <div className='app'>
      <div className='commonElements'>
        <h4 className={classProvider(props.appState.theme, 'heading')}>App statistics:</h4>
        <WidgetsCommon/>
        <WidgetsAdvanced/>
        <News mode='admin'/>
        <Users/>
        <h4 className={classProvider(props.appState.theme, 'heading')}>Group management:</h4>
      </div>
    </div>
    : <Redirect push to='/'/>;
};

export default connect(mapStateToProps)(AdminTools);