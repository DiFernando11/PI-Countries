import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByContinent,
  filterCountriesByActivity,
  getAllCountries,
  searchCountriesByActivities,
  setStateCountry,
  sortByNameCountries,
  sortByPopulation,
  statePage,
} from "../../redux/actions";
import "./index.css";

function FormFilter() {
  // //estados globales
  //stado que controlado el radio button de contintente y tipo de actividades
  let stateCountry = useSelector((state) => state.stateCountry);
  //estados locales
  //stado que controla el radio button de ordenamientos
  const [stateRadio, setStateRadio] = useState("All");
  // este estado controla el input de busqueda por actividad
  const [countryByActivity, setCountryByActivity] = useState("");
  //stado que verifica en que seccion me encuentro si continente o activities
  const [currentRadio, setCurrentRadio] = useState("default");
  // const [stateRadioContinent, setStateRadioContinent] = useState("All");
  //hooks
  let dispatch = useDispatch();
  // HANLDERS
  //ORDENAMIENTO
  //ordena los paises por nombre
  const handleSortByName = (order, e) => {
    dispatch(sortByNameCountries(order));
    setStateRadio(e.target.value);
  };
  //ordena los paises por numero de poblacion
  const handleSortByPopulation = (order, e) => {
    dispatch(sortByPopulation(order));
    setStateRadio(e.target.value);
  };
  //CONTINENT
  //filtra los paises por continente
  const handleFilterByContinent = (continent, e) => {
    dispatch(filterByContinent(continent));
    dispatch(setStateCountry(e.target.value));
    dispatch(statePage(1));
    setStateRadio("default");
    setCurrentRadio("Continent");
  };
  //trae los paises filtrados por continente a su estado inicial (//sin orden )
  const hanldeDefaultContinent = (continent, e) => {
    dispatch(filterByContinent(continent));
    setStateRadio(e.target.value);
    dispatch(statePage(1));
  };
  //ACTIVIDAD
  //filtra paises por actividad
  const handleFilterByActivity = (typeActivity, e) => {
    dispatch(filterCountriesByActivity(typeActivity));
    dispatch(setStateCountry(e.target.value));
    dispatch(statePage(1));
    setStateRadio("default");
    setCurrentRadio("Activity");
  };
  //trae las actividades filtrados por continente a su estado inicial (//sin orden )
  const hanldeDefaultActivity = (activity, e) => {
    dispatch(filterCountriesByActivity(activity));
    setStateRadio(e.target.value);
    dispatch(statePage(1));
  };
  //tomo los datos que se escriben por el input
  const handleInputByActiviyt = (e) => {
    e.preventDefault();
    setCountryByActivity(e.target.value);
  };
  // busco las actividades que tengan dicho nombre
  const handleSearchCountryByActivity = (e) => {
    e.preventDefault();
    dispatch(searchCountriesByActivities(countryByActivity));
    dispatch(setStateCountry(""));
    setCountryByActivity("");
  };
  //TODOS LOS PAIS
  //trae los paises de la base de datos
  const handlerGetCountries = (e) => {
    dispatch(getAllCountries());
    setStateRadio(e.target.value);
    setCurrentRadio("default");
    dispatch(setStateCountry(e.target.value));
    dispatch(statePage(1));
  };
  //trae los paises a su estado inicial (//sin orden )
  const handlerGetCountriesDefault = (e) => {
    dispatch(getAllCountries());
    setStateRadio(e.target.value);
    dispatch(statePage(1));
  };

  console.log(countryByActivity);
  return (
    <form className="container_form_filter">
      <label htmlFor="">
        Busqueda
        <input
          type="text"
          placeholder="Activity..."
          value={countryByActivity}
          onChange={(e) => handleInputByActiviyt(e)}
        />
        <button
          className={countryByActivity ? "activated_button_search_activity" :"desactivated_button_search_activity"  }
          onClick={handleSearchCountryByActivity}
        >
          Buscar
        </button>
      </label>
      <label htmlFor="allCountries">
        <input
          id="allCountries"
          type="radio"
          name="All"
          value={"All"}
          checked={stateCountry === "All" ? true : false}
          onChange={(e) => handlerGetCountries(e)}
        />
        Todos
      </label>
      <fieldset>
        <legend>Continent</legend>
        <label htmlFor="continentAmerica">
          <input
            id="continentAmerica"
            type="radio"
            name="continent"
            value={"Americas"}
            checked={stateCountry === "Americas" ? true : false}
            onChange={(e) => handleFilterByContinent("Americas", e)}
          />
          America
        </label>
        <label htmlFor="continentEurope">
          <input
            id="continentEurope"
            type="radio"
            name="continent"
            value={"Europe"}
            checked={stateCountry === "Europe" ? true : false}
            onChange={(e) => handleFilterByContinent("Europe", e)}
          />
          Europa
        </label>
        <label htmlFor="continentAsia">
          <input
            id="continentAsia"
            type="radio"
            name="continent"
            value={"Asia"}
            checked={stateCountry === "Asia" ? true : false}
            onChange={(e) => handleFilterByContinent("Asia", e)}
          />
          Asia
        </label>
        <label htmlFor="continentAntartic">
          <input
            id="continentAntartic"
            type="radio"
            name="continent"
            value={"Antarctic"}
            checked={stateCountry === "Antarctic" ? true : false}
            onChange={(e) => handleFilterByContinent("Antarctic", e)}
          />
          Antartic
        </label>
        <label htmlFor="continentAfrica">
          <input
            id="continentAfrica"
            type="radio"
            name="continent"
            value={"Africa"}
            checked={stateCountry === "Africa" ? true : false}
            onChange={(e) => handleFilterByContinent("Africa", e)}
          />
          Africa
        </label>
        <label htmlFor="continentOceania">
          <input
            id="continentOceania"
            type="radio"
            name="continent"
            value={"Oceania"}
            checked={stateCountry === "Oceania" ? true : false}
            onChange={(e) => handleFilterByContinent("Oceania", e)}
          />
          Oceania
        </label>
      </fieldset>
      <fieldset>
        <legend>Order by Activity</legend>
        <label htmlFor="deportiva">
          <input
            id="deportiva"
            type="radio"
            name="activity"
            value={"Deportiva"}
            checked={stateCountry === "Deportiva" ? true : false}
            onChange={(e) => handleFilterByActivity("Deportiva", e)}
          />
          Deportiva
        </label>
        <label htmlFor="cultural">
          <input
            id="cultural"
            type="radio"
            name="activity"
            value={"Cultural"}
            checked={stateCountry === "Cultural" ? true : false}
            onChange={(e) => handleFilterByActivity("Cultural", e)}
          />
          Cultural
        </label>
        <label htmlFor="gastronomica">
          <input
            id="gastronomica"
            type="radio"
            name="activity"
            value={"Gastronomica"}
            checked={stateCountry === "Gastronomica" ? true : false}
            onChange={(e) => handleFilterByActivity("Gastronomica", e)}
          />
          Gastronomica
        </label>
        <label htmlFor="solPlaya">
          <input
            id="solPlaya"
            type="radio"
            name="activity"
            value={"Sol y Playa"}
            checked={stateCountry === "Sol y Playa" ? true : false}
            onChange={(e) => handleFilterByActivity("Sol y Playa", e)}
          />
          Sol y Playa
        </label>
        <label htmlFor="naturaleza">
          <input
            id="naturaleza"
            type="radio"
            name="activity"
            value={"Naturaleza"}
            checked={stateCountry === "Naturaleza" ? true : false}
            onChange={(e) => handleFilterByActivity("Naturaleza", e)}
          />
          Naturaleza
        </label>
        <label htmlFor="others">
          <input
            id="others"
            type="radio"
            name="activity"
            value={"Otros"}
            checked={stateCountry === "Otros" ? true : false}
            onChange={(e) => handleFilterByActivity("Otros", e)}
          />
          Otros
        </label>
      </fieldset>
      {/* ) : null} */}
      <fieldset>
        <legend>Order by Name</legend>
        <label htmlFor="radioOrderAsc">
          <input
            id="radioOrderAsc"
            type="radio"
            name="orderByName"
            value={"ASC"}
            checked={stateRadio === "ASC" ? true : false}
            onChange={(e) => handleSortByName("ASC", e)}
          />
          ASC
        </label>
        <label htmlFor="radioOrderDesc">
          <input
            id="radioOrderDesc"
            type="radio"
            name="orderByName"
            value={"DESC"}
            checked={stateRadio === "DESC" ? true : false}
            onChange={(e) => handleSortByName("DESC", e)}
          />
          DESC
        </label>
      </fieldset>
      <fieldset>
        <legend>Order popu</legend>
        <label htmlFor="radioOrderMen">
          <input
            id="radioOrderMen"
            type="radio"
            name="orderByPopulation"
            value={"MAYOR"}
            checked={stateRadio === "MAYOR" ? true : false}
            onChange={(e) => handleSortByPopulation("MAYOR", e)}
          />
          Mayor
        </label>
        <label htmlFor="radioOrderMay">
          <input
            id="radioOrderMay"
            type="radio"
            name="orderByPopulation"
            value={"MENOR"}
            checked={stateRadio === "MENOR" ? true : false}
            onChange={(e) => handleSortByPopulation("MENOR", e)}
          />
          Menor
        </label>
      </fieldset>
      {currentRadio === "Continent" && (
        <label htmlFor="radioDefaultContinent">
          <input
            id="radioDefaultContinent"
            type="radio"
            name="orderByPopulation"
            value={"default"}
            checked={stateRadio === "default" ? true : false}
            onChange={(e) => hanldeDefaultContinent(stateCountry, e)}
          />
          default
        </label>
      )}
      {currentRadio === "Activity" && (
        <label htmlFor="radioDefaultActivity">
          <input
            id="radioDefaultActivity"
            type="radio"
            name="orderByPopulation"
            value={"default"}
            checked={stateRadio === "default" ? true : false}
            onChange={(e) => hanldeDefaultActivity(stateCountry, e)}
          />
          default
        </label>
      )}
      {currentRadio === "default" && (
        <label htmlFor="radioDefaultCountries">
          <input
            id="radioDefaultCountries"
            type="radio"
            name="DefaultAllCountries"
            value={"default"}
            checked={stateRadio === "default" ? true : false}
            onChange={(e) => handlerGetCountriesDefault(e)}
          />
          default
        </label>
      )}
    </form>
  );
}

export default FormFilter;
