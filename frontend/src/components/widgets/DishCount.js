import React from 'react';
import {connect} from 'react-redux';
import {useQuery, useApolloClient} from '@apollo/react-hooks';

import classProvider from '../../core/tools/classProvider';
import '../../core/style/global.css';
import {DISH_COUNT} from '../../core/graphql/rff/queries/q_dishCount.js';

const mapStateToProps = (state) => {
  return {
    appState: state.appState
  };
};

const DishCount = (props) => {
  const dishResult = useQuery(DISH_COUNT);
  let data = 0;

  const Count = () => {
    if (!dishResult.loading) {
      if (dishResult.data) {
        data = dishResult.data.dishCount;
        return (
          <p className={classProvider(props.appState.theme, 'description')}>
            <strong>{data}</strong> dishes available</p>
        );
      }
    }
    return (
      <p className={classProvider(props.appState.theme, 'description')}>
        <strong>fetching</strong> count for dishes</p>
    );
  };

  return(
    <div className='appWidget'>
      <div className='app'>
        <div className='appContainer'>
          <Count/>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(DishCount);