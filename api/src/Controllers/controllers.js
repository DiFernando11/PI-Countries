const { Op } = require("sequelize");
const { Country, Activity } = require("../db");

module.exports = {
  ///server route countries
  listCountries: async (name, page) => {
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
    if (page) {
      let options = {
        limit: 10,
        offset: Number(page) * 10,
      };
      const { rows } = await Country.findAndCountAll(options);
      return { register: `${page * 10} - ${page * 10 + 10}`, rows };
    }
    const getAllCountries = await Country.findAll({
      attributes: ["id", "name", "continent", "flag"],
      include: {
        model: Activity,
      },
    });
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
  ///// filters

  findCountryByID: async (idCountry) => {
    const id = idCountry.toUpperCase();
    const searchCountryByID = await Country.findByPk(id, {
      include: Activity,
    });
    if (!searchCountryByID) throw `${id} Doesnt Exist`;
    return searchCountryByID;
  },
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
    // busco la actividad para evitar que las actividades turisticas con las mismas propiedades se repitan
    const findActivity = await Activity.findOne({
      where: {
        name: nameActivity,
        difficult,
        duration,
        season,
      },
    });

    let newActivity = findActivity;
    //creo la actividad no existia una igual
    if (!findActivity) {
      newActivity = await Activity.create({
        name: nameActivity,
        difficult,
        duration,
        season,
      });
    }
    // contenedores de los paises creados y no creados
    let containerCountriesSuccesfull = [];
    let containerCountriesNotExisted = [];
    let mesageSuccesfull = "All countries have been created with success";
    //reccorro el array de paises y le asigno la actividad turistica si el pais existe
    for (let index = 0; index < country.length; index++) {
      //aqui busco el pais
      const activityCountry = await Country.findOne({
        where: {
          name: country[index].toUpperCase(),
        },
      });
      // si el pais existe lo asigno al contenedor de paises correctos
      if (activityCountry)
        containerCountriesSuccesfull.push(activityCountry.name);
      // si el pais no  existe lo asigno al contenedor de paises incorrectos
      else containerCountriesNotExisted.push(country[index]);
      //agrego la actividad al pais
      await newActivity.addCountry(activityCountry);
    }
    // if el usuario envia mal todos los paises , la actividad no se agrega
    if (!containerCountriesSuccesfull.length)
      throw `Los paises enviados no existen, no se ha podido crear la actividad`;
    // if el usario envia algun pais que no existe, se muestra el siguiente mensaje
    if (containerCountriesSuccesfull.length !== country.length)
      mesageSuccesfull = `Se han creado ${containerCountriesSuccesfull.length} de ${country.length} paises con exito: ${containerCountriesSuccesfull}, los paises: ${containerCountriesNotExisted} no existen`;

    return mesageSuccesfull;
  },
  /// mover a otro lado
  filterByContinents: async (continent, page) => {
    continent =
      continent.charAt(0).toUpperCase() + continent.slice(1).toLowerCase();

    if (page) {
      const { count } = await Country.findAndCountAll({
        where: {
          continent,
        },
      });
      const { rows } = await Country.findAndCountAll({
        where: {
          continent,
        },

        offset: Number(page) * 10,
        limit: 10,
        include: Activity,
      });
      if (!rows.length) throw `the selected continent does not exist`;
      return { count, register: `${page * 10} - ${page * 10 + 10}`, rows };
    }

    const getCountriesByName = await Country.findAll({
      where: {
        continent,
      },

      include: Activity,
    });
    if (!getCountriesByName.length)
      throw `the selected continent does not exist`;
    return getCountriesByName;
  },
  // ordenar ascendete a descendete
  sortByAlphabeticalOrder: async (order, page) => {
    if (order === "ALL") {
      const { rows } = await Country.findAndCountAll({
        attributes: ["id", "name", "continent", "flag"],
        offset: Number(page) * 10,
        limit: 10,
        include: Activity,
      });
      return { register: `${page * 10} - ${page * 10 + 10}`, rows };
    }

    if (page) {
      const { rows } = await Country.findAndCountAll({
        order: [["name", order]],
        attributes: ["id", "name", "continent", "flag"],
        offset: Number(page) * 10,
        limit: 10,
        include: Activity,
      });
      return { register: `${page * 10} - ${page * 10 + 10}`, rows };
    }

    const getAllCountries = await Country.findAll({
      order: [["name", order]],
      attributes: ["id", "name", "continent", "flag"],
      include: Activity,
    });
    return getAllCountries;
  },
  sortByAlphabeticalOrderByContinent: async (continent, order, page) => {
    continent =
      continent.charAt(0).toUpperCase() + continent.slice(1).toLowerCase();
    if (order === "ALL") {
      const { count } = await Country.findAndCountAll({
        where: {
          continent,
        },
      });
      const { rows } = await Country.findAndCountAll({
        where: {
          continent,
        },
        offset: Number(page) * 10,
        limit: 10,
        include: Activity,
      });
      return { count, register: `${page * 10} - ${page * 10 + 10}`, rows };
    }
    if (page) {
      const { count } = await Country.findAndCountAll({
        where: {
          continent,
        },
      });
      const { rows } = await Country.findAndCountAll({
        order: [["name", order]],
        where: {
          continent,
        },

        offset: Number(page) * 10,
        limit: 10,
        include: Activity,
      });
      if (!rows.length) throw `the selected continent does not exist`;
      return { count, register: `${page * 10} - ${page * 10 + 10}`, rows };
    }

    const getCountriesByName = await Country.findAll({
      order: [["name", order]],
      where: {
        continent,
      },

      include: Activity,
    });
    if (!getCountriesByName.length)
      throw `the selected continent does not exist`;
    return getCountriesByName;
  },
};
