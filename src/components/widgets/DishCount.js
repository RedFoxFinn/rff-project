import React from 'react';
import {connect} from 'react-redux';
import {useQuery} from '@apollo/react-hooks';

import classProvider from '../../core/tools/classProvider';
import '../../core/style/global.css';
import {DISH_COUNT} from '../../core/graphql/rff/queries/q_dishCount.js';

const mapStateToProps = (state) => {
  return {
    appState: state.appState
  };
};

const DishCount = (props) => {
  const {data, error, loading} = useQuery(DISH_COUNT);

  const Count = () => {
    if (!loading) {
      if (!error) {
        return <p className={classProvider(props.appState.theme, 'tileDescription')}>
          <strong>{data.dishCount}</strong> dishes available
        </p>;
      } else {
        return <p className={classProvider(props.appState.theme, 'tileError')}>
          error occurred while loading dish count
        </p>;
      }
    }
    return <p className={classProvider(props.appState.theme, 'tileLoading')}>loading dish count</p>;
  };

  return(
    <div className='tile'>
      <div className='app'>
        <div className='appContainer'>
          <Count/>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(DishCount);