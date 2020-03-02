// RFF demo project
// CountryCount.js
// React component that renders country counter based on available country information

import React from 'react';
import {connect} from 'react-redux';

import classProvider from '../../core/tools/classProvider';
import '../../core/style/global.css';

const mapStateToProps = (state) => {
  return {
    theme: state.appState.theme,
    countries: state.countryState.countries
  };
};

const CountryCount = (props) => {

  const Count = () => {
    return (
      <p className={classProvider(props.theme, 'tileDescription')}>
        <strong>{props.countries.length}</strong> countries information available</p>
    );
  };

  return(
    <div className='tile'>
      <div className='app'>
        <div className='container'>
          <Count/>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(CountryCount);