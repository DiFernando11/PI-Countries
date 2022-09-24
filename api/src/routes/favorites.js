const express = require("express");
const { Op } = require("sequelize");
const {
  createFavorite,
  listFavorite,
  updateIsFavorite,
  deleteFavorite,
  updateCardFavorite,
} = require("../Controllers/controllers");
const { Country, Activity } = require("../db");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.json(await listFavorite());
  } catch (error) {
    res.status(404).send(error);
  }
});
router.post("/", async (req, res) => {
  const { id, name, difficult, duration, season, typeActivity } = req.body;
  try {
    res.json(
      await createFavorite(id, name, difficult, duration, season, typeActivity)
    );
  } catch (error) {
    res.send(error);
  }
});
router.put("/activity/:id", async (req, res) => {
  const { id } = req.params;
  const { country } = req.query;
  try {
    res.json(await updateIsFavorite(id, country));
  } catch (error) {
    res.status(404).send(error);
  }
});
router.put("/:id", async (req, res) => {
  const { name, difficult, duration, season, typeActivity } = req.body;
  const { id } = req.params;
  try {
    res.json(
      await updateCardFavorite(
        id,
        name,
        difficult,
        duration,
        season,
        typeActivity
      )
    );
  } catch (error) {
    res.status(404).send(error);
  }
});
router.delete("/activity/:id", async (req, res) => {
  const { id } = req.params;
  try {
    res.json(await deleteFavorite(id));
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
