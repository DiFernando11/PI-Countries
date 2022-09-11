import { Route } from "react-router-dom";
import "./App.css";
import Home from "./components/home";
import LandingPage from "./components/landingPage";
import Nav from "./components/nav";

function App() {
  return (
    <>
      <Nav />
      <Route exact path={"/"} component={LandingPage} />
      <Route path={"/home"} component={Home} />
    </>
  );
}

export default App;
