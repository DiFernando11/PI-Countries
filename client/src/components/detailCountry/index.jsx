import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getCountryDetail } from "../../redux/actions";
import ActivityCard from "../activityCard";
import imgAmerica from "../../assets/america.png";
import imgEuropa from "../../assets/europa.png";
import imgAsia from "../../assets/Asia.webp";
import imgAfrica from "../../assets/africa.png";
import imgAntartica from "../../assets/antartica.png";
import imgOceania from "../../assets/oceania.png";
import imgDefault from "../../assets/mapamundi.jpg";
import "./index.css";

function DetailCountry() {
  //states globales
  let detail = useSelector((state) => state.countryDetail);
  // hooks
  let dispatch = useDispatch();
  const { id } = useParams();
  // traigo la informacion de los detalles de cada pais
  useEffect(() => {
    dispatch(getCountryDetail(id));
  }, [dispatch, id]);

  let continentImg = "";
  switch (detail.continent) {
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
    <main>
      <section>
        <div className="countries_detail">
          <div className="container_googleMaps">
            <div className="container_detail">
              <figure>
                <img src={detail.flag} alt={detail.name} />
              </figure>

              <div className="container_information_country">
                {detail && (
                  <ul>
                    <li>{detail.id}</li>
                    <li>
                      <b>Capital: </b> {detail.capital}
                    </li>
                    <li>
                      <b>Sub region: </b> {detail.subregion}
                    </li>
                    <li>
                      <b>area: </b>
                      {detail.area} KM²
                    </li>
                    <li>
                      <b>Population: </b>
                      {detail.population}
                    </li>
                    <li>{detail.continent}</li>
                    <li>
                      <img src={continentImg} alt={detail.id} />
                    </li>
                  </ul>
                )}
              </div>
            </div>
            {/* <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d122258.0836993223!2d-62.19260204999999!3d16.7485371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c13ab53e1c7369d%3A0x1e0fea838805b1a2!2sMontserrat!5e0!3m2!1ses!2sec!4v1663762486370!5m2!1ses!2sec"
              width="400"
              height="300"
              allowfullscreen=""
              loading="lazy"
            ></iframe> */}
          </div>
          <section className="section_activities">
            <h5>Activities</h5>

            <div className="container_Activities">
              <div className="addActivities">
                <Link to={"/createActivity"}>
                  <i className="bi bi-plus-circle"></i>
                </Link>
              </div>
              {detail.activities
                ? detail.activities.map((activity) => (
                    <ActivityCard
                      key={activity.id}
                      id={activity.id}
                      name={activity.name}
                      difficult={activity.difficult}
                      duration={activity.duration}
                      season={activity.season}
                      typeActivity={activity.typeActivity}
                      countryId={id}
                    />
                  ))
                : null}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

export default DetailCountry;
