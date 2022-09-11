import React from "react";
import { Link } from "react-router-dom";
import style from "./index.module.css";

function LandingPage() {
  return (
    <main className={`${style.containerLandingPage}`}>
      <Link to="/home">
        <button className={`${style.btn}`}>HOME</button>;
      </Link>
    </main>
  );
}

export default LandingPage;
