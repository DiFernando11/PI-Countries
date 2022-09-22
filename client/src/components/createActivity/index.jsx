import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPostActivity,
  getAllCountries,
  updateActivity,
} from "../../redux/actions";
import "./index.css";
import { validate } from "../../utils/util";
import { searchCountry } from "../../utils/util";
import Modal from "../modal";

function CreateActivity({ desactivatedFormSearchCountries, id, initialState }) {
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
    name: initialState.name,
    difficult: initialState.difficult,
    duration: initialState.duration,
    season: initialState.season,
    typeActivity: initialState.otros,
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
  const handleUpdateActivity = (e) => {
    e.preventDefault();
    dispatch(updateActivity(id, input));
    // window.location.reload();
  };

  useEffect(() => {
    dispatch(getAllCountries());
  }, []);
  // console.log(desactivatedFormSearchCountries)
  return (
    <main className="main_create_activity">
      <div className="container_form">
        <section className="section_card_form_design">
          Aqui va estar una imagen
          {selectCountry.length ? (
            selectCountry.map((country) => (
              <div key={country} className="container_search_addCountries">
                <span> {country}</span>
                <i
                  onClick={() => handleDeleteCountry(country)}
                  class="bi bi-trash"
                ></i>
              </div>
            ))
          ) : (
            <p>Se debe agregar al menos un pais</p>
          )}
        </section>
        <section className="section_card_form">
          <form
            className="form_create_activity"
            onSubmit={
              desactivatedFormSearchCountries
                ? (e) => handleSubmit(e)
                : (e) => handleUpdateActivity(e)
            }
          >
            <div className="form">
              <div className="group groupCountry">
                <input
                  className={errors.country && "danger"}
                  type="text"
                  name="country"
                  onChange={(e) => handleSearchCountry(e)}
                />
                <label form="country">Country</label>
                {errors.country && <p className="danger">{errors.country} </p>}
                {country.length
                  ? countryBySearch
                      .map((country) => (
                        <div
                          className="container_search_addCountries"
                          key={country.name}
                        >
                          <div>
                            <img src={country.flag} alt={country.name} />
                            <span> {country.name}</span>
                          </div>
                          <i
                            onClick={() => handleAddCountry(country.name)}
                            class="bi bi-node-plus"
                          ></i>
                        </div>
                      ))
                      .slice(0, 3)
                  : null}
              </div>
              <div className="group">
                <input
                  className={errors.name && "danger"}
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={handleChange}
                  required
                />
                <span className="barra"></span>
                <label form="name">Name:</label>
                {errors.name && <p className="danger">{errors.name} </p>}
              </div>
              <div className="group">
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
                <span className="barra"></span>
                <label form="difficult">Difficult:</label>
                {errors.difficult && (
                  <p className="danger">{errors.difficult} </p>
                )}
              </div>
              <div className="group">
                <input
                  className={errors.duration && "danger"}
                  type="text"
                  placeholder="0"
                  name="duration"
                  value={input.duration}
                  onChange={handleChange}
                  required
                />
                <span className="barra"></span>
                <label form="duration">Duration:</label>
                {errors.duration && (
                  <p className="danger">{errors.duration} </p>
                )}
              </div>
              <div className="group">
                <label className="label_select" form="typeActivity">
                  Type Activity
                </label>
                <div className="box_select">
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
                </div>
              </div>
              <div className="group">
                <label className="label_select" form="season">
                  Season
                </label>
                <div className="box_select">
                  <select
                    name="season"
                    value={input.season}
                    onChange={handleChange}
                  >
                    <option>Verano</option>
                    <option>Otoño</option>
                    <option>Invierno</option>
                    <option>Primavera</option>
                    <option>All year round</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                // onClick={() => setModalVisible(true)}
                className={
                  desactivatedFormSearchCountries
                    ? !Object.entries(errors).length && selectCountry.length
                      ? "activated_button_createActivity"
                      : "descativated_button_createActivity"
                    : "activated_button_createActivity"
                }
              >
                {desactivatedFormSearchCountries
                  ? "Create Activity"
                  : "MODIFICAR"}
              </button>
            </div>

            {/* <label form="typeActivity">
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
        {errors.difficult && (
          <p className="danger">{errors.difficult} </p>
        )}
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


      <label form="season">
        Season:
        <select
          name="season"
          value={input.season}
          onChange={handleChange}
        >
          <option>Verano</option>
          <option>Otoño</option>
          <option>Invierno</option>
          <option>Primavera</option>
          <option>All year round</option>
        </select>
      </label>

      <button
        type="submit"
        // onClick={() => setModalVisible(true)}
        className={
          desactivatedFormSearchCountries
            ? !Object.entries(errors).length && selectCountry.length
              ? "activated_button_createActivity"
              : "descativated_button_createActivity"
            : "activated_button_createActivity"
        }
      >
        {desactivatedFormSearchCountries
          ? "Create Activity"
          : "MODIFICAR"}
      </button> */}
          </form>
          {modalVisible && (
            <Modal>
              <h1>Ventana Modal</h1>
              <p>{responseCreateActivity}</p>
              <button onClick={() => setModalVisible(false)}> Aceptar</button>
            </Modal>
          )}
        </section>
      </div>
    </main>
  );
}

export default CreateActivity;
{
  /* <div
className={
  desactivatedFormSearchCountries
    ? "container_selected_countries"
    : "desactivated_form_search_country"
}
>
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
</div>
{country.length
? countryBySearch
    .map((country) => (
      <div key={country.name}>
        <span> {country.name}</span>
        <span onClick={() => handleAddCountry(country.name)}>
          +
        </span>
      </div>
    ))
    .slice(0, 3)
: null} */
}
