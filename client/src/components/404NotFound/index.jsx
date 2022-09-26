import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import page404 from "../../assets/descarga-removebg-preview.png";

function NotFound() {
  return (
    <section className="container_page_notFound">
      <h1>PAGE NOT FOUND</h1>
      <Link to={"/"}>
        <div>
          <p className="text_visted_page">
            Disfruta de tus paises favoritos aqui<i class="bi bi-house"></i>
          </p>
        </div>
      </Link>
      <section>
        <div className="error-container">
          <span>
            <span>4</span>
          </span>
          <span>0</span>
          <span>
            <span>4</span>
          </span>
        </div>
      </section>
    </section>
  );
}

export default NotFound;
