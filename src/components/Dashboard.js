import React from 'react';
import {connect} from "react-redux";

import classProvider from '../tools/classProvider';
import '../style/global.css';
import '../style/dashboard.css';

import CountryCount from "./widgets/CountryCount";
import DishCount from "./widgets/DishCount";
import GroupCount from "./widgets/GroupCount";
import ListCount from "./widgets/ListCount";
import TaskCount from "./widgets/TaskCount";
import IngredientCount from "./widgets/IngredientCount";
import TrackedStopsCount from "./widgets/TrackedStopsCount";

const mapStateToProps = (state) => {
  return {
    appState: state.appState
  }
};

const Dashboard = (props) => {
  return(
    <div className='app'>
      <div className='appContainer'>
        <h4 className={classProvider(props.appState.theme, 'heading')}>Available applications:</h4>
        <h4 className={classProvider(props.appState.theme, 'heading')}>Statistics:</h4>
        <div className='appWidgets'>
          <CountryCount/>
          <GroupCount/>
          <ListCount/>
          <TaskCount/>
          <DishCount/>
          <IngredientCount/>
          <TrackedStopsCount/>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Dashboard);