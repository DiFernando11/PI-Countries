import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { statePage } from "../../redux/actions";

import "./index.css";

function Pagination() {
  let dispatch = useDispatch();
  let countries = useSelector((state) => state.countries);
  let statePages = useSelector((state) => state.statePage);
  let totalPosts = countries.length;
  let pages = [];
  for (let index = 1; index <= Math.ceil(totalPosts / 9); index++) {
    pages.push(index);
  }

  return (
    <div className="container_button_page">
      {pages &&
        pages.map((page, index) => (
          <button
            key={index}
            onClick={() => dispatch(statePage(page))}
            className={page === statePages ? "activie_page" : "button_page"}
          >
            {page}
          </button>
        ))}
    </div>
  );
}

export default Pagination;
