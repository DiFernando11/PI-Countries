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
  const [checkBoxContinent, setCheckBoxContinent] = useState([]);
  // console.log(stateRadio, "stateRadio");
  // console.log(currentRadio, "current");
  // console.log(stateCountry, "state");
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
  //filtra paises por actividad
  const handleFilterByActivity = (typeActivity, e) => {
    dispatch(filterCountriesByActivity(typeActivity, checkBoxContinent));
    dispatch(setStateCountry(e.target.value));
    dispatch(statePage(1));
    // setStateRadio("default");
    setCurrentRadio("Activity");
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
    dispatch(setStateCountry(e.target.value));
    dispatch(statePage(1));
    setCheckBoxContinent([]);
    const refere = document.getElementsByClassName("checkBoxContinentValue");
    for (let index = 0; index < refere.length; index++) {
      refere[index].checked = false;
    }
  };
  //trae los paises a su estado inicial (//sin orden )

  const handleValueChange = (e, idCheckbox, continent) => {
    // setCheckBoxContinent({
    //   ...checkBoxContinent,
    //   [e.target.name]: e.target.value,
    // });

    var isChecked = document.getElementById(idCheckbox).checked;
    if (isChecked) {
      setCheckBoxContinent((prev) => [...prev, e.target.value]);
      dispatch(filterByContinent([...checkBoxContinent, continent]));
    } else {
      const deleteCountry = checkBoxContinent.filter(
        (c) => c !== e.target.value
      );
      setCheckBoxContinent([...deleteCountry]);
      const continentsFilter = checkBoxContinent.filter((c) => c !== continent);
      dispatch(filterByContinent(continentsFilter));
    }
    dispatch(setStateCountry("default"));
    setStateRadio("default");
  };

  // console.log(checkBoxContinent);
  return (
    <form className="container_form_filter">
      <label
        className="container_input_search_activity"
        htmlFor="searchActivity"
      >
        <input
          id="searchActivity"
          type="text"
          placeholder="Search Activity..."
          value={countryByActivity}
          onChange={(e) => handleInputByActiviyt(e)}
        />
        <div
          onClick={handleSearchCountryByActivity}
          className="activated_button_search_activity"
        >
          <i className="bi bi-search"></i>
        </div>
      </label>
      <label className="container_All" htmlFor="allCountries">
        Todos
        <input
          className="inputRadio"
          id="allCountries"
          type="radio"
          name="All"
          value={"All"}
          checked={stateCountry === "All" ? true : false}
          onChange={(e) => handlerGetCountries(e)}
        />
      </label>
      <fieldset>
        <legend>Continent</legend>
        <label htmlFor="continentAmerica">
          America
          <input
            id="checkAmerica"
            className="checkBoxContinentValue"
            type="checkbox"
            value={"Americas"}
            name={"Americas"}
            onChange={(e) => handleValueChange(e, "checkAmerica", "Americas")}
          />
          <label htmlFor="checkAmerica" className="lbl_switch_checkBox"></label>
        </label>
        <label htmlFor="continentEurope">
          Europa
          <input
            id="checkEurope"
            className="checkBoxContinentValue"
            type="checkbox"
            value={"Europe"}
            name={"Europe"}
            onChange={(e) => handleValueChange(e, "checkEurope", "Europe")}
          />
            <label htmlFor="checkEurope" className="lbl_switch_checkBox"></label>
        </label>
        <label htmlFor="continentAsia">
          Asia
          <input
            id="checkAsia"
            className="checkBoxContinentValue"
            type="checkbox"
            value={"Asia"}
            name={"Asia"}
            onChange={(e) => handleValueChange(e, "checkAsia", "Asia")}
          />
              <label htmlFor="checkAsia" className="lbl_switch_checkBox"></label>
        </label>
        <label htmlFor="continentAntartic">
          Antarctic
          <input
            id="checkAntarctic"
            className="checkBoxContinentValue"
            type="checkbox"
            value={"Antarctic"}
            name={"Antarctic"}
            onChange={(e) =>
              handleValueChange(e, "checkAntarctic", "Antarctic")
            }
          />
           <label htmlFor="checkAntarctic" className="lbl_switch_checkBox"></label>
        </label>
        <label htmlFor="continentAfrica">
          Africa
          <input
            id="checkAfrica"
            className="checkBoxContinentValue"
            type="checkbox"
            value={"Africa"}
            name={"Africa"}
            onChange={(e) => handleValueChange(e, "checkAfrica", "Africa")}
          />
           <label htmlFor="checkAfrica" className="lbl_switch_checkBox"></label>
        </label>
        <label htmlFor="continentOceania">
          Oceania
          <input
            id="checkOceania"
            className="checkBoxContinentValue"
            type="checkbox"
            value={"Oceania"}
            name={"Oceania"}
            onChange={(e) => handleValueChange(e, "checkOceania", "Oceania")}
          />
           <label htmlFor="checkOceania" className="lbl_switch_checkBox"></label>
        </label>
      </fieldset>
      <fieldset>
        <legend>Order by Activity</legend>
        <label htmlFor="deportiva">
          Deportiva
          <input
            className="inputRadio"
            id="deportiva"
            type="radio"
            name="activity"
            value={"Deportiva"}
            checked={stateCountry === "Deportiva" ? true : false}
            onChange={(e) => handleFilterByActivity("Deportiva", e)}
          />
        </label>
        <label htmlFor="cultural">
          Cultural
          <input
            className="inputRadio"
            id="cultural"
            type="radio"
            name="activity"
            value={"Cultural"}
            checked={stateCountry === "Cultural" ? true : false}
            onChange={(e) => handleFilterByActivity("Cultural", e)}
          />
        </label>
        <label htmlFor="gastronomica">
          Gastronomica
          <input
            className="inputRadio"
            id="gastronomica"
            type="radio"
            name="activity"
            value={"Gastronomica"}
            checked={stateCountry === "Gastronomica" ? true : false}
            onChange={(e) => handleFilterByActivity("Gastronomica", e)}
          />
        </label>
        <label htmlFor="solPlaya">
          Sol y Playa
          <input
            className="inputRadio"
            id="solPlaya"
            type="radio"
            name="activity"
            value={"Sol y Playa"}
            checked={stateCountry === "Sol y Playa" ? true : false}
            onChange={(e) => handleFilterByActivity("Sol y Playa", e)}
          />
        </label>
        <label htmlFor="naturaleza">
          Naturaleza
          <input
            className="inputRadio"
            id="naturaleza"
            type="radio"
            name="activity"
            value={"Naturaleza"}
            checked={stateCountry === "Naturaleza" ? true : false}
            onChange={(e) => handleFilterByActivity("Naturaleza", e)}
          />
        </label>
        <label htmlFor="others">
          Otros
          <input
            className="inputRadio"
            id="others"
            type="radio"
            name="activity"
            value={"Otros"}
            checked={stateCountry === "Otros" ? true : false}
            onChange={(e) => handleFilterByActivity("Otros", e)}
          />
        </label>
      </fieldset>
      {/* ) : null} */}
      <fieldset>
        <legend>Order by Name</legend>
        <label htmlFor="radioOrderAsc">
          ASC
          <input
            className="inputRadio"
            id="radioOrderAsc"
            type="radio"
            name="orderByName"
            value={"ASC"}
            checked={stateRadio === "ASC" ? true : false}
            onChange={(e) => handleSortByName("ASC", e)}
          />
        </label>
        <label htmlFor="radioOrderDesc">
          DESC
          <input
            className="inputRadio"
            id="radioOrderDesc"
            type="radio"
            name="orderByName"
            value={"DESC"}
            checked={stateRadio === "DESC" ? true : false}
            onChange={(e) => handleSortByName("DESC", e)}
          />
        </label>
      </fieldset>
      <fieldset>
        <legend>Order popu</legend>
        <label htmlFor="radioOrderMen">
          Mayor
          <input
            className="inputRadio"
            id="radioOrderMen"
            type="radio"
            name="orderByPopulation"
            value={"MAYOR"}
            checked={stateRadio === "MAYOR" ? true : false}
            onChange={(e) => handleSortByPopulation("MAYOR", e)}
          />
        </label>
        <label htmlFor="radioOrderMay">
          Menor
          <input
            className="inputRadio"
            id="radioOrderMay"
            type="radio"
            name="orderByPopulation"
            value={"MENOR"}
            checked={stateRadio === "MENOR" ? true : false}
            onChange={(e) => handleSortByPopulation("MENOR", e)}
          />
        </label>
      </fieldset>
    </form>
  );
}

export default FormFilter;
