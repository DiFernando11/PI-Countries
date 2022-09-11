const express = require("express");
const { Op } = require("sequelize");
const { Country, Activity } = require("../db");
const router = express.Router();
const {
  listCountries,
  findCountryByID,
} = require("../Controllers/controllers");

router.get("/", async (req, res) => {
  const { name, limit } = req.query;
  try {
    res.json(await listCountries(name, limit));
  } catch (error) {
    res.status(404).send(error);
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    res.json(findCountryByID(id));
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
