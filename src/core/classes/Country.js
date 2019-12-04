

import PropTypes from 'prop-types';

class Country {
  constructor(props) {
    this.state = {
      name: props.name,
      numericCode: props.numericCode,
      topLevelDomain: props.topLevelDomain,
      alpha2Code: props.alpha2Code,
      alpha3Code: props.alpha3Code,
      callingCodes: props.callingCodes,
      capital: props.capital,
      altSpellings: props.altSpellings,
      region: props.region,
      subregion: props.subregion,
      population: props.population,
      timezones: props.timezones,
      borders: props.borders,
      nativeName: props.nativeName,
      currencies: props.currencies,
      languages: props.languages,
      flag: props.flag
    };
  }
  getName() {
    return this.state.name;
  }
  getNumericCode() {
    return this.state.numericCode;
  }
  getDomain() {
    return this.state.topLevelDomain;
  }
  getAlpha2() {
    return this.state.alpha2Code;
  }
  getAlpha3() {
    return this.state.alpha3Code;
  }
  getCallingCodes() {
    return this.state.callingCodes;
  }
  getCapital() {
    return this.state.capital;
  }
  getAltSpellings() {
    return this.state.altSpellings;
  }
  getRegion() {
    return this.state.region;
  }
  getSubregion() {
    return this.state.subregion;
  }
  getPopulation() {
    return this.state.population;
  }
  getTimezones() {
    return this.state.timezones;
  }
  getBorders() {
    return this.state.borders;
  }
  getNativeName() {
    return this.state.nativeName;
  }
  getCurrencies() {
    return this.state.currencies;
  }
  getLanguages() {
    return this.state.languages;
  }
  getFlag() {
    return this.state.flag;
  }
}

Country.propTypes = {
  name: PropTypes.string,
  numericCode: PropTypes.string,
  topLevelDomain: PropTypes.array,
  alpha2Code: PropTypes.string,
  alpha3Code: PropTypes.string,
  callingCodes: PropTypes.array,
  capital: PropTypes.string,
  altSpellings: PropTypes.array,
  region: PropTypes.string,
  subRegion: PropTypes.string,
  population: PropTypes.number,
  timezones: PropTypes.array,
  borders: PropTypes.array,
  nativeName: PropTypes.string,
  currencies: PropTypes.array,
  languages: PropTypes.array,
  flag: PropTypes.string
};

export default Country;