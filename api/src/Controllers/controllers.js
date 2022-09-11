const { Country, Activity } = require("../db");
const { Op } = require("sequelize");

module.exports = {
  ///server route countries
  listCountries: async (name, limit) => {
    const getAllCountries = await Country.findAll({
      attributes: ["name", "continent", "flag"],
      include: {
        model: Activity,
      },
    });
    if (name) {
      const getCountriesByName = await Country.findAll({
        attributes: ["name", "continent", "flag"],
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },

        include: Activity,
      });
      if (!getCountriesByName.length)
        throw `No existe un pais con el nombre de ${name}`;
      return getCountriesByName;
    }

    if (limit) {
      const limitGetCountries = await Country.findAll({
        limit: limit,
      });
      return limitGetCountries;
    }

    return getAllCountries;
  },
  findCountryByID: async (idCountry) => {
    const id = idCountry.toUpperCase();
    const searchCountryByID = await Country.findByPk(id, {
      include: Activity,
    });
    if (!searchCountryByID) throw `${id} Doesnt Exist`;
    return searchCountryByID;
  },
  /////
  ///server route activities
  listActivities: async () => {
    const getAllActivities = await Activity.findAll({
      include: {
        model: Country,
      },
    });
    return getAllActivities;
  },
  createActivity: async (name, difficult, duration, season, country) => {
    if (!name || !difficult || !duration || !season || !country)
      throw `Not all parameters have been sent`;

    const nameActivity = name.toLowerCase();

    const findActivity = await Activity.findOne({
      where: {
        name: nameActivity,
        difficult,
        duration,
        season,
      },
    });

    let newActivity = findActivity;
    if (!findActivity) {
      newActivity = await Activity.create({
        name: nameActivity,
        difficult,
        duration,
        season,
      });
    }

    country.forEach(async (country) => {
      const activityCountry = await Country.findOne({
        where: {
          name: country,
        },
      });
      await newActivity.addCountry(activityCountry);
    });
  },
};
