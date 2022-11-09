import imgAmerica from "../assets/america.png";
import imgEuropa from "../assets/europa.png";
import imgAsia from "../assets/Asia.webp";
import imgAfrica from "../assets/africa.png";
import imgAntartica from "../assets//antartica.png";
import imgOceania from "../assets/oceania.png";
import imgDefault from "../assets/oceania.png";
import { Switch } from "react-router-dom";
export function addthousandsseparators(number) {
  let partsNumber = number.split(".");
  partsNumber[0] = partsNumber[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return partsNumber.join(".");
}

export function imageContinent(detail) {
  let continentImg = "";
  switch (detail.continent) {
    case "Americas":
      continentImg = imgAmerica;
      break;
    case "Europe":
      continentImg = imgEuropa;
      break;
    case "Africa":
      continentImg = imgAfrica;
      break;
    case "Oceania":
      continentImg = imgOceania;
      break;
    case "Asia":
      continentImg = imgAsia;
      break;
    case "Antarctic":
      continentImg = imgAntartica;
      break;
    default:
      continentImg = imgDefault;
  }
  return continentImg;
}

export function validate(input) {
  let errors = {};
  if (input.name.length < 3) {
    errors.name = "Enter a valid name";
  }
  if (!/^[a-zñA-Z]+[a-zñA-Z\s]+[a-zñA-Z]$/.test(input.name)) {
    errors.name = "The name must contain only letters";
  }
  if (!/[1-5]/.test(input.difficult) || input.difficult.length > 1) {
    errors.difficult = "The maximum range is 1-5";
  }
  if (!input.duration) {
    errors.duration = "value to enter maximum up to 24 hours";
  }
  if (!/^([0-1]?[1-9]|[2][0-4])?$/.test(input.duration)) {
    errors.duration = "value to enter maximum up to 24 hours";
  }
  if (!input.country.length) {
    errors.country = "Enter at least one country to create the activity";
  }
  return errors;
}

//order filters
export const orderCountries = (order, array) => {
  switch (order) {
    case "ASC":
      return [
        ...array.sort((a, b) => {
          return a.name.localeCompare(b.name);
        }),
      ];
    case "DESC":
      return [
        ...array.sort((a, b) => {
          return b.name.localeCompare(a.name);
        }),
      ];
    default:
      return array;
  }
};

export const orderCountriesByPopulation = (order, array) => {
  switch (order) {
    case "All":
      return array;
    case "MENOR":
      return [
        ...array.sort((a, b) => {
          return a.population - b.population;
        }),
      ];
    case "MAYOR":
      return [
        ...array.sort((a, b) => {
          return b.population - a.population;
        }),
      ];
    default:
      return array;
  }
};
export const filterByContinentsCountry = (array, continent) => {
  if (!continent.length) return array;
  else return array.filter((country) => continent.includes(country.continent));
};
export const filterByActividadCountries = (array, activity, continent) => {
  if (!activity.length && !continent.length) {
    return array;
  }
  if (!activity.length) {
    return array.filter((country) => continent.includes(country.continent));
  }

  if (continent.length) {
    return array.filter(
      (country) =>
        country.activities &&
        country.activities
          .map((activity) => activity.typeActivity)
          .some((e) => activity.includes(e)) &&
        continent.includes(country.continent)
    );
  }
  return array.filter(
    (country) =>
      country.activities &&
      country.activities
        .map((activity) => activity.typeActivity)
        .some((e) => activity.includes(e))
  );
};
export const searchCountry = (name, arr) => {
  switch (name) {
    case "":
      return arr;
    default:
      return arr.filter(
        (e) =>
          e.name.toLowerCase().includes(name.toString().toLowerCase()) ||
          e.translation.toLowerCase().includes(name.toString().toLowerCase())
      );
  }
};
export const searchCountryByActivity = (name, arr) => {
  switch (name) {
    case "":
      return arr;
    default:
      return arr.filter((country) =>
        country.activities
          .map((activity) => activity.name.toLowerCase())
          .includes(name.toString().toLowerCase())
      );
  }
};

export const orderByAreaCountry = (array, order) => {
  switch (order) {
    case "Higher":
      return [
        ...array.sort(
          (current, nextCurrent) => current.area - nextCurrent.area
        ),
      ];

    case "Lower":
      return [
        ...array.sort(
          (current, nextCurrent) => nextCurrent.area - current.area
        ),
      ];

    default:
      return array;
  }
};

// export const pruebaActivity = (array, activity) => {
//   if (activity === "All") return array;
//   return array.filter(
//     (country) =>
//       country.activities &&
//       country.activities.map((activitys) => activitys.name).includes(activity)
//   );
// };
