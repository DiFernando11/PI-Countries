import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../searchBar";
import style from "./index.module.css";

function Nav() {
  return (
    <header>
      <nav className={`${style.container_navigation}`}>
        <ul>
          <li>
            <Link>About</Link>{" "}
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
