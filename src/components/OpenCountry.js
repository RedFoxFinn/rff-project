import React, {} from 'react';
import {connect} from 'react-redux';
import {Icon, InlineIcon} from '@iconify/react';
import resetIcon from '@iconify/icons-iwwa/reset';


import classProvider from '../core/tools/classProvider';
import '../core/style/global.css';
import '../core/style/openCountries.css';
import {setSearch, resetSearch} from '../core/store/reducers/CountryReducer';
import CountryDetails from './widgets/CountryDetails';

const mapStateToProps = (state) => {
  return {
    theme: state.appState.theme,
    countries: state.countryState.countries,
    countrySearch: state.countryState.countrySearch
  };
};

const mapDispatchToProps = {
  setSearch,
  resetSearch
};

const Countries = (props) => {

  let matched = [];

  const handleSearch = (event) => {
    event.preventDefault();
    props.setSearch(event.target.value);
  };

  const ListCountries = () => {
    if (props.countrySearch.length > 0) {
      for (let i = 0; i < props.countries.length; i++) {
        if (props.countries[i].name.toLowerCase().includes(props.countrySearch.toLowerCase())) {
          matched = [...matched, props.countries[i]];
        }
      }
      if (matched.length >= 4) {
        return matched.map((c) => {
          return (
            <div key={c.numericCode} className='countryAppElements'>
              <CountryDetails key={c.numericCode} multi={true} country={c}/>
            </div>
          );
        });
      } else if (matched.length < 1) {
        return (
          <div className='countryAppElements'>
            <h5>{'Couldn\'t find any entries'}</h5>
          </div>
        );
      } else {
        return matched.map((c) => {
          return (
            <div key={c.numericCode} className='countryAppElements'>
              <CountryDetails key={c.numericCode} multi={false} country={c}/>
            </div>
          );
        });
      }
    } else {
      matched = [];
      return props.countries.map((c) => {
        return (
          <div key={c.numericCode} className='countryAppElements'>
            <CountryDetails key={c.numericCode} multi={true} country={c}/>
          </div>
        );
      });
    }
  };

  return(
    <div className='app'>
      <div className='appContainer'>
        <div className='appElements'>
          <div className='countryContainer'>
            <p className={classProvider(props.theme, 'heading')}>
              Data for {props.countrySearch.length > 0 ? props.countries.length : props.countries.length} countries found.
            </p>
          </div>
        </div>
        <div className='appElements'>
          <input type='search' placeholder='search country by typing name'
            onChange={event => handleSearch(event)}
            onReset={() => props.resetSearch()} value={props.countrySearch}
            className={classProvider(props.theme, 'countrySearch')}/>
          <button onClick={() => props.resetSearch()} title='reset search'
            className={classProvider(props.theme, 'countrySearchCancel')}><Icon icon={resetIcon} /></button>
        </div>
        <ListCountries/>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Countries);