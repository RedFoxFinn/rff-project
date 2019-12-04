import React from 'react';
import {connect} from 'react-redux';

import classProvider from '../tools/classProvider';
import '../style/global.css';
import CountryCount from './widgets/CountryCount';
import GroupCount from './widgets/GroupCount';
import ListCount from './widgets/ListCount';
import TaskCount from './widgets/TaskCount';
import DishCount from './widgets/DishCount';
import IngredientCount from './widgets/IngredientCount';
import MethodCount from './widgets/MethodCount';
import TrackedStopsCount from './widgets/TrackedStopsCount';
import UserCount from './widgets/UserCount';

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
        <GroupCount mode='admin'/>
        <ListCount mode='admin'/>
        <TaskCount mode='admin'/>
        <TrackedStopsCount mode='admin'/>
        <UserCount mode='admin'/>
      </div>
    );
  };

  return(
    <div className='app'>
      <div className='appContainer'>
        <div className='appElements'>
          <h4 className={classProvider(props.appState.theme, 'heading')}>App statistics:</h4>
        </div>
        <WidgetsCommon/>
        <WidgetsAdvanced/>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(AdminTools);