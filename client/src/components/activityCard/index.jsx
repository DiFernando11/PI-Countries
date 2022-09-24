import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createFavoriteActivities,
  deleteActivity,
  deleteFavority,
  favoriteActivities,
  getCountryDetail,
  isFavoriteActivity,
  setRefreshUpdate,
} from "../../redux/actions";
import CreateActivity from "../createActivity";
import Modal from "../modal";
import giftDeleteActivity from "../../assets/deleteactivity.gif";
import "./index.css";
import { useParams } from "react-router-dom";

function ActivityCard({
  id,
  name,
  difficult,
  duration,
  season,
  typeActivity,
  countryId,
  isFavorite,
  isSectionActivities,
}) {
  const [modalVisibleDelete, setModalVisibleDelete] = useState(false);
  const [modalVisibleUpdate, setModalVisibleUpdate] = useState(false);
  const [refreshState, setRefreshState] = useState(true);

  const stateRefreshUpdate = useSelector((state) => state.stateRefreshUpdate);
  console.log(stateRefreshUpdate, "hola");
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
  console.log(isFavorite);
  const handleAddFavorite = () => {
    if (!isFavorite) {
      dispatch(
        createFavoriteActivities({
          id,
          name,
          difficult,
          duration,
          season,
          typeActivity,
        })
      );
    } else {
      dispatch(deleteFavority(id));
    }
 
    dispatch(setRefreshUpdate());
    dispatch(isFavoriteActivity(id));
  };
  const handleDeleteFavoriteAcitivy = () => {
    dispatch(isFavoriteActivity(id));
    dispatch(deleteFavority(id));
    dispatch(setRefreshUpdate());

  };
  useEffect(() => {
    dispatch(favoriteActivities());
  }, [dispatch, stateRefreshUpdate]);

  return (
    <div>
      <div className="container_activity">
        <i
          onClick={openModalDelete}
          title="Delete your activity"
          className={`bi bi-trash delete_card_Activiy ${
            !isSectionActivities && "invalidDelete"
          }`}
        ></i>
        <ul>
          <li>
            {isSectionActivities ? (
              <i
                onClick={handleAddFavorite}
                className={`bi bi-heart-fill addFavorite ${
                  isFavorite && "isFavorited"
                }`}
              ></i>
            ) : (
              <i
                onClick={handleDeleteFavoriteAcitivy}
                className={`bi bi-heart-fill addFavorite isFavorited
                `}
              ></i>
            )}
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
            {season} {isFavorite}
          </li>

          <li className="type_activity">
            <span>Type: </span> {typeActivity}
          </li>
        </ul>
        <button>
          <i
            title="Modify your activity"
            class={`bi bi-wrench-adjustable-circle-fill update_card_activity ${
              !isSectionActivities && "invalidDelete"
            } `}
            onClick={openModalUpdate}
          ></i>
        </button>
      </div>
      {modalVisibleUpdate ? (
        <Modal
          title={"Modificar"}
          setModalVisibleDelete={setModalVisibleUpdate}
        >
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
          <button className="button_accepted" onClick={openModalUpdate}>
            Cancelar
          </button>
        </Modal>
      ) : null}

      {modalVisibleDelete ? (
        <Modal title={"Eliminar"}>
          <div className="container_img_delete_activity">
            <p className="text_container_delete_modal">
              Estas Seguro que quieres eliminar
            </p>
            <img src={giftDeleteActivity} alt="delete activity" />
          </div>
          <div className="container_delete_modal">
            <button
              className="button_accepted"
              onClick={() => handleDeleteActivity()}
            >
              Aceptar
            </button>
            <button className="button_accepted" onClick={openModalDelete}>
              Cancelar
            </button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}

export default ActivityCard;
