import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

function LandingPage() {
  return (
    <section className="grid">
      <div className="grid_text">
        <h2 className="gird__title gird_title_main">COUNTRIES</h2>
        <h2 className="gird__title grid__title--transform ">
          Discover your favorite countries
        </h2>
        <Link to={"/home"}>
          <button>
            <span>Find out more</span>
          </button>
        </Link>
      </div>
      {/* <Link to="/home">
        <button className="btn">HOME</button>;
      </Link> */}
    </section>
  );
}

export default LandingPage;
