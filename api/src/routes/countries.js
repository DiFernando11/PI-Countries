const express = require("express");
const { Op } = require("sequelize");
const { Country, Activity } = require("../db");
const router = express.Router();
const {
  listCountries,
  findCountryByID,
  filterByContinents,
  sortByAlphabeticalOrder,
  sortByAlphabeticalOrderByContinent,
} = require("../Controllers/controllers");

router.get("/continent", async (req, res) => {
  const { continent, page = 0 } = req.query;
  try {
    res.json(await filterByContinents(continent, page));
  } catch (error) {
    res.send(error);
  }
});
router.get("/order/continent", async (req, res) => {
  const { continent, order, page } = req.query;
  try {
    res.json(await sortByAlphabeticalOrderByContinent(continent, order, page));
  } catch (error) {
    res.send(error);
  }
});
router.get("/order", async (req, res) => {
  const { order = "ASC", page } = req.query;
  try {
    res.json(await sortByAlphabeticalOrder(order, page));
  } catch (error) {
    res.send(error);
  }
});

router.get("/", async (req, res) => {
  const { name, page } = req.query;
  try {
    res.json(await listCountries(name, page));
  } catch (error) {
    res.status(404).send(error);
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    res.json(await findCountryByID(id));
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
