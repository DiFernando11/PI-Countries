import { useSelector } from "react-redux";

import CountryCard from "../countryCard";
import FormFilter from "../formFilter";
import Pagination from "../pagination";

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

  return (
    <main className="main">
      <div className="container_main">
        <div className="container_filters">
          <FormFilter />
        </div>
        <div className="container_span_and_cards">
          {/* <span className="move_to_create_activity">
            <Link to={"/createActivity"}>Create Activity</Link>
          </span> */}
          <div className="container_cards">
            {currentPosts
              ? currentPosts.map((country) => (
                  <CountryCard
                    key={country.id}
                    id={country.id}
                    name={country.name}
                    continent={country.continent}
                    flag={country.flag}
                    translation={country.translation}
                  />
                ))
              : null}
          </div>
        </div>
      </div>
      <div className="container_pagination">
        <Pagination />
      </div>
    </main>
  );
}

export default Home;
