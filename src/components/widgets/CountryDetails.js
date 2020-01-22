

import React from 'react';
import {Flag, Image} from 'semantic-ui-react';
import {connect} from 'react-redux';
import numbro from 'numbro';
import 'semantic-ui-css/semantic.min.css';

import Country from '../../core/classes/Country';
import '../../core/style/global.css';
import '../../core/style/openCountries.css';
import classProvider from '../../core/tools/classProvider';
import {setSearch} from '../../core/store/reducers/CountryReducer';

const mapStateToProps = (state) => {
  return {
    theme: state.appState.theme,
  };
};
const mapDispatchToProps = {
  setSearch
};

const CountryDetails = (props) => {
  const country = new Country(props.country);

  const overrideSearch = (event) => {
    event.preventDefault();
    props.setSearch(country.getName());
  };

  const Alias = () => {
    const alts = country.getAltSpellings();
    return (
      <>
        <label className={classProvider(props.theme, 'heading')}>Also known as:</label>
        <ul>
          {alts.map((a) => {
            return <li className={classProvider(props.theme, 'heading')} key={a}>{a}</li>;
          })}
        </ul>
      </>
    );
  };

  const Borders = () => {
    const borders = country.getBorders();
    return (
      <>
        <label className={classProvider(props.theme, 'heading')}>Borders with:</label>
        <ul>
          {borders.map((b) => {
            return <li className={classProvider(props.theme, 'heading')} key={b}>{b}</li>;
          })}
        </ul>
      </>
    );
  };

  const Calling = () => {
    const codes = country.getCallingCodes();
    return (
      <>
        <label className={classProvider(props.theme, 'heading')}>Calling codes:</label>
        <ul>
          {codes.map((c) => {
            return <li className={classProvider(props.theme, 'heading')} key={c}>{c}</li>;
          })}
        </ul>
      </>
    );
  };

  const Currency = () => {
    const currencies = country.getCurrencies();
    return (
      <>
        <label className={classProvider(props.theme, 'heading')}>Currency:</label>
        <ul>
          {currencies.map((c) => {
            return <li className={classProvider(props.theme, 'heading')} key={c.name}>{c.name}, {c.code}, {c.symbol}</li>;
          })}
        </ul>
      </>
    );
  };

  const Domain = () => {
    const domains = country.getDomain();
    return (
      <>
        <label className={classProvider(props.theme, 'heading')}>Domain extensions:</label>
        <ul>
          {domains.map((d) => {
            return <li className={classProvider(props.theme, 'heading')} key={d}>{d}</li>;
          })}
        </ul>
      </>
    );
  };

  const CountryFlag = () => {
    return <Image size='medium' src={country.getFlag()}/>;
  };

  const Language = () => {
    const languages = country.getLanguages();
    return (
      <>
        <label className={classProvider(props.theme, 'heading')}>Official languages:</label>
        <ul>
          {languages.map((l) => {
            return <li className={classProvider(props.theme, 'heading')} key={l.name}>{l.name}, {l.nativeName}</li>;
          })}
        </ul>
      </>
    );
  };

  const Timezones = () => {
    const zones = country.getTimezones();
    return (
      <>
        <label className={classProvider(props.theme, 'heading')}>Timezones:</label>
        <ul>
          {zones.map((z) => {
            return <li className={classProvider(props.theme, 'heading')} key={z}>{z}</li>;
          })}
        </ul>
      </>
    );
  };

  const Header = () => {
    if (props.multi) {
      return (
        <div className='countryHeader'>
          <h4 className={classProvider(props.theme, 'heading')}>
            <Flag name={country.getAlpha2().toLowerCase()}/> {country.getName()}, {country.getNativeName()}
          </h4>
        </div>
      );
    } else {
      return (
        <div className='countryHeader'>
          <h3 className={classProvider(props.theme, 'heading')}>
            <Flag name={country.getAlpha2().toLowerCase()}/> {country.getName()}, {country.getNativeName()}
          </h3>
        </div>
      );
    }
  };

  const Body = () => {
    if (props.multi) {
      return (
        <div className={classProvider(props.theme, 'countryDetails')}>
          <p className={classProvider(props.theme, 'heading')}>Capital: {country.getCapital()}</p>
          <p className={classProvider(props.theme, 'heading')}>Region: {country.getRegion()}</p>
          <p className={classProvider(props.theme, 'heading')}>Subregion: {country.getSubregion()}</p>
          <p className={classProvider(props.theme, 'heading')}>Population: {numbro(country.getPopulation()).format({thousandSeparated: true})}</p>
          <p className={classProvider(props.theme, 'heading')}>ISO 3166: {country.getAlpha2()}, {country.getAlpha3()}</p>
        </div>
      );
    } else {
      return (
        <div className={classProvider(props.theme, 'countryDetails')}>
          <Alias/>
          <p className={classProvider(props.theme, 'heading')}>Capital: {country.getCapital()}</p>
          <p className={classProvider(props.theme, 'heading')}>Region: {country.getRegion()}</p>
          <p className={classProvider(props.theme, 'heading')}>Subregion: {country.getSubregion()}</p>
          <p className={classProvider(props.theme, 'heading')}>Population: {numbro(country.getPopulation()).format({thousandSeparated: true})}</p>
          <p className={classProvider(props.theme, 'heading')}>ISO 3166: {country.getAlpha2()}, {country.getAlpha3()}</p>
          <Language/>
          <Timezones/>
          <Borders/>
          <Currency/>
          <Calling/>
          <Domain/>
          <CountryFlag/>
        </div>
      );
    }
  };

  return (
    <div key={country.getNumericCode()} className='countryContainer' onClick={(event) => overrideSearch(event)}>
      <Header/>
      <Body/>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CountryDetails);