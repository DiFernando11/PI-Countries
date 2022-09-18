import axios from "axios";
export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const GET_ALL_COUNTRIES_COPY = "GET_ALL_COUNTRIES_COPY ";
export const GET_COUNTRY_DETAIL = "GET_COUNTRY_DETAIL";
export const CREATE_POST_ACTIVITY = "CREATE_POST_ACTIVITY";
export const SORT_BY_NAME_COUNTRIES = "SORT_BY_NAME_COUNTRIES ";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const SORT_BY_POPULATION = "SORT_BY_POPULATION";
export const FILTER_COUNTRIES_BY_ACTIVITY = "FILTER_COUNTRIES_BY_ACTIVITY";
export const SEARCH_COUNTRIES = "SEARCH_COUNTRIES";
export const STATE_COUNTRY = "STATE_COUNTRY";
export const SEARCH_COUNTRIES_BY_ACTIVITY = "SEARCH_COUNTRIES_BY_ACTIVITY";
export const STATE_PAGE = "STATE_PAGE";

// export const getAllCountries = (page) => {
//   return async (dispatch) => {
//     const response = await axios.get(
//       `http://localhost:3001/countries?page=${page}`
//     );
//     return dispatch({
//       type: GET_ALL_COUNTRIES,
//       payload: response.data,
//     });
//   };
// };
// export const getAllCountriesCopy = () => {
//   return async (dispatch) => {
//     const response = await axios.get(`http://localhost:3001/countries`);
//     return dispatch({
//       type: GET_ALL_COUNTRIES_COPY,
//       payload: response.data,
//     });
//   };
// };
export const getAllCountries = () => {
  return async (dispatch) => {
    const response = await axios.get(`http://localhost:3001/countries`);
    return dispatch({
      type: GET_ALL_COUNTRIES,
      payload: response.data,
    });
  };
};

export const getCountryDetail = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`http://localhost:3001/countries/${id}`);
    return dispatch({
      type: GET_COUNTRY_DETAIL,
      payload: response.data,
    });
  };
};

export const createPostActivity = (payload) => {
  return async function (dispatch) {
    const response = await axios.post(
      "http://localhost:3001/activity",
      payload
    );
    return dispatch({
      type: CREATE_POST_ACTIVITY,
      payload: response.data,
    });
  };
};

export const sortByNameCountries = (payload) => {
  return {
    type: SORT_BY_NAME_COUNTRIES,
    payload,
  };
};
export const filterByContinent = (payload) => {
  return {
    type: FILTER_BY_CONTINENT,
    payload,
  };
};
export const sortByPopulation = (payload) => {
  return {
    type: SORT_BY_POPULATION,
    payload,
  };
};

export const filterCountriesByActivity = (payload) => {
  return {
    type: FILTER_COUNTRIES_BY_ACTIVITY,
    payload,
  };
};
export const searchCountries = (payload) => {
  return {
    type: SEARCH_COUNTRIES,
    payload,
  };
};
export const searchCountriesByActivities = (payload) => {
  return {
    type: SEARCH_COUNTRIES_BY_ACTIVITY,
    payload,
  };
};
export const setStateCountry = (payload) => {
  return {
    type: STATE_COUNTRY,
    payload,
  };
};
export const statePage = (payload) => {
  return {
    type: STATE_PAGE,
    payload,
  };
};
