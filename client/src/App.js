import { Route } from "react-router-dom";
import "./App.css";
import CreateActivity from "./components/createActivity";
import DetailCountry from "./components/detailCountry";
import Home from "./components/home";
import LandingPage from "./components/landingPage";
import Nav from "./components/nav";


function App() {
  return (
    <>
      <Route
        path={["/home", "/detailCountry/:id", "/createActivity"]}
        component={Nav}
      />
      <Route exact path={"/"} component={LandingPage} />
      <Route path={"/home"} component={Home} />
      {/* <Route path={"/home/continent"} /> */}

      <Route path={"/detailCountry/:id"} component={DetailCountry} />

      <Route exact path={"/createActivity"}>
        <CreateActivity
          desactivatedFormSearchCountries={true}
          id={0}
          initialState={{
            name: "",
            difficult: 1,
            duration: 1,
            season: "All year round",
            typeActivity: "Otros",
          }}
        />
      </Route>
    </>
  );
}

export default App;
