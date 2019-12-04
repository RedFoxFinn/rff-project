import React from 'react';
import {connect} from 'react-redux';

import classProvider from '../tools/classProvider';
import '../style/global.css';
import '../style/dashboard.css';

import CountryCount from './widgets/CountryCount';
import DishCount from './widgets/DishCount';
import GroupCount from './widgets/GroupCount';
import ListCount from './widgets/ListCount';
import MethodCount from './widgets/MethodCount';
import TaskCount from './widgets/TaskCount';
import IngredientCount from './widgets/IngredientCount';
import TrackedStopsCount from './widgets/TrackedStopsCount';

const mapStateToProps = (state) => {
  return {
    appState: state.appState
  };
};

const Dashboard = (props) => {

  const ApplicationsCommon = () => {};

  const ApplicationsAdvanced = () => {};

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
        <div className='appElements'>
          <h4 className={classProvider(props.appState.theme, 'heading')}>Available applications:</h4>
        </div>
        <div className='appElements'>
          <h4 className={classProvider(props.appState.theme, 'heading')}>Statistics:</h4>
        </div>
        <WidgetsCommon/>
        <WidgetsAdvanced/>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Dashboard);