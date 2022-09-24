import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createFavoriteActivities,
  deleteActivity,
  deleteFavority,
  favoriteActivities,
  isFavoriteActivity,
  setRefreshUpdate,
  updateActivity,
  updateCardFavorite,
} from "../../redux/actions";
import CreateActivity from "../createActivity";
import Modal from "../modal";
import giftDeleteActivity from "../../assets/deleteactivity.gif";
import "./index.css";

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
  setCardFavoriteCurrent,
  lengthCardsFavorities,
}) {
  //ESTADOS LOCALES
  const [modalVisibleDelete, setModalVisibleDelete] = useState(false);
  const [modalVisibleUpdate, setModalVisibleUpdate] = useState(false);
  //ESTADOS GLOBALES
  const stateRefreshUpdate = useSelector((state) => state.stateRefreshUpdate);
  //HOOKS
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(favoriteActivities());
  }, [dispatch, stateRefreshUpdate]);
  //HANDLERS
  const openModalUpdate = () => {
    setModalVisibleUpdate(!modalVisibleUpdate);
  };

  const openModalDelete = () => {
    setModalVisibleDelete(!modalVisibleDelete);
  };
  const handleDeleteActivity = () => {
    dispatch(deleteActivity(id, countryId));
    dispatch(deleteFavority(id));
    setModalVisibleDelete(false);
    dispatch(setRefreshUpdate());
  };
  const handleUpdateActivity = (e, input) => {
    e.preventDefault();
    dispatch(updateActivity(id, input));
    dispatch(setRefreshUpdate());
    dispatch(updateCardFavorite(id, input));
    setModalVisibleUpdate(false);
  };
  console.log(lengthCardsFavorities);

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
      setCardFavoriteCurrent(
        lengthCardsFavorities === 0 ? 0 : lengthCardsFavorities
      );
    } else {
      dispatch(deleteFavority(id));
      setCardFavoriteCurrent(0);
    }
    dispatch(setRefreshUpdate());
    dispatch(isFavoriteActivity(id, countryId));
  };

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
            <i
              onClick={handleAddFavorite}
              className={`bi bi-heart-fill addFavorite ${
                isFavorite && "isFavorited"
              }`}
            ></i>
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
            className={`bi bi-wrench-adjustable-circle-fill update_card_activity ${
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
            handleUpdateActivity={handleUpdateActivity}
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
