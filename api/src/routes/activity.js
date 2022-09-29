const express = require("express");
const path = require("path");
const multer = require("multer");
// const { Country, Activity, Country_activities } = require("../db");
const { Op } = require("sequelize");
const router = express.Router();
const {
  listActivities,
  createActivity,
  deleteActivity,
  updateActivity,
  listAllActivites,
} = require("../Controllers/controllers");
// const { route } = require("express/lib/application");
const diskstorage = multer.diskStorage({
  destination: path.join(__dirname, "../images"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-monkeywit" + file.originalname);
  },
});
const fileUpload = multer({
  storage: diskstorage,
}).single("image");

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    res.json(await listActivities(id));
  } catch (error) {
    res.status(404).send(error);
  }
});
// router.get("/", async (req, res) => {
//   try {
//     res.json(await listAllActivites());
//   } catch (error) {
//     res.status(404).send(error);
//   }
// });

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

// router.post("/images", fileUpload, (req, res) => {
//   console.log(req.file);
//   res.send("image saved!");
// });
module.exports = router;
