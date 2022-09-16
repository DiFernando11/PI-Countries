import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getAllCountries, informationCopyArray } from "../../redux/actions";
import { useQueryParams } from "../../utils/hooks/useQueryParams";
import CountryCard from "../countryCard";
import FilterContinent from "../filterContinent";
import Pagination from "../pagination";
import "./index.css";

function Home() {
  //CREATE COUNTRIES
  const [renderingOrder, setRenderingOrder] = useState(false);
  const [refreshState, setRefreshState] = useState(false);
  const handlerRefresh = () => {
    setRefreshState(true);
  };
  console.log(refreshState);
  const queries = useQueryParams();
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCountries(queries.page ? queries.page : 0));
  }, [queries, dispatch , refreshState]);

  //estados globales
  let countries = useSelector((state) => state.countries);
  let continentsOfCountries = useSelector(
    (state) => state.continentsOfCountries
  );
  // useEffect(() => {
  //   dispatch(informationCopyArray());
  // }, []);
  // const copyCountries = useSelector((state) => state.copyCountries);
  //estados locales
  const [renderingContinent, setRenderingContinent] = useState(false);

  //hooks
  const history = useHistory();
  //funccion handlers
  function handleQuery(continent) {
    history.replace(`?continents=${continent}`);
    setRenderingContinent(true);
    console.log(continentsOfCountries, "continent");
  }
  const handleCountries = (state, controller) => {
    setRenderingContinent(false);
    //paso como parametros un state para reiniciar el valor de mis filtros de orden
    state(controller);
  };
  const handlerReset = () => {
    setRenderingOrder(!renderingOrder);
  };
  console.log(countries);
  console.log(renderingOrder, "order");
  return (
    <main>
      <h2>INFORMATION COUNTRIES</h2>

      <Link to="/createActivity">Create Activity</Link>
      <div className="container_principal">
        {/* {copyCountries
          ? copyCountries.map((country) => (
              <CountryCard
                key={country.id}
                id={country.id}
                name={country.name}
                continent={country.continent}
                flag={country.flag}
              />
            ))
          : null} */}

        <div>
          <FilterContinent
            handleQuery={handleQuery}
            handleCountries={handleCountries}
            handlerReset={handlerReset}
            renderingOrder={renderingOrder}
            handlerRefresh={handlerRefresh}
          />
        </div>

        {renderingContinent ? (
          <div className="container_cards">
            Continent
            {continentsOfCountries.rows
              ? continentsOfCountries.rows.map((country) => (
                  <CountryCard
                    key={country.id}
                    id={country.id}
                    name={country.name}
                    continent={country.continent}
                    flag={country.flag}
                  />
                ))
              : null}
          </div>
        ) : (
          <div className="container_cards">
            PAISES
            {countries.length
              ? countries.map((country) => (
                  <CountryCard
                    key={country.id}
                    id={country.id}
                    name={country.name}
                    continent={country.continent}
                    flag={country.flag}
                  />
                ))
              : null}
          </div>
        )}

        <Pagination renderingContinent={renderingContinent} />
      </div>
    </main>
  );
}

export default Home;
