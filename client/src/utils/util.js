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
  return errors;
}

export function lengthOfArrayPage(number) {
  let numberPage = [];
  for (let i = 1; i < number; ++i) {
    numberPage.push(i);
  }
  return numberPage;
}

//order filters
export const orderCountries = (order, array) => {
  switch (order) {
    case "All":
      return array;
    case "ASC":
      return array.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    case "DESC":
      return array.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    default:
      return array;
  }
};

export const orderCountriesByPopulation = (order, array) => {
  switch (order) {
    case "All":
      return array;
    case "men":
      return array.sort((a, b) => {
        return a.population - b.population;
      });
    case "may":
      return array.sort((a, b) => {
        return b.population - a.population;
      });
    default:
      return array;
  }
};
