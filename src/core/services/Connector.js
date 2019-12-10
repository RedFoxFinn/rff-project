

import axios from 'axios';

const countriesUrl = 'https://restcountries.eu/rest/v2/all';

const getCountries = async () => {
  return await axios.get(countriesUrl);
};

export default {
  getCountries
};