import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteActivity } from "../../redux/actions";
import CreateActivity from "../createActivity";
import Modal from "../modal";
import "./index.css";

function ActivityCard({
  id,
  name,
  difficult,
  duration,
  season,
  typeActivity,
  countryId,
}) {
  const [modalVisibleDelete, setModalVisibleDelete] = useState(false);
  const [modalVisibleUpdate, setModalVisibleUpdate] = useState(false);
  // const [desactivatedFormSearchCountries, setDesactivatedFormSearchCountries] =
  // useState(false);
  let dispatch = useDispatch();

  const openModalUpdate = () => {
    setModalVisibleUpdate(!modalVisibleUpdate);
  };

  const openModalDelete = () => {
    setModalVisibleDelete(!modalVisibleDelete);
  };
  const handleDeleteActivity = () => {
    dispatch(deleteActivity(id, countryId));
    setModalVisibleDelete(false);
    window.location.reload();
  };

  return (
    <div className="container_activity">
      <i
        onClick={openModalDelete}
        title="Delete your activity"
        className="bi bi-trash delete_card_Activiy"
      ></i>
      <ul>
        <li>
          <h2> {name}</h2>
        </li>
        <li>
          <span>Difficult: </span>
          <i className={`bi bi-star-fill active`}></i>
          <i
            className={`bi bi-star-fill ${difficult >= 2 ? "active" : ""}`}
          ></i>
          <i
            className={`bi bi-star-fill ${difficult >= 3 ? "active" : ""}`}
          ></i>
          <i
            className={`bi bi-star-fill ${difficult >= 4 ? "active" : ""}`}
          ></i>
          <i
            className={`bi bi-star-fill ${difficult >= 5 ? "active" : ""}`}
          ></i>
        </li>
        <li>
          <span>Duration: </span>
          {duration}:00 (h)
        </li>
        <li className="type_season">
          <span>Season: </span>
          {season}
        </li>

        <li className="type_activity">
          <span>Type: </span> {typeActivity}
        </li>
      </ul>
      <button>
        <i
          title="Modify your activity"
          class="bi bi-wrench-adjustable-circle-fill update_card_activity"
          onClick={openModalUpdate}
        ></i>
      </button>
      {modalVisibleUpdate ? (
        <Modal>
          <CreateActivity
            desactivatedFormSearchCountries={false}
            id={id}
            initialState={{
              name,
              difficult,
              duration,
              season,
              typeActivity,
            }}
          />
          <button onClick={openModalUpdate}> Cancelar</button>
        </Modal>
      ) : null}
      {modalVisibleDelete ? (
        <Modal>
          <h1>Ventana Modal</h1>

          <button onClick={() => handleDeleteActivity()}> Aceptar</button>
          <button onClick={openModalDelete}> Cancelar</button>
        </Modal>
      ) : null}
    </div>
  );
}

export default ActivityCard;
