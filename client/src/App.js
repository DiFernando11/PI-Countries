import {  Route, Switch } from "react-router-dom";
import "./App.css";
import NotFound from "./components/404NotFound";
import About from "./components/about";
import CreateActivity from "./components/createActivity";
import DetailCountry from "./components/detailCountry";
import Home from "./components/home";
import LandingPage from "./components/landingPage";
import Nav from "./components/nav";

function App() {
  return (
    <>
      <Route
        path={["/home", "/detailCountry/:id", "/createActivity", "/about"]}
        component={Nav}
      />
      <Switch>
        <Route exact path="/" component={LandingPage} />

        <Route exact path="/home" component={Home} />

        <Route exact path="/about" component={About} />

        <Route exact path="/detailCountry/:id" component={DetailCountry} />

        <Route exact path="/createActivity">
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
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
