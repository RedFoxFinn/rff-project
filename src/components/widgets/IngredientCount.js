import React from 'react';
import {connect} from 'react-redux';
import {useQuery, useApolloClient} from '@apollo/react-hooks';

import classProvider from '../../core/tools/classProvider';
import '../../core/style/global.css';
import {CARB_COUNT} from '../../core/graphql/queries/q_carbCount.js';
import {PROTEIN_COUNT} from '../../core/graphql/queries/q_proteinCount.js';
import {SPICE_COUNT} from '../../core/graphql/queries/q_spiceCount.js';

const mapStateToProps = (state) => {
  return {
    appState: state.appState
  };
};

const IngredientCount = (props) => {
  const client = useApolloClient();
  const carbResult = useQuery(CARB_COUNT);
  const proteinResult = useQuery(PROTEIN_COUNT);
  const spiceResult = useQuery(SPICE_COUNT);
  let data = 0;

  const Count = () => {
    if (!carbResult.loading && !proteinResult.loading && !spiceResult.loading) {
      if (carbResult.data && proteinResult.data && spiceResult.data) {
        data = carbResult.data.carbCount + proteinResult.data.proteinCount + spiceResult.data.spiceCount;
        return (
          <p className={classProvider(props.appState.theme, 'description')}>
            <strong>{data}</strong> ingredients available</p>
        );
      }
    }
    return (
      <p className={classProvider(props.appState.theme, 'description')}>
        <strong>fetching</strong> count for ingredients</p>
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

export default connect(mapStateToProps)(IngredientCount);