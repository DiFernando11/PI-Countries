import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../searchBar";
import "./index.css";

function Nav() {
  const [toggleNav, setToggleNav] = useState(false);
  const toggleButton = () => {
    setToggleNav(!toggleNav);
  };
  const directionCurrent = window.location.href;
  const directionBySearchBar = "http://localhost:3000/home";
  return (
    <header>
      <nav>
        <div className="displey_center"></div>
        <button
          aria-label={`${toggleNav ? "menu abierto" : "menu cerrado"}`}
          onClick={toggleButton}
          className="buttonListMenu"
        >
          <i className="bi bi-list"></i>
        </button>
        {directionCurrent === directionBySearchBar ? <SearchBar /> : null}

        <ul className={`${toggleNav ? "nav_menu_visible" : "navMenu"}`}>
          <li>
            <Link to={"/home"}>
              <span>Home</span>

              <span>
                <i className="bi bi-house-door"></i>
              </span>
            </Link>
          </li>

          <li>
            <Link to={"/"}>
              <span>Inicio</span>
              <span>
                <i className="bi bi-stars"></i>
              </span>
            </Link>
          </li>

          {/* <li>
            <a href="#0">
              <span>Projects</span>
              <span>
                <i className="bi bi-briefcase"></i>
              </span>
            </a>
          </li> */}
          <li className="logoSocialNetworks">
            <a href="#0">
              <span>
                <i className="bi bi-github"></i>
              </span>
              <span style={{ borderBottom: "none" }}>
                <i className="bi bi-arrow-up-right socialArrow"></i>
              </span>
            </a>
          </li>

          <li className="logoSocialNetworks">
            <a href="#0">
              <span>
                <i className="bi bi-linkedin "></i>
              </span>
              <span style={{ borderBottom: "none" }}>
                <i className="bi bi-arrow-up-right socialArrow"></i>
              </span>
            </a>
          </li>
          <li>
            <a href="#0">
              <span className="navContact">Contact me</span>
              <span>
                <i className="bi bi-telephone-inbound"></i>
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Nav;
