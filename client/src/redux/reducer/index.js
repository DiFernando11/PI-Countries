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
  DELETE_ACTIVITY,
  UPDATE_ACTIVITY,
  FAVORITE_ACTIVITIES,
  REFRESH_STATE,
  GET_ALL_ACTIVITIES,
  IS_FAVORITE_ACTIVITY,
  // GET_ALL_ACTIVITIES_BY_COUNTRIES,
  // PRUEBA_ACTIVITY,

} from "../actions";
import {
  filterByActividadCountries,
  filterByContinentsCountry,
  orderByArea,
  orderCountries,
  orderCountriesByPopulation,
  pruebaActivity,
  searchCountry,
  searchCountryByActivity,
} from "../../utils/util";

const initialState = {
  countries: [],
  countryDetail: {},
  copyCountries: [],
  favoriteActivity: [],
  activities: [],
  responseCreateActivity: "",
  stateCountry: "All",
  statePage: 1,
  stateRefreshUpdate: false,
  activitiesAll: [],
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
    case GET_ALL_ACTIVITIES: {
      return {
        ...state,
        activities: action.payload,
      };
    }
    case CREATE_POST_ACTIVITY: {
      return {
        ...state,
        responseCreateActivity: action.payload,
      };
    }
    case DELETE_ACTIVITY: {
      return {
        ...state,
        responseCreateActivity: action.payload,
      };
    }
    case UPDATE_ACTIVITY: {
      return {
        ...state,
        responseCreateActivity: action.payload,
      };
    }
    case FAVORITE_ACTIVITIES: {
      return {
        ...state,
        favoriteActivity: action.payload,
      };
    }
    case IS_FAVORITE_ACTIVITY: {
      return {
        ...state,
        activities: action.payload,
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
        countries: filterByContinentsCountry(
          state.copyCountries,
          action.payload
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
        countries: filterByActividadCountries(
          state.copyCountries,
          action.payload,
          action.continent
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
    case REFRESH_STATE: {
      return {
        ...state,
        stateRefreshUpdate: !state.stateRefreshUpdate,
      };
    }

    // case GET_ALL_ACTIVITIES_BY_COUNTRIES: {
    //   return {
    //     ...state,
    //     activitiesAll: action.payload,
    //   };
    // }
    // case PRUEBA_ACTIVITY: {
    //   return {
    //     ...state,
    //     countries: pruebaActivity(state.copyCountries, action.payload),
    //   };
    // }
    default:
      return state;
  }
};

export default rootReducer;
