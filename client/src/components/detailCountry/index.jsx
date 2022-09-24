import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { favoriteActivities, getCountryDetail } from "../../redux/actions";
import { imageContinent } from "../../utils/util";
import ActivityCard from "../activityCard";

import "./index.css";

function DetailCountry() {
  //states globales
  let detail = useSelector((state) => state.countryDetail);
  let favoriteActivity = useSelector((state) => state.favoriteActivity);
  const stateRefreshUpdate = useSelector((state) => state.stateRefreshUpdate);
  //state locales
  const [cardFavoriteCurrent, setCardFavoriteCurrent] = useState(0);

  const lengthCardsFavorities = favoriteActivity?.length;
  // hooks
  let dispatch = useDispatch();
  const paramsId = useParams();
  console.log(paramsId);
  const { id } = useParams();
  // traigo la informacion de los detalles de cada pais

  useEffect(() => {
    dispatch(getCountryDetail(id));
  }, [dispatch, id, cardFavoriteCurrent, stateRefreshUpdate]);
  console.log(detail);

  const continentImg = imageContinent(detail);
  const nextCardFavority = () => {
    setCardFavoriteCurrent(
      cardFavoriteCurrent === lengthCardsFavorities - 1
        ? 0
        : cardFavoriteCurrent + 1
    );
  };
  const prevCardFavority = () => {
    setCardFavoriteCurrent(
      cardFavoriteCurrent === 0
        ? lengthCardsFavorities - 1
        : cardFavoriteCurrent - 1
    );
  };

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

            <div className="section_favorities_Activities">
              <h2>Favorites Activities</h2>
              <div className="container_favorities_Activities">
                <button onClick={prevCardFavority}>
                  <i class="bi bi-arrow-left-square"></i>
                </button>
                {favoriteActivity.length ? (
                  favoriteActivity.map((favorite, index) => (
                    <div>
                      {cardFavoriteCurrent === index && (
                        <ActivityCard
                          key={index}
                          id={favorite.id}
                          name={favorite.name}
                          difficult={favorite.difficult}
                          duration={favorite.duration}
                          season={favorite.season}
                          typeActivity={favorite.typeActivity}
                          isFavorite={favorite.isFavorite}
                          countryId={id}
                          isSectionActivities={false}
                        />
                      )}
                    </div>
                  ))
                ) : (
                  <div>Add Favorites</div>
                )}
                <button onClick={nextCardFavority}>
                  <i class="bi bi-arrow-right-square"></i>
                </button>
              </div>
            </div>
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
                      isFavorite={activity.isFavorite}
                      countryId={id}
                      isSectionActivities={true}
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
