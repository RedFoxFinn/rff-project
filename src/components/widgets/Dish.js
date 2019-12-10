import React from 'react';
import {connect} from 'react-redux';

import classProvider from '../../core/tools/classProvider';
import '../../core/style/global.css';

const mapStateToProps = (state) => {
  return {
    theme: state.appState.theme
  };
};

const Dish = (props) => {
  return (
    <div className='dishWidget'>
      <p>{props.name}</p>
    </div>
  );
};

export default connect(mapStateToProps)(Dish);