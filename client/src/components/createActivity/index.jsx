import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPostActivity } from "../../redux/actions";
import "./index.css";
import { validate } from "../../utils/util";
import { searchCountry } from "../../utils/util";
import Modal from "../modal";

function CreateActivity() {
  //estados globales
  let copyCountries = useSelector((state) => state.copyCountries);
  let responseCreateActivity = useSelector(
    (state) => state.responseCreateActivity
  );
  //stados locales
  //maneja lo enviado por input del usuario
  const [country, setCountries] = useState("");
  //muestra los paises posibles dependiente de lo que escriba el usario
  const [countryBySearch, setCountryBySearch] = useState([]);
  //maneja los paises seleccionados que van a contener la actividad creada
  const [selectCountry, setSelectCountry] = useState([]);
  // state modal
  const [modalVisible, setModalVisible] = useState(false);
  // maneja los errores
  const [errors, setErrors] = useState({});
  //maneja los datos enviados por el usuario
  const [input, setInput] = useState({
    name: "",
    difficult: 1,
    duration: 1,
    season: "All year round",
    typeActivity: "Otros",
    country: [],
  });
  // hago una copia de los paises sin mutar los paises originales
  const copyArrayCountries = [...copyCountries];
  //hooks
  let dispatch = useDispatch();
  // hanlders
  //enviamos los datos por post a la base de datos
  let handleChange = (e) => {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
  };
  console.log(modalVisible);
  const handleSubmit = (e) => {
    console.log(input);
    e.preventDefault();
    try {
      dispatch(createPostActivity(input));
    } catch (error) {
      console.log("Hubo un error");
    }
    e.target.reset();
    setInput({
      name: "",
      difficult: 1,
      duration: 1,
      season: "All year round",
      typeActivity: "Otros",
      country: [],
    });
    setSelectCountry([]);
    setCountries("");
    setModalVisible(true);
  };
  //busca los paises que el usario desee
  const handleSearchCountry = (e) => {
    e.preventDefault();
    setCountries(e.target.value);
    const copyCountries = searchCountry(e.target.value, copyArrayCountries);
    setCountryBySearch(copyCountries);
  };
  // agregar paises al input country
  const handleAddCountry = (country) => {
    if (!selectCountry.some((c) => c === country)) {
      setSelectCountry((prevState) => [...prevState, country]);
      setInput({
        ...input,
        country: [...selectCountry, country],
      });
      delete errors.country;
    }
  };
  // elimina paises del input country
  const handleDeleteCountry = (countryName) => {
    const deleteCountry = selectCountry.filter((c) => c !== countryName);
    setSelectCountry(deleteCountry);
    setInput({
      ...input,
      country: [...deleteCountry],
    });
  };
  // const handleOpenModal = () => {
  //   setModalVisible(true);
  // };
  return (
    <main>
      <h1>FORMULARIO</h1>
      <form className="form_create_activity" onSubmit={(e) => handleSubmit(e)}>
        <div className="container_selected_countries">
          <label form="country">
            Country
            {errors.country && <p className="danger">{errors.country} </p>}
            <input
              className={errors.country && "danger"}
              type="text"
              name="country"
              onChange={(e) => handleSearchCountry(e)}
            />
          </label>
          {selectCountry.length ? (
            selectCountry.map((country) => (
              <div key={country}>
                <span> {country}</span>
                <span onClick={() => handleDeleteCountry(country)}>X</span>
              </div>
            ))
          ) : (
            <p>Se debe agregar al menos un pais</p>
          )}
        </div>
        {country.length
          ? countryBySearch
              .map((country) => (
                <div key={country.name}>
                  <span> {country.name}</span>
                  <span onClick={() => handleAddCountry(country.name)}>+</span>
                </div>
              ))
              .slice(0, 3)
          : null}
        <label form="name">
          Name:
          {errors.name && <p className="danger">{errors.name} </p>}
          <input
            className={errors.name && "danger"}
            type="text"
            name="name"
            value={input.name}
            onChange={handleChange}
            required
          />
        </label>
        <label form="typeActivity">
          Type Activity
          <select
            name="typeActivity"
            value={input.typeActivity}
            onChange={handleChange}
          >
            <option>Deportiva</option>
            <option>Cultural</option>
            <option>Gastronomica</option>
            <option>Sol y Playa</option>
            <option>Naturaleza</option>
            <option>Otros</option>
          </select>
        </label>
        <label form="difficult">
          Difficult:
          {errors.difficult && <p className="danger">{errors.difficult} </p>}
          <input
            className={errors.difficult && "danger"}
            type="number"
            min="1"
            max="5"
            placeholder="1"
            name="difficult"
            value={input.difficult}
            onChange={handleChange}
            required
          />
        </label>
        <label form="duration">
          Duration:
          {errors.duration && <p className="danger">{errors.duration} </p>}
          <input
            className={errors.duration && "danger"}
            type="text"
            placeholder="0"
            name="duration"
            value={input.duration}
            onChange={handleChange}
            required
          />
        </label>

        <label form="season">
          Season:
          <select name="season" value={input.season} onChange={handleChange}>
            <option>Verano</option>
            <option>Otoño</option>
            <option>Invierno</option>
            <option>Primavera</option>
            <option>All year round</option>
          </select>
        </label>

        <button
          type="submit"
          onClick={() => setModalVisible(true)}
          className={
            !Object.entries(errors).length && selectCountry.length
              ? "activated_button_createActivity"
              : "descativated_button_createActivity"
          }
        >
          Create Activity
        </button>
      </form>
      {modalVisible && (
        <Modal>
          <h1>Ventana Modal</h1>
          <p>{responseCreateActivity}</p>
          <button onClick={() => setModalVisible(false)}> Aceptar</button>
        </Modal>
      )}
    </main>
  );
}

export default CreateActivity;
