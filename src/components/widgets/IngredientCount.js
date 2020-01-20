import React from 'react';
import {connect} from 'react-redux';
import {useQuery} from '@apollo/react-hooks';

import classProvider from '../../core/tools/classProvider';
import '../../core/style/global.css';
import {CARB_COUNT} from '../../core/graphql/rff/queries/q_carbCount.js';
import {PROTEIN_COUNT} from '../../core/graphql/rff/queries/q_proteinCount.js';
import {SPICE_COUNT} from '../../core/graphql/rff/queries/q_spiceCount.js';

const mapStateToProps = (state) => {
  return {
    appState: state.appState
  };
};

const IngredientCount = (props) => {
  const carbResult = useQuery(CARB_COUNT);
  const proteinResult = useQuery(PROTEIN_COUNT);
  const spiceResult = useQuery(SPICE_COUNT);
  let data = 0;

  const Count = () => {
    if (!carbResult.loading && !proteinResult.loading && !spiceResult.loading) {
      if (carbResult.data && proteinResult.data && spiceResult.data) {
        data = carbResult.data.carbCount + proteinResult.data.proteinCount + spiceResult.data.spiceCount;
        return <p className={classProvider(props.appState.theme, 'tileDescription')}>
          <strong>{data}</strong> ingredients available
        </p>;
      } else {
        return <p className={classProvider(props.appState.theme, 'tileError')}>
          error occurred while loading ingredient count
        </p>;
      }
    }
    return <p className={classProvider(props.appState.theme, 'tileLoading')}>
      loading ingredient count
    </p>;
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

export default connect(mapStateToProps)(IngredientCount);