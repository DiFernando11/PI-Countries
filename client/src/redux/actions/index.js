import axios from "axios";
export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";

export const getAllCountries = () => {
  return async (dispatch) => {
    const response = await axios.get("http://localhost:3001/countries");
    return dispatch({
      type: GET_ALL_COUNTRIES,
      payload: response.data,
    });
  };
};
