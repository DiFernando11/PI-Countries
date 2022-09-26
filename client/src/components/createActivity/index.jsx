import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPostActivity,
  getAllCountries,
  setRefreshUpdate,
} from "../../redux/actions";
import "./index.css";
import { validate } from "../../utils/util";
import { searchCountry } from "../../utils/util";
import imgAddCountry from "../../assets/crying-89.webp";
import imgFormCountry from "../../assets/PM-Form-Integrations-01-1.webp";
import imgSuccesfullPost from "../../assets/c6842479-e0ee-49a2-9053-d00639074f7a_tick.gif";
import Modal from "../modal";

function CreateActivity({
  desactivatedFormSearchCountries,
  initialState,
  handleUpdateActivity,
}) {
  //estados globales
  let copyCountries = useSelector((state) => state.copyCountries);
  let responseCreateActivity = useSelector(
    (state) => state.responseCreateActivity
  );
  let stateRefreshUpdate = useSelector((state) => state.stateRefreshUpdate);
  //stados locales
  //maneja lo enviado por input del usuario
  const [country, setCountries] = useState("");
  //muestra los paises posibles dependiente de lo que escriba el usario
  const [countryBySearch, setCountryBySearch] = useState([]);
  //maneja los paises seleccionados que van a contener la actividad creada
  const [selectCountry, setSelectCountry] = useState([]);
  // state modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleUpdate, setModalVisibleUpdate] = useState(false);
  // maneja los errores
  const [errors, setErrors] = useState({});
  //maneja los datos enviados por el usuario
  const [input, setInput] = useState({
    name: initialState.name,
    difficult: initialState.difficult,
    duration: initialState.duration,
    season: initialState.season,
    typeActivity: initialState.typeActivity,
    country: [],
  });

  // hago una copia de los paises sin mutar los paises originales
  const copyArrayCountries = [...copyCountries];
  //hooks
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch, stateRefreshUpdate]);
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
    if (!selectCountry.some((c) => c.name === country.name)) {
      setSelectCountry((prevState) => [...prevState, country]);
      const arrayCountries = selectCountry.map((country) => country.name);
      setInput({
        ...input,
        country: [...arrayCountries, country.name],
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
  const handleOpenModalCreateCountry = () => {
    setModalVisible(false);
    dispatch(setRefreshUpdate());
  };

  return (
    <main
      className={` main_create_activity  ${
        !desactivatedFormSearchCountries && "main_create_activity_modifed"
      }`}
    >
      <div
        className={`${desactivatedFormSearchCountries && "container_form "}`}
      >
        <section
          className={`${
            desactivatedFormSearchCountries
              ? "section_card_form_design"
              : "section_card_form_design_modified"
          }`}
        >
          <div className="card_middle_form_design">
            <h1> CREATE ACTIVITY </h1>
            <div className="container_countries_delete">
              {selectCountry &&
                selectCountry.map((country) => (
                  <div
                    key={country.id}
                    className="container_search_delete_country"
                  >
                    <div>
                      <img src={country.flag} alt={country.name} />
                      <span> {country.name}</span>
                    </div>
                    <i
                      onClick={() => handleDeleteCountry(country)}
                      className="bi bi-trash"
                    ></i>
                  </div>
                ))}
            </div>

            {!selectCountry.length && (
              <div className="container_not_countries_add">
                <img
                  className="imgAddCountry"
                  src={imgAddCountry}
                  alt="add Countries"
                />
                <div className="container_message_error_notCountries">
                  <span>No has agregado un pais para tu actividad</span>
                  <i class="bi bi-exclamation-triangle-fill"></i>
                </div>
              </div>
            )}
          </div>

          <div className="container_image_form_presentation">
            <img src={imgFormCountry} alt="image formulario" />
          </div>
        </section>

        <section className="section_card_form">
          <form
            className="form_create_activity"
            onSubmit={
              desactivatedFormSearchCountries
                ? (e) => handleSubmit(e)
                : (e) => handleUpdateActivity(e, input)
            }
          >
            <div className="form">
              {desactivatedFormSearchCountries ? (
                <div className="group groupCountry">
                  <input
                    className={errors.country && "danger"}
                    type="text"
                    name="country"
                    placeholder="Search Countries"
                    onChange={(e) => handleSearchCountry(e)}
                    autoComplete="off"
                  />

                  <label form="country">Country</label>
                  {errors.country && (
                    <div className="flexContainerError">
                      <span className="danger">{errors.country} </span>
                      <i class="bi bi-exclamation-triangle-fill"></i>
                    </div>
                  )}
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
                              onClick={() => handleAddCountry(country)}
                              className="bi bi-node-plus"
                            ></i>
                          </div>
                        ))
                        .slice(0, 3)
                    : null}
                </div>
              ) : null}

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
                {errors.name && (
                  <div className="flexContainerError">
                    <span className="danger">{errors.name} </span>
                    <i class="bi bi-exclamation-triangle-fill"></i>
                  </div>
                )}
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
                  <div>
                    <span className="danger">{errors.difficult} </span>
                    <i class="bi bi-exclamation-triangle-fill"></i>
                  </div>
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
                  <div>
                    <span className="danger">{errors.duration} </span>
                    <i class="bi bi-exclamation-triangle-fill"></i>
                  </div>
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
              <div className="wraper">
                <button
                  type="submit"
                  onClick={
                    !desactivatedFormSearchCountries
                      ? () => setModalVisibleUpdate(true)
                      : () => console.log("buenos dias")
                  }
                  className={`
                  buttonSubmitActivity
                   ${
                     desactivatedFormSearchCountries
                       ? !Object.entries(errors).length && selectCountry.length
                         ? "activated_button_createActivity"
                         : "descativated_button_createActivity"
                       : "activated_button_createActivity"
                   }`}
                >
                  {desactivatedFormSearchCountries
                    ? "Create Activity"
                    : "MODIFICAR"}
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
      {modalVisible && (
        <Modal>
          <div className="containerSuccesfullModal">
            <p className="modal_text_verificated">{responseCreateActivity}</p>
            <img src={imgSuccesfullPost} alt="succesfull Post" />
          </div>

          <button
            className="button_accepted"
            onClick={handleOpenModalCreateCountry}
          >
            Aceptar
          </button>
        </Modal>
      )}
      {modalVisibleUpdate && (
        <Modal>
          <div className="containerSuccesfullModal">
            <p className="modal_text_verificated">
              Se ha modificado correctamente
            </p>
            <img src={imgSuccesfullPost} alt="succesfull Post" />
          </div>

          <button
            className="button_accepted"
            onClick={() => setModalVisibleUpdate(false)}
          >
            Aceptar
          </button>
        </Modal>
      )}
    </main>
  );
}

export default CreateActivity;
