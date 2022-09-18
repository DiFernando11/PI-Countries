export function validate(input) {
  let errors = {};
  if (input.name.length < 3) {
    errors.name = "Ingrese un nombre valido";
  }
  if (!/^[a-zñA-Z]+[a-zñA-Z\s]+[a-zñA-Z]$/.test(input.name)) {
    errors.name = "El nombre debe contener solo letras";
  }
  if (!/[1-5]/.test(input.difficult) || input.difficult.length > 1) {
    errors.difficult = "ERoor is required";
  }
  if (!/^([0-1]?[0-9]|[2][0-4])?$/.test(input.duration)) {
    errors.duration = "valor a ingresar maximo hasta 24 horas";
  }
  if(!input.country.length){
    errors.country = "Ingresa al menos un pais para crear la actividad"
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
