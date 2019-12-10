import React from 'react';
import {connect} from 'react-redux';

import classProvider from '../../core/tools/classProvider';
import '../../core/style/global.css';

const mapStateToProps = (state) => {
  return {
    theme: state.appState.theme
  };
};

const DishComponent = (props) => {
  return (
    <div className='dishWidget'>
      DishComponent
    </div>
  );
};

export default connect(mapStateToProps)(DishComponent);