const { Op } = require("sequelize");
const { Country, Activity } = require("../db");

module.exports = {
  ///server route countries
  listCountries: async (name) => {
    if (name) {
      const getCountriesByName = await Country.findAll({
        attributes: [
          "name",
          "continent",
          "flag",
          "population",
          "translation",
          "googleMaps",
        ],
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

    const getAllCountries = await Country.findAll({
      attributes: [
        "id",
        "name",
        "continent",
        "flag",
        "population",
        "translation",
        "googleMaps",
      ],
      include: {
        model: Activity,
      },
      // limit: 40,
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

  ///server route activities
  listActivities: async () => {
    const getAllActivities = await Activity.findAll({
      include: {
        model: Country,
      },
    });
    return getAllActivities;
  },
  createActivity: async (
    name,
    difficult,
    duration,
    season,
    country,
    typeActivity
  ) => {
    if (
      !name ||
      !difficult ||
      !duration ||
      !season ||
      !country ||
      !typeActivity
    )
      throw `Not all parameters have been sent`;

    const nameActivity = name.toLowerCase();
    // busco la actividad para evitar que las actividades turisticas con las mismas propiedades se repitan
    const findActivity = await Activity.findOne({
      where: {
        name: nameActivity,
        difficult,
        duration,
        season,
        typeActivity,
      },
    });

    let newActivity = findActivity;
    //creo la actividad si no existia una igual
    if (!findActivity) {
      newActivity = await Activity.create({
        name: nameActivity,
        difficult,
        duration,
        season,
        typeActivity,
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
          [Op.or]: [
            { name: country[index].toUpperCase() },
            { translation: country[index].toUpperCase() },
          ],
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
};
