import {
  GET_ALL_COUNTRIES,
  GET_COUNTRY_DETAIL,
  SORT_BY_NAME_COUNTRIES,
  FILTER_BY_CONTINENT,
  SORT_BY_POPULATION,
  FILTER_COUNTRIES_BY_ACTIVITY,
  SEARCH_COUNTRIES,
  STATE_COUNTRY,
  SEARCH_COUNTRIES_BY_ACTIVITY,
  STATE_PAGE,
  CREATE_POST_ACTIVITY,
} from "../actions";
import {
  orderCountries,
  orderCountriesByPopulation,
  searchCountry,
  searchCountryByActivity,
} from "../../utils/util";

const initialState = {
  countries: [],
  countryDetail: {},
  copyCountries: [],
  responseCreateActivity: "",
  stateCountry: "All",
  statePage: 1,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COUNTRIES: {
      return {
        ...state,
        countries: action.payload,
        copyCountries: action.payload,
      };
    }

    case GET_COUNTRY_DETAIL: {
      return {
        ...state,
        countryDetail: action.payload,
      };
    }
    case CREATE_POST_ACTIVITY: {
      return {
        ...state,
        responseCreateActivity: action.payload,
      };
    }
    case SORT_BY_NAME_COUNTRIES: {
      return {
        ...state,
        countries: orderCountries(action.payload, state.countries),
      };
    }
    case FILTER_BY_CONTINENT: {
      return {
        ...state,
        countries: state.copyCountries.filter(
          (country) => country.continent === action.payload
        ),
      };
    }
    case SORT_BY_POPULATION: {
      return {
        ...state,
        countries: orderCountriesByPopulation(action.payload, state.countries),
      };
    }
    case FILTER_COUNTRIES_BY_ACTIVITY: {
      return {
        ...state,
        countries: state.copyCountries.filter(
          (country) =>
            country.activities &&
            country.activities
              .map((activity) => activity.typeActivity)
              .includes(action.payload)
        ),
      };
    }
    case SEARCH_COUNTRIES: {
      return {
        ...state,
        countries: searchCountry(action.payload, state.copyCountries),
      };
    }
    case SEARCH_COUNTRIES_BY_ACTIVITY: {
      return {
        ...state,
        countries: searchCountryByActivity(action.payload, state.copyCountries),
      };
    }

    case STATE_COUNTRY: {
      return {
        ...state,
        stateCountry: action.payload,
      };
    }
    case STATE_PAGE: {
      return {
        ...state,
        statePage: action.payload,
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
