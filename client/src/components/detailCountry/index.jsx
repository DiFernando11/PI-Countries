import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  favoriteActivities,
  getActivities,
  getCountryDetail,
} from "../../redux/actions";
import { addthousandsseparators, imageContinent } from "../../utils/util";
import giftNotActivities from "../../assets/44165998-composizione-vettoriale-di-monumenti-famosi-di-fronte-a-un-cielo-soleggiato-con-un-aereo-e-palloni-.webp";
import ActivityCard from "../activityCard";
import giftLoading from "../../assets/_______.gif";

import "./index.css";

function DetailCountry() {
  //states globales
  let detail = useSelector((state) => state.countryDetail);
  let favoriteActivity = useSelector((state) => state.favoriteActivity);
  let activities = useSelector((state) => state.activities);
  let stateRefreshUpdate = useSelector((state) => state.stateRefreshUpdate);
  //state locales
  const [cardFavoriteCurrent, setCardFavoriteCurrent] = useState(0);
  // hooks
  const lengthCardsFavorities = favoriteActivity?.length;
  const continentImg = imageContinent(detail);

  let dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getCountryDetail(id));
  }, [dispatch, id, stateRefreshUpdate]);

  useEffect(() => {
    dispatch(getActivities(id));
  }, [dispatch, stateRefreshUpdate, id]);

  useEffect(() => {
    dispatch(favoriteActivities());
  }, [dispatch, stateRefreshUpdate]);
  //Carrusel
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
                {detail ? (
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
                      {addthousandsseparators(detail.area + "")} KM²
                    </li>
                    <li>
                      <b>Population: </b>
                      {addthousandsseparators(detail.population + "")}
                    </li>
                    <li>{detail.continent}</li>
                    <li>
                      <img src={continentImg} alt={detail.id} />
                    </li>
                  </ul>
                ) : (
                  <div>
                    <img src={giftLoading} alt="detail" />
                  </div>
                )}
              </div>
            </div>

            <div className="section_favorities_Activities">
              <h3>Favorites Activities</h3>
              <div className="container_favorities_Activities">
                <div className="wrap">
                  <button
                    className="carrusel_button"
                    onClick={prevCardFavority}
                  >
                    <i className="bi bi-chevron-left"></i>
                  </button>
                </div>

                {favoriteActivity.length ? (
                  favoriteActivity.map((favorite, index) => (
                    <div key={favorite.id}>
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
                          setCardFavoriteCurrent={setCardFavoriteCurrent}
                          lengthCardsFavorities={lengthCardsFavorities}
                        />
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text_not_favorites_activities">
                    You have no favorite activities
                  </p>
                )}

                <div className="wrap">
                  <button
                    className="carrusel_button"
                    onClick={nextCardFavority}
                  >
                    <i className="bi bi-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <section className="section_activities">
            <h5>Activities</h5>
            {activities.length ? (
              <div className="container_Activities">
                <div className="addActivities">
                  <span>Add</span>
                  <Link
                    to={{
                      pathname: "/createActivity",
                      state: { name: detail },
                    }}
                  >
                    <i className="bi bi-plus-circle"></i>
                  </Link>
                </div>
                {activities.length &&
                  activities.map((activity) => (
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
                      setCardFavoriteCurrent={setCardFavoriteCurrent}
                      lengthCardsFavorities={lengthCardsFavorities}
                    />
                  ))}
              </div>
            ) : (
              <div className="containerNotActivities">
                <div className="addActivities notActivitesAdd">
                  <span>Add</span>
                  <Link
                    to={{
                      pathname: "/createActivity",
                      state: { name: detail },
                    }}
                  >
                    <i className="bi bi-plus-circle"></i>
                  </Link>
                </div>
                <div>
                  <p>No activities availables</p>
                  <img src={giftNotActivities} alt="not activities" />
                </div>
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}

export default DetailCountry;
