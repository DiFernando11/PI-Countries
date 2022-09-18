const axios = require("axios");
const { Country } = require("../db");

const informationApiToDB = async () => {
  try {
    const request = await axios.get("https://restcountries.com/v3/all");
    const response = request.data;
    let countriesAdd = 0;
    response.map((info) => {
      const informationCountry = {
        id: info.cca3,
        name: info.name.common,
        capital: info.capital || ["No registered capital"],
        subregion: info.subregion || "No registered subregion",
        area: info.area,
        population: info.population,
        flag: info.flags[0],
        continent: info.region,
        translation: info.translations.spa.common || "No existe traduccion",
        googleMaps: info.maps.googleMaps || "No existe ubicacion exacta",
      };

      try {
        Country.findOrCreate({
          where: {
            name: informationCountry.name,
          },
          defaults: informationCountry,
        });
      } catch (error) {
        console.log(error);
      }

      countriesAdd++;
    });
    console.log(`${countriesAdd} countries have been added`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  informationApiToDB,
};
