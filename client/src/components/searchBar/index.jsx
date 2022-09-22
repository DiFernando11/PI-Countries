import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCountries,
  searchCountries,
  setStateCountry,
} from "../../redux/actions";
import "./index.css";

function SearchBar() {
  const [country, setCountries] = useState("");
  let stateCountry = useSelector((state) => state.stateCountry);

  let dispatch = useDispatch();
  if (country.length === 0 && stateCountry === "All") {
    dispatch(getAllCountries(0));
  }

  const handleSearchCountry = (e) => {
    e.preventDefault();
    setCountries(e.target.value);
    dispatch(searchCountries(country));
  };
  const handleResetSearch = () => {
    dispatch(setStateCountry("All"));
  };
  return (
    <form className="input_search_country">
      
      <input
        type="text"
        placeholder="Country..."
        onClick={() => handleResetSearch()}
        onChange={(e) => handleSearchCountry(e)}
        className="src"
      >

      </input >
    </form>
  );
}

export default SearchBar;
