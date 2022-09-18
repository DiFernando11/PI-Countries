import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

function CountryCard(props) {
  return (
    <div className="country_card">
      <Link to={`/detailCountry/${props.id}`}>
        <img src={props.flag} alt={props.name} />
        <h2> {props.name}</h2>
        <p>{props.translation}</p>
        <p>Continent: {props.continent}</p>
      </Link>
    </div>
  );
}

export default CountryCard;
