import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCountryDetail } from "../../redux/actions";
import ActivityCard from "../activityCard";
import "./index.css";

function DetailCountry() {
  let dispatch = useDispatch();
  let detail = useSelector((state) => state.countryDetail);
  const { id } = useParams();
  useEffect(() => {
    dispatch(getCountryDetail(id));
  }, []);

  return (
    <main>
      <section className="countries_detail">
        <div className="container_detail">
          {detail && (
            <ul>
              <li>
                <img src={detail.flag} alt={detail.name} />
              </li>
              <li>{detail.id}</li>
              <li>{detail.capital}</li>
              <li>{detail.subregion}</li>
              <li>{detail.area}</li>
              <li>{detail.population}</li>
              <li>{detail.continent}</li>
            </ul>
          )}
        </div>
        <div className="container_activities">
          <h5>Activities</h5>

          {detail.activities
            ? detail.activities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  name={activity.name}
                  difficult={activity.difficult}
                  duration={activity.duration}
                  season={activity.season}
                />
              ))
            : null}
        </div>
      </section>
    </main>
  );
}

export default DetailCountry;
