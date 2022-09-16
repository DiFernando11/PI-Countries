import React from "react";

function ActivityCard({ id, name, difficult, duration, season }) {
  return (
    <>
      <ul>
        <li>{name}</li>
        <li>{difficult}</li>
        <li>{duration}</li>
        <li>{season}</li>
      </ul>
    </>
  );
}

export default ActivityCard;
