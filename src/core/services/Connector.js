// RFF demo project
// Connector.js
// provides REST via Axios for application to use

import axios from 'axios';

const countriesUrl = 'https://restcountries.eu/rest/v2/all';

const getCountries = async () => {
  return await axios.get(countriesUrl);
};

export default {
  getCountries
};