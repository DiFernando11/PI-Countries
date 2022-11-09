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
export const GET_ALL_ACTIVITIES = "GET_ALL_ACTIVITIES";
export const DELETE_ACTIVITY = "DELETE_ACTIVITY";
export const UPDATE_ACTIVITY = "UPDATE_ACTIVITY";
export const FAVORITE_ACTIVITIES = "FAVORITE_ACTIVITIES";
export const CREATE_FAVORITE_ACTIVITIES = "CREATE_FAVORITE_ACTIVITIES";
export const IS_FAVORITE_ACTIVITY = "IS_FAVORITE_ACTIVITY ";
export const DELETE_FAVORITE_ACTIVITY = "DELETE_FAVORITE_ACTIVITY";
export const UPDATE_CARD_FAVORITE = "UPDATE_CARD_FAVORITE";
export const STATE_PAGE = "STATE_PAGE";
export const REFRESH_STATE = "REFRESH_STATE ";
export const ORDER_AREA = "ORDER_AREA";
export const LOADING_COUNTRIES = "LOADING_COUNTRIES";

// export const GET_ALL_ACTIVITIES_BY_COUNTRIES = "ALL_ACTIVITIES_BY_COUNTRIES";
// export const PRUEBA_ACTIVITY = "PRUEBA_ACTIVITY";

export const getAllCountries = () => {
  return async (dispatch) => {
    const response = await axios.get(`/countries`);
    return dispatch({
      type: GET_ALL_COUNTRIES,
      payload: response.data,
    });
  };
};

export const getCountryDetail = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`/countries/${id}`);
    return dispatch({
      type: GET_COUNTRY_DETAIL,
      payload: response.data,
    });
  };
};

export function getActivities(id) {
  return async function (dispatch) {
    const response = await axios.get(`/activity/${id}`);
    return dispatch({
      type: GET_ALL_ACTIVITIES,
      payload: response.data,
    });
  };
}

export const createPostActivity = (payload) => {
  return async function (dispatch) {
    const response = await axios.post("/activity", payload);
    return dispatch({
      type: CREATE_POST_ACTIVITY,
      payload: response.data,
    });
  };
};

export function deleteActivity(id, countryId) {
  return async function (dispatch) {
    const response = await axios.delete(`/activity/${id}`, {
      data: { countryId },
    });
    return dispatch({
      type: DELETE_ACTIVITY,
      payload: response.data,
    });
  };
}
export const updateActivity = (id, payload) => {
  return async (dispatch) => {
    const response = await axios.put(`/activity/${id}`, payload);
    return dispatch({
      type: UPDATE_ACTIVITY,
      payload: response.data,
    });
  };
};

export const favoriteActivities = () => {
  return async (dispatch) => {
    const response = await axios.get("/favorites");
    return dispatch({
      type: FAVORITE_ACTIVITIES,
      payload: response.data,
    });
  };
};
export const createFavoriteActivities = (payload) => {
  return async function (dispatch) {
    const response = await axios.post("/favorites", payload);
    return dispatch({
      type: CREATE_FAVORITE_ACTIVITIES,
      payload: response.data,
    });
  };
};

export const deleteFavority = (id) => {
  return async function (dispatch) {
    await axios.delete(`/favorites/activity/${id}`);
    return dispatch({
      type: DELETE_FAVORITE_ACTIVITY,
    });
  };
};

export const updateCardFavorite = (id, payload) => {
  return async (dispatch) => {
    await axios.put(`/favorites/${id}`, payload);
    return dispatch({
      type: UPDATE_CARD_FAVORITE,
    });
  };
};

export const isFavoriteActivity = (id, idCountry) => {
  return async (dispatch) => {
    const response = await axios.put(
      `/favorites/activity/${id}?country=${idCountry}`
    );
    return dispatch({
      type: IS_FAVORITE_ACTIVITY,
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
export const sortByPopulation = (payload) => {
  return {
    type: SORT_BY_POPULATION,
    payload,
  };
};
export const filterByContinent = (payload) => {
  return {
    type: FILTER_BY_CONTINENT,
    payload: payload,
  };
};

export const filterCountriesByActivity = (payload, continent) => {
  return {
    type: FILTER_COUNTRIES_BY_ACTIVITY,
    payload,
    continent,
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
export const setRefreshUpdate = () => {
  return {
    type: REFRESH_STATE,
  };
};
export const setLoadingCountries = () => {
  return {
    type: LOADING_COUNTRIES,
  };
};

export const orderByAreaCountries = (order) => {
  return {
    type: ORDER_AREA,
    payload: order,
  };
};
