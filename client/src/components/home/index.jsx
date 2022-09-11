import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries } from "../../redux/actions";
import CountryCard from "../countryCard";
import SearchBar from "../searchBar/index"

function Home() {
  let dispatch = useDispatch();
  let countries = useSelector((state) => state.countries);
  useEffect(() => {
    dispatch(getAllCountries());
  }, []);
  return (
    ////////Search COMPONENT
    <main>
      <h2>INFORMATION COUNTRIES</h2>
      {countries &&
        countries.map((country) => (
          <CountryCard
            key={country.name}
            name={country.name}
            continent={country.continent}
          />
        ))}
    </main>
  );
}

export default Home;
