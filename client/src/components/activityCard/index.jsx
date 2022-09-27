import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createFavoriteActivities,
  deleteActivity,
  deleteFavority,
  isFavoriteActivity,
  setRefreshUpdate,
  updateActivity,
  updateCardFavorite,
} from "../../redux/actions";
import CreateActivity from "../createActivity";
import Modal from "../modal";
import giftDeleteActivity from "../../assets/deleteactivity.gif";
import "./index.css";
import imgSuccesfullPost from "../../assets/c6842479-e0ee-49a2-9053-d00639074f7a_tick.gif";

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
  const [modalVisibleUpdateResponse, setModalVisibleUpdateResponse] =
    useState(false);
  const [modalVisibleResponseDelete, setModalVisibleResponseDelete] =
    useState(false);

  //ESTADOS GLOBALES
  const responseCreateActivity = useSelector(
    (state) => state.responseCreateActivity
  );
  const favoriteActivity = useSelector((state) => state.favoriteActivity);

  //HOOKS
  let dispatch = useDispatch();

  //HANDLERS
  const openModalUpdate = () => {
    setModalVisibleUpdate(!modalVisibleUpdate);
  };

  const openModalDelete = () => {
    setModalVisibleDelete(!modalVisibleDelete);
    dispatch(setRefreshUpdate());
    // setModalVisibleResponseDelete(true);
  };
  const openModalResponseDelete = () => {
    setModalVisibleResponseDelete(false);
    dispatch(setRefreshUpdate());
  };
  const openModalResponseUpdate = () => {
    setModalVisibleUpdateResponse(false);
    dispatch(setRefreshUpdate());
  };
  const handleDeleteActivity = () => {
    dispatch(deleteActivity(id, countryId));
    if (
      favoriteActivity.some(
        (activity) => parseInt(activity.id) === parseInt(id)
      )
    ) {
      dispatch(deleteFavority(id));
    }
    dispatch(setRefreshUpdate());
    setModalVisibleDelete(false);
    setModalVisibleResponseDelete(true);
  };
  const handleUpdateActivity = (e, input) => {
    e.preventDefault();
    dispatch(updateActivity(id, input));
    dispatch(setRefreshUpdate());
    dispatch(updateCardFavorite(id, input));
    setModalVisibleUpdate(false);
    setModalVisibleUpdateResponse(true);
  };

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
    <div className="pruebita">
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
        <button className={!isSectionActivities ? "invalidDelete" : null}>
          <i
            title="Modify your activity"
            className={`bi bi-wrench-adjustable-circle-fill update_card_activity `}
            onClick={openModalUpdate}
          ></i>
        </button>
      </div>
      {modalVisibleUpdateResponse ? (
        <Modal>
          <div className="containerSuccesfullModal">
            <p className="modal_text_verificated">{responseCreateActivity}</p>
            <img src={imgSuccesfullPost} alt="response update" />
          </div>

          <button className="button_accepted" onClick={openModalResponseUpdate}>
            Aceptar
          </button>
        </Modal>
      ) : null}

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
            // state={{ state: { name: false } }}
            handleUpdateActivity={handleUpdateActivity}
          />
          <button className="button_accepted" onClick={openModalUpdate}>
            Cancelar
          </button>
        </Modal>
      ) : null}

      {modalVisibleResponseDelete ? (
        <Modal title={"Succesfull"}>
          <div className="containerSuccesfullModal">
            <p className="modal_text_verificated">{responseCreateActivity}</p>
            <img src={imgSuccesfullPost} alt="response delete" />
          </div>

          <button className="button_accepted" onClick={openModalResponseDelete}>
            Aceptar
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
