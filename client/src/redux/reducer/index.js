import {
  GET_ALL_COUNTRIES,
  GET_COUNTRY_DETAIL,
  FILTER_BY_CONTINENT,
  ORDER_BY_AlPHABETICALLY,
  ORDER_BY_AlPHABETICALLY_CONTINENT,
  ORDER_BY_POPULATION,
} from "../actions";

import { orderCountriesByPopulation } from "../../utils/util";
const initialState = {
  countries: [],
  countryDetail: {},
  continentsOfCountries: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COUNTRIES: {
      return {
        ...state,
        countries: action.payload,
      };
    }

    case GET_COUNTRY_DETAIL: {
      return {
        ...state,
        countryDetail: action.payload,
      };
    }
    case FILTER_BY_CONTINENT: {
      return {
        ...state,
        continentsOfCountries: action.payload,
      };
    }
    case ORDER_BY_AlPHABETICALLY: {
      return {
        ...state,
        countries: action.payload,
      };
    }
    case ORDER_BY_AlPHABETICALLY_CONTINENT: {
      return {
        ...state,
        continentsOfCountries: action.payload,
      };
    }

    case ORDER_BY_POPULATION: {
      return {
        ...state,
        countries: orderCountriesByPopulation(action.payload, state.countries),
      };
    }
    // case ORDER_BY_AlPHABETICALLY: {
    //   return {
    //     ...state,
    //     continentsOfCountries: action.payload,
    //   };
    // }

    default:
      return state;
  }
};

export default rootReducer;
