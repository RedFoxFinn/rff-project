import React from 'react';
import {connect} from 'react-redux';

import classProvider from '../../core/tools/classProvider';
import '../../core/style/global.css';
import '../../core/style/dishy.css';

const mapStateToProps = (state) => {
  return {
    theme: state.appState.theme
  };
};

const DishComponent = (props) => {
  return (
    <div className='dishWidget'>
      <p className={classProvider(props.theme, 'description')}>DishComponent</p>
    </div>
  );
};

export default connect(mapStateToProps)(DishComponent);