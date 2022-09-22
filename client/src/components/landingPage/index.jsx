import React from "react";
import { Link } from "react-router-dom";
import "./index.css"

function LandingPage() {
  return (
    <main className="landingPages">
      <Link to="/home">
        <button className="btn">HOME</button>;
      </Link>
    </main>
  );
}

export default LandingPage;
