import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  // allActivitiesByCountries,
  filterByContinent,
  filterCountriesByActivity,
  orderByAreaCountries,
  // pruebaActivities,
  searchCountriesByActivities,
  setLoadingCountries,
  setRefreshUpdate,
  setStateCountry,
  sortByNameCountries,
  sortByPopulation,
  statePage,
} from "../../redux/actions";
import "./index.css";

function FormFilter() {
  // //estados globales
  //stado que controlado el button Todos
  let stateCountry = useSelector((state) => state.stateCountry);

  //estados locales
  //stado que controla el radio button de ordenamientos
  const [stateRadio, setStateRadio] = useState("All");
  // este estado controla el input de busqueda por actividad
  const [countryByActivity, setCountryByActivity] = useState("");
  const [checkBoxContinent, setCheckBoxContinent] = useState([]);
  const [checkBoxActivity, setCheckboxActivity] = useState([]);
  //hooks
  let dispatch = useDispatch();
  // HANLDERS
  const handleSortByName = (order, e) => {
    dispatch(sortByNameCountries(order));
    setStateRadio(e.target.value);
  };
  //ordena los paises por numero de poblacion
  const handleSortByPopulation = (order, e) => {
    dispatch(sortByPopulation(order));
    setStateRadio(e.target.value);
  };

  const handleValueFilterByActivity = (e, idCheckbox, activity) => {
    const isChecked = document.getElementById(idCheckbox).checked;
    if (isChecked) {
      dispatch(setLoadingCountries());
      dispatch(setRefreshUpdate());
      setCheckboxActivity((prev) => [...prev, e.target.value]);
      dispatch(
        filterCountriesByActivity(
          [...checkBoxActivity, activity],
          checkBoxContinent
        )
      );
    } else {
      const deleteActivity = checkBoxActivity.filter(
        (c) => c !== e.target.value
      );
      setCheckboxActivity([...deleteActivity]);
      const activitiesFilter = checkBoxActivity.filter((c) => c !== activity);
      dispatch(filterCountriesByActivity(activitiesFilter, checkBoxContinent));
    }
    // dispatch(setStateCountry("default"));
    setStateRadio("default");
    dispatch(setStateCountry("All"));
    dispatch(statePage(1));
  };
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
    resetValueCheckBox();
    dispatch(setStateCountry("default"));
  };

  const handlerGetCountries = (e) => {
    // setRefreshUpdate();
    dispatch(setStateCountry("All"));
    dispatch(statePage(1));
  };

  const handleValueChange = (e, idCheckbox, continent) => {
    var isChecked = document.getElementById(idCheckbox).checked;
    if (isChecked) {
      dispatch(setLoadingCountries());
      setCheckBoxContinent((prev) => [...prev, e.target.value]);
      if (!checkBoxActivity.length) {
        dispatch(filterByContinent([...checkBoxContinent, continent]));
      } else {
        dispatch(
          filterCountriesByActivity(checkBoxActivity, [
            ...checkBoxContinent,
            continent,
          ])
        );
      }
    } else {
      const deleteCountry = checkBoxContinent.filter(
        (c) => c !== e.target.value
      );
      setCheckBoxContinent([...deleteCountry]);

      const continentsFilter = checkBoxContinent.filter((c) => c !== continent);
      if (!checkBoxActivity.length) {
        dispatch(filterByContinent(continentsFilter));
      } else {
        dispatch(filterCountriesByActivity(checkBoxActivity, continentsFilter));
      }
    }
    dispatch(setStateCountry("All"));
    setStateRadio("default");
    dispatch(statePage(1));
  };

  const resetValueCheckBox = () => {
    const refere = document.getElementsByClassName("checkBoxContinentValue");
    for (let index = 0; index < refere.length; index++) {
      refere[index].checked = false;
    }
  };
  const handleOrderArea = (e) => {
    dispatch(orderByAreaCountries(e.target.value));
  };

  // useEffect(() => {
  //   dispatch(allActivitiesByCountries());
  // }, []);

  // let activitiesAll = useSelector((state) => state.activitiesAll);
  // // console.log(filterActivity, "activity");
  // function filterActivitiesAllPrueb(e) {
  //   dispatch(pruebaActivities(e.target.value));
  // }

  return (
    <form className="container_form_filter">
      <label
        className="container_input_search_activity"
        htmlFor="searchActivity"
      >
        <input
          autoComplete="off"
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
        All
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
      {/* 
      <select onChange={handleOrderArea}>
        <option value="All" defaultValue>
          All
        </option>
        <option value="Higher">Higher</option>
        <option value="Lower">Lower</option>
      </select> */}
      {/* 
      <select name="activity" onChange={filterActivitiesAllPrueb}>
        <option defaultValue value={"All"}>
          All
        </option>

        {activitiesAll.length
          ? activitiesAll.map((activity) => (
              <option key={activity.id} value={activity.name}>
                {activity.name}
              </option>
            ))
          : null}
      </select> */}

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
          <label
            htmlFor="checkAntarctic"
            className="lbl_switch_checkBox"
          ></label>
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
        <legend>Activity</legend>
        <label htmlFor="deportiva">
          Deportiva
          <input
            className="checkBoxContinentValue"
            type="checkbox"
            id="checkDeportiva"
            value={"Deportiva"}
            name="Deportiva"
            onChange={(e) =>
              handleValueFilterByActivity(e, "checkDeportiva", "Deportiva")
            }
          />
          <label
            htmlFor="checkDeportiva"
            className="lbl_switch_checkBox"
          ></label>
        </label>
        <label htmlFor="cultural">
          Cultural
          <input
            className="checkBoxContinentValue"
            type="checkbox"
            id="checkCultural"
            value={"Cultural"}
            name="Cultural"
            onChange={(e) =>
              handleValueFilterByActivity(e, "checkCultural", "Cultural")
            }
          />
          <label
            htmlFor="checkCultural"
            className="lbl_switch_checkBox"
          ></label>
        </label>
        <label htmlFor="gastronomica">
          Gastronomica
          <input
            className="checkBoxContinentValue"
            type="checkbox"
            id="checkGastronomica"
            value={"Gastronomica"}
            name="Gastronomica"
            onChange={(e) =>
              handleValueFilterByActivity(
                e,
                "checkGastronomica",
                "Gastronomica"
              )
            }
          />
          <label
            htmlFor="checkGastronomica"
            className="lbl_switch_checkBox"
          ></label>
        </label>
        <label htmlFor="solPlaya">
          Sol y Playa
          <input
            className="checkBoxContinentValue"
            type="checkbox"
            id="checkSolyPlaya"
            value={"Sol y Playa"}
            name="Sol y Playa"
            onChange={(e) =>
              handleValueFilterByActivity(e, "checkSolyPlaya", "Sol y Playa")
            }
          />
          <label
            htmlFor="checkSolyPlaya"
            className="lbl_switch_checkBox"
          ></label>
        </label>
        <label htmlFor="naturaleza">
          Naturaleza
          <input
            className="checkBoxContinentValue"
            type="checkbox"
            id="checkNaturaleza"
            value={"Naturaleza"}
            name="Naturaleza"
            onChange={(e) =>
              handleValueFilterByActivity(e, "checkNaturaleza", "Naturaleza")
            }
          />
          <label
            htmlFor="checkNaturaleza"
            className="lbl_switch_checkBox"
          ></label>
        </label>
        <label htmlFor="others">
          Others
          <input
            className="checkBoxContinentValue"
            type="checkbox"
            id="checkOtros"
            value={"Otros"}
            name="Otros"
            onChange={(e) =>
              handleValueFilterByActivity(e, "checkOtros", "Otros")
            }
          />
          <label htmlFor="checkOtros" className="lbl_switch_checkBox"></label>
        </label>
      </fieldset>
      <fieldset>
        <legend>Order by Name</legend>
        <label htmlFor="radioOrderAsc">
          Ascendant
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
          Descending
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
        <legend>Order population</legend>
        <label htmlFor="radioOrderMen">
          Higher
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
          Lower
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
