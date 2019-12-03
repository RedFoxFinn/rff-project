

import React from 'react';
import {Flag, Image} from 'semantic-ui-react';
import {connect} from 'react-redux';
import numbro from 'numbro';
import 'semantic-ui-css/semantic.min.css';

import Country from '../../classes/Country';
import '../../style/global.css';
import '../../style/openCountries.css';
import classProvider from '../../tools/classProvider';
import {setSearch} from '../../store/reducers/CountryReducer';

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
      <ul>
        <label className={classProvider(props.theme, 'heading')}>Also known as:</label>
        {alts.map((a) => {
          return <li className={classProvider(props.theme, 'heading')} key={a}>{a}</li>;
        })}
      </ul>
    );
  };

  const Borders = () => {
    const borders = country.getBorders();
    return (
      <ul>
        <label className={classProvider(props.theme, 'heading')}>Borders with:</label>
        {borders.map((b) => {
          return <li className={classProvider(props.theme, 'heading')} key={b}>{b}</li>;
        })}
      </ul>
    );
  };

  const Calling = () => {
    const codes = country.getCallingCodes();
    return (
      <ul>
        <label className={classProvider(props.theme, 'heading')}>Calling codes:</label>
        {codes.map((c) => {
          return <li className={classProvider(props.theme, 'heading')} key={c}>{c}</li>;
        })}
      </ul>
    );
  };

  const Currency = () => {
    const currencies = country.getCurrencies();
    return (
      <ul>
        <label className={classProvider(props.theme, 'heading')}>Currency:</label>
        {currencies.map((c) => {
          return <li className={classProvider(props.theme, 'heading')} key={c.name}>{c.name}, {c.code}, {c.symbol}</li>;
        })}
      </ul>
    );
  };

  const Domain = () => {
    const domains = country.getDomain();
    return (
      <ul>
        <label className={classProvider(props.theme, 'heading')}>Domain extensions:</label>
        {domains.map((d) => {
          return <li className={classProvider(props.theme, 'heading')} key={d}>{d}</li>;
        })}
      </ul>
    );
  };

  const CountryFlag = () => {
    return <Image size='medium' src={country.getFlag()}/>;
  };

  const Language = () => {
    const languages = country.getLanguages();
    return (
      <ul>
        <label className={classProvider(props.theme, 'heading')}>Official languages:</label>
        {languages.map((l) => {
          return <li className={classProvider(props.theme, 'heading')} key={l.name}>{l.name}, {l.nativeName}</li>;
        })}
      </ul>
    );
  };

  const Timezones = () => {
    const zones = country.getTimezones();
    return (
      <ul>
        <label className={classProvider(props.theme, 'heading')}>Timezones:</label>
        {zones.map((z) => {
          return <li className={classProvider(props.theme, 'heading')} key={z}>{z}</li>;
        })}
      </ul>
    );
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
      {props.multi
        ? <h4 className={classProvider(props.theme, 'heading')}>
          <Flag name={country.getAlpha2().toLowerCase()}/> {country.getName()}, {country.getNativeName()}
        </h4>
        : <h3 className={classProvider(props.theme, 'heading')}>
          <Flag name={country.getAlpha2().toLowerCase()}/> {country.getName()}, {country.getNativeName()}
        </h3>
      }
      <Body/>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CountryDetails);