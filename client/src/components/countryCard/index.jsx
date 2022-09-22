import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import imgAmerica from "../../assets/america.png";
import imgEuropa from "../../assets/europa.png";
import imgAsia from "../../assets/Asia.webp";
import imgAfrica from "../../assets/africa.png";
import imgAntartica from "../../assets/antartica.png";
import imgOceania from "../../assets/oceania.png";
import imgDefault from "../../assets/mapamundi.jpg";

function CountryCard(props) {
  let continentImg = "";
  switch (props.continent) {
    case "Americas":
      continentImg = imgAmerica;
      break;
    case "Europe":
      continentImg = imgEuropa;
      break;
    case "Africa":
      continentImg = imgAfrica;
      break;
    case "Oceania":
      continentImg = imgOceania;
      break;
    case "Asia":
      continentImg = imgAsia;
      break;
    case "Antarctic":
      continentImg = imgAntartica;
      break;
    default:
      continentImg = imgDefault;
  }

  return (
    <div className="country_card">
      <div className="head_card_country">
        <div className="box">
          <img className="img_main" src={props.flag} alt={props.name} />
          <div className="capa">
            <Link to={`/detailCountry/${props.id}`}>
              <img className="imgGrande" src={props.flag} alt={props.name} />
            </Link>
          </div>
        </div>
        <h2> {props.name}</h2>
      </div>
      <p className="detail_translation">{props.translation}</p>
      <div className="container_continent">
        <p>{props.continent}</p>
        <img src={continentImg} alt={`${props.name} de ${props.continent}`} />
      </div>
      <Link to={`/detailCountry/${props.id}`}>
        <button className="detail_see_more">See moore</button>
      </Link>
    </div>
  );
}

export default CountryCard;
