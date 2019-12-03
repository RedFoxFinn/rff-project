import React from 'react';
import {connect} from 'react-redux';

import classProvider from '../../tools/classProvider';
import '../../style/global.css';

const mapStateToProps = (state) => {
  return {
    theme: state.appState.theme,
    countries: state.countryState.countries
  };
};

const CountryCount = (props) => {

  const Count = () => {
    return (
      <p className={classProvider(props.theme, 'description')}><strong>{props.countries.length}</strong> countries information available</p>
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

export default connect(mapStateToProps)(CountryCount);