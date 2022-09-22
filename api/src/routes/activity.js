const express = require("express");
const { Country, Activity, Country_activities } = require("../db");
const { Op } = require("sequelize");
const router = express.Router();
const {
  listActivities,
  createActivity,
  deleteActivity,
  updateActivity,
} = require("../Controllers/controllers");

router.get("/", async (req, res) => {
  try {
    res.json(await listActivities());
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/", async (req, res) => {
  const { name, difficult, duration, season, country, typeActivity } = req.body;
  try {
    res.json(
      await createActivity(
        name,
        difficult,
        duration,
        season,
        country,
        typeActivity
      )
    );
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { countryId } = req.body;
  try {
    res.json(await deleteActivity(id, countryId));
  } catch (error) {
    res.status(404).send(error);
  }
});
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, difficult, duration, season, typeActivity } = req.body;
  try {
    res.json(
      await updateActivity(id, name, difficult, duration, season, typeActivity)
    );
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
