import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPostActivity } from "../../redux/actions";
import "./index.css";
import { validate } from "../../utils/util";

function CreateActivity() {
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    difficult: 1,
    duration: 1,
    season: "All year round",
    country: [],
  });

  let handleChange = (e) => {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
  };

  let handleCountry = (e) => {
    const removeSpecialCharacters = e.target.value
      .replace(/[^a-zA-Z ]/g, "")
      .trimEnd();
    const separateByCountries = removeSpecialCharacters
      .replace(/\s+/gi, " ")
      .trimStart();
    let countryActivity = separateByCountries.split(" ");

    setInput({
      ...input,
      country: countryActivity,
    });
  };
  let dispatch = useDispatch();

  const handleSubmit = (e) => {
    console.log(input);
    e.preventDefault();
    try {
      dispatch(createPostActivity(input));
    } catch (error) {
      console.log("Hubo un error");
    }
  };
  return (
    <main>
      <h1>FORMULARIO</h1>
      <form className="form_create_activity" onSubmit={(e) => handleSubmit(e)}>
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

        <label form="country">
          Country
          {errors.country && <p className="danger">{errors.country} </p>}
          <input
            className={errors.country && "danger"}
            type="text"
            name="country"
            onChange={(e) => handleCountry(e)}
            required
          />
        </label>
        <button type="submit">Create Activity</button>
      </form>
    </main>
  );
}

export default CreateActivity;
