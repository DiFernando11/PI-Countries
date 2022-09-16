import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  filterByContinent,
  orderByAlphabetically,
  orderByAlphabeticallyContinent,
  orderByPopulation,
} from "../../redux/actions";
import { useQueryParams } from "../../utils/hooks/useQueryParams";
import CountryCard from "../countryCard";

function FilterContinent({ handleQuery, handleCountries, handlerRefresh }) {
  // los handlers se lo pasan el componente home
  // estados globales no hay
  // estados locales
  const [valueRaddioButton, setValueRaddioButton] = useState("todos");
  const [valueRaddioButtonOrderAlfabetic, setValueRaddioButtonOrderAlfabetic] =
    useState("default");
  const [, setRefreshState] = useState(false);
  // hooks
  const queries = useQueryParams();
  const history = useHistory();
  //dispatch
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      filterByContinent(valueRaddioButton, queries.page ? queries.page : 0)
    );
  }, [queries]);

  const countries = useSelector((state) => state.countries);
  // funciones handlres
  const updateRaddioButton = (e) => {
    setValueRaddioButton(e.target.value);
  };
  function handleSortByName(e) {
    dispatch(
      orderByAlphabetically(e.target.value, queries.page ? queries.page : 0)
    );
    dispatch(
      orderByAlphabeticallyContinent(
        queries.continents
          ? queries.continents
          : (queries.continents = "americas"),
        e.target.value,
        queries.page ? queries.page : 0
      )
    );
  }
  function handlerSortByPopulation(e) {
    dispatch(orderByPopulation(e.target.value));
    setRefreshState((prevState) => !prevState);
  }

  return (
    <div>
      {/* {countries.length
              ? countries.map((country) => (
                  <CountryCard
                    key={country.id}
                    id={country.id}
                    name={country.name}
                    continent={country.continent}
                    flag={country.flag}
                  />
                ))
              : null} */}
      <fieldset>
        <legend>Continents</legend>
        <label>
          Todos
          <input
            id="radioTodos"
            type="radio"
            value="todos"
            checked={valueRaddioButton === "todos" ? true : false}
            onChange={updateRaddioButton}
            onClick={() =>
              handleCountries(setValueRaddioButtonOrderAlfabetic, "default")
            }
          />
        </label>
        <label>
          America
          <input
            id="radioAmericas"
            type="radio"
            value="Americas"
            checked={valueRaddioButton === "Americas" ? true : false}
            onChange={updateRaddioButton}
            onClick={() => handleQuery("Americas")}
          />
        </label>
        <label>
          Africa
          <input
            id="radioAfrica"
            type="radio"
            value="Africa"
            checked={valueRaddioButton === "Africa" ? true : false}
            onChange={updateRaddioButton}
            onClick={() => handleQuery("Africa")}
          />
        </label>
        <label>
          Europe
          <input
            id="radioEurope"
            type="radio"
            value="Europe"
            checked={valueRaddioButton === "Europe" ? true : false}
            onChange={updateRaddioButton}
            onClick={() => handleQuery("Europe")}
          />
        </label>
        <label>
          Antartic
          <input
            id="radioAntarctic"
            type="radio"
            value="Antarctic"
            checked={valueRaddioButton === "Antarctic" ? true : false}
            onChange={updateRaddioButton}
            onClick={() => handleQuery("Antarctic")}
          />
        </label>
        <label>
          Oceania
          <input
            id="radioOceania"
            type="radio"
            value="Oceania"
            checked={valueRaddioButton === "Oceania" ? true : false}
            onChange={updateRaddioButton}
            onClick={() => handleQuery("Oceania")}
          />
        </label>
        <label>
          Asia
          <input
            id="radioAsia"
            type="radio"
            value="Asia"
            checked={valueRaddioButton === "Asia" ? true : false}
            onChange={updateRaddioButton}
            onClick={() => handleQuery("Asia")}
          />
        </label>
      </fieldset>
      <select
        onChange={(e) => {
          handleSortByName(e);
        }}
        className="filterName"
      >
        <option value="ALL"> Ordena por Nombre </option>
        <option value="ASC">A-Z</option>
        <option value="DESC">Z-A</option>
      </select>
      <select
        className="filterName"
        onChange={(e) => {
          handlerSortByPopulation(e);
        }}
        onClick={() => handlerRefresh()}
      >
        <option value="All"> Ordena por Nombre </option>
        <option value="may">Mayor</option>
        <option value="men">Menor</option>
      </select>
    </div>
  );
}

export default FilterContinent;
