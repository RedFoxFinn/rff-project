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

const mapStateToProps = (state) => {
  return {
    appState: state.appState
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

  return props.show
    ? <div className='app'>
      <div className='appContainer'>
        <h4 className={classProvider(props.appState.theme, 'heading')}>App statistics:</h4>
        <WidgetsCommon/>
        <WidgetsAdvanced/>
        <h4 className={classProvider(props.appState.theme, 'heading')}>User management:</h4>
        <h4 className={classProvider(props.appState.theme, 'heading')}>Group management:</h4>
      </div>
    </div>
    : <Redirect push to='/'/>;
};

export default connect(mapStateToProps)(AdminTools);