import React from "react";
import {  useState } from "react";
import {  useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import { getAllCountries } from "../../redux/actions";
import { lengthOfArrayPage } from "../../utils/util";
// import { useQueryParams } from "../../utils/hooks/useQueryParams";
import "./index.css";

function Pagination({ renderingContinent }) {
  //hook creado para obtener la informacion de los queries enviados por el usuario
  //estados globales
  let continentsOfCountries = useSelector(
    (state) => state.continentsOfCountries
  );
  //estados locales
  const [items, setItems] = useState(0);
  //hooks

  const history = useHistory();

  //dispatch


  ///funciones handlers
  let numbersPageArray = lengthOfArrayPage(25);
  if (renderingContinent)
    numbersPageArray = lengthOfArrayPage(
      Math.ceil(continentsOfCountries.count / 10)
    );

  function handleQuery(page) {
    history.replace(`?page=${page}`);
    setItems(page);
  }

  return (
    <div className="container_button_page">
      <h5>Page {items}</h5>
      {numbersPageArray.map((page) => (
        <button
          className="button_pagination"
          key={page}
          onClick={() => handleQuery(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
