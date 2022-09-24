import React from "react";
import "./index.css";

function Modal({ children, title}) {
  return (
    <>
      <div className="container_modal">
        <div className="modal">
          <div className="encabezado_modal">
            <h3>{title}</h3>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}

export default Modal;
