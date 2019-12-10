

const initialState = {
  countries: [],
  countrySearch: '',
  selected: ''
};

const CountryReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'search':
    return {...state, countrySearch: action.search};
  case 'resetSearch':
    return {...state, countrySearch: ''};
  case 'setCountries':
    return {...state, countries: action.countries};
  case 'setSelected':
    return {...state, selected: action.selected};
  case 'resetSelected':
    return {...state, selected: ''};
  default:
    return state;
  }
};

export const initCountries = (countries) => {
  return async dispatch => {
    dispatch({
      type: 'setCountries',
      countries: countries
    });
  };
};

export const resetSearch = () => {
  return async dispatch => {
    dispatch({
      type: 'resetSearch'
    });
  };
};

export const setSearch = (search) => {
  return async dispatch => {
    dispatch({
      type: 'search',
      search: search
    });
  };
};

export const setSelection = (id) => {
  return async dispatch => {
    dispatch({
      type: 'setSelected',
      selected: id
    });
  };
};

export const resetSelection = () => {
  return async dispatch => {
    dispatch({
      type: 'setSelected'
    });
  };
};

export default CountryReducer;