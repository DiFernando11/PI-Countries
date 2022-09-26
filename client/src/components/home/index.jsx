import { useSelector } from "react-redux";

import CountryCard from "../countryCard";
import FormFilter from "../formFilter";
import Pagination from "../pagination";
import giftNotCountries from "../../assets/animaniacs-warner-bros.gif";

import "./index.css";

function Home() {
  //estado locales
  //estados globales
  let countries = useSelector((state) => state.countries);
  let statePage = useSelector((state) => state.statePage);
  //acciones
  let postsPerPage = 9;
  const lastPostIndex = statePage * postsPerPage; // 9 //18
  const firstPostIndex = lastPostIndex - postsPerPage; //0 // 9
  const currentPosts = countries.slice(firstPostIndex, lastPostIndex);
  console.log(currentPosts);
  return (
    <main className="main">
      <div className="container_main">
        <div className="container_filters">
          <FormFilter />
        </div>
        {currentPosts.length ? (
          <div className="container_cards">
            {currentPosts &&
              currentPosts.map((country) => (
                <CountryCard
                  key={country.id}
                  id={country.id}
                  name={country.name}
                  continent={country.continent}
                  flag={country.flag}
                  translation={country.translation}
                />
              ))}
          </div>
        ) : (
          <div className="notExistedCountriesOrActivities">
            <h3>No existen actividades o paises disponibles</h3>
            <img className="nohaynada" src={giftNotCountries} />
            {/* <img
              className="nohaynada"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Paises_con_mayor%C3%ADa_cristiana.svg/4500px-Paises_con_mayor%C3%ADa_cristiana.svg.png"
            /> */}
          </div>
        )}
      </div>
      <div className="container_pagination">
        <Pagination />
      </div>
    </main>
  );
}

export default Home;
