import axios from "axios";
export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const GET_COUNTRY_DETAIL = "GET_COUNTRY_DETAIL";
export const CREATE_POST_ACTIVITY = "CREATE_POST_ACTIVITY";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const ORDER_BY_AlPHABETICALLY = "ORDER_BY_AlPHABETICALLY";
export const ORDER_BY_AlPHABETICALLY_CONTINENT =
  "ORDER_BY_AlPHABETICALLY_CONTINENT";
export const ORDER_BY_POPULATION = " ORDER_BY_POPULATION";

export const getAllCountries = (page) => {
  return async (dispatch) => {
    const response = await axios.get(
      `http://localhost:3001/countries?page=${page}`
    );
    return dispatch({
      type: GET_ALL_COUNTRIES,
      payload: response.data.rows,
    });
  };
};

// export const informationCopyArray = () => {
//   return async (dispatch) => {
//     const response = await axios.get(`http://localhost:3001/countries`);
//     return dispatch({
//       type: GET_INFORMATION_COPY,
//       payload: response.data,
//     });
//   };
// };

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
  return async function () {
    const response = await axios.post(
      "http://localhost:3001/activity",
      payload
    );
    return response;
  };
};
export const filterByContinent = (continent, page) => {
  return async function (dispatch) {
    const response = await axios.get(
      `http://localhost:3001/countries/continent?continent=${continent}&page=${page}`
    );
    return dispatch({
      type: FILTER_BY_CONTINENT,
      payload: response.data,
    });
  };
};

export const orderByAlphabetically = (order, page) => {
  return async function (dispatch) {
    const response = await axios.get(
      `http://localhost:3001/countries/order?order=${order}&page=${page}`
    );
    return dispatch({
      type: ORDER_BY_AlPHABETICALLY,
      payload: response.data.rows,
    });
  };
};
export const orderByAlphabeticallyContinent = (continent, order, page) => {
  return async function (dispatch) {
    const response = await axios.get(
      `http://localhost:3001/countries/order/continent?continent=${continent}&order=${order}&page=${page}`
    );
    return dispatch({
      type: ORDER_BY_AlPHABETICALLY_CONTINENT,
      payload: response.data,
    });
  };
};
export const orderByPopulation = (payload) => {
  return {
    type: "SORT_COUNTRIES_BY_POPULATION",
    payload,
  };
};

//
// export const orderCountriesByName = (payload) => {
//   return {
//     type: ORDER_COUNTRIES_BY_NAME,
//     payload,
//   };
// };
