const express = require("express");
const { Country, Activity, Country_activities } = require("../db");
const { Op } = require("sequelize");
const router = express.Router();
const {
  listActivities,
  createActivity,
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
    res.json(await createActivity(name, difficult, duration, season, country, typeActivity));
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/", async (req, res) => {
  try {
    const row = await Activity.findOne({
      where: { id: 17 },
    });

    if (row) {
      await row.destroy(); // deletes the row
    }
    res.send("Se ha eliminado correctamente");
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
