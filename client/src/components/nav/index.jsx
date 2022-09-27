import React from "react";
import { Link, NavLink } from "react-router-dom";
import SearchBar from "../searchBar";
import giftLanding from "../../assets/logo-white.png";
import "./index.css";

function Nav() {
  const directionCurrent = window.location.pathname;
  const directionBySearchBar = "/home";
  return (
    <header>
      <nav>
        <Link to={"/"}>
          <div className="displey_center">
            <img src={giftLanding} alt="toLanding" />
          </div>
        </Link>

        {directionCurrent === directionBySearchBar ? <SearchBar /> : null}

        <ul className="navMenu">
          <li>
            <NavLink to={"/home"} activeClassName="sectionCurrent">
              <span>Home</span>
              <span>
                <i className="bi bi-house-door"></i>
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/about"} activeClassName="sectionCurrent">
              <span>About</span>
              <span>
                <i className="bi bi-person-heart"></i>
              </span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to={{ pathname: "/createActivity", state: { name: false } }}
            >
              <span>CREATE</span>
              <span>
                <i className="bi bi-stars"></i>
              </span>
            </NavLink>
          </li>

          <li className="logoSocialNetworks">
            <a href="https://github.com/DiFernando11/">
              <span>
                <i className="bi bi-github"></i>
              </span>
              <span style={{ borderBottom: "none" }}>
                <i className="bi bi-arrow-up-right socialArrow"></i>
              </span>
            </a>
          </li>

          <li className="logoSocialNetworks">
            <a href="https://www.linkedin.com/in/diego-fernando-apolo-guachizaca-324977248">
              <span>
                <i className="bi bi-linkedin "></i>
              </span>
              <span style={{ borderBottom: "none" }}>
                <i className="bi bi-arrow-up-right socialArrow"></i>
              </span>
            </a>
          </li>
          <li>
            <a href="https://api.whatsapp.com/send?phone=0962748639&text=Hola,visite tu pagina">
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
