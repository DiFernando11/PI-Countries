import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../searchBar";
import "./index.css";

function Nav() {
  return (
    <header>
      <nav className="container_navigation ">
        <ul>
          <li>
           About
          </li>
          <li>
            <Link to={"/home"}>Home </Link>
          </li>
          <li>
            <Link to={"/"}>Inicio</Link>
          </li>
        </ul>
        <SearchBar />
      </nav>
    </header>
  );
}

export default Nav;
