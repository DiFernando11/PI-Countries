import React from "react";
import "./index.css";

function ActivityCard({ name, difficult, duration, season, typeActivity }) {
  return (
    <div className="container_activity">
      <button className="delete_card_Activiy">X</button>
      <ul>
        <li>
          <h2> actividad : {name}</h2>
        </li>
        <li>{difficult}</li>
        <li>{duration}</li>
        <li>{season}</li>
        <li>
          <h3>type: {typeActivity}</h3>
        </li>
      </ul>
    </div>
  );
}

export default ActivityCard;
