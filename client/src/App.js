import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import PedigreeTree from "./components/PedigreeTree/PedigreeTree";
import CircleMode from "./components/CircleMode/CircleMode";
import Home from "./components/Home/Home";
import Search from "./components/Search/SearchComponent/Search";
import FAQ from "./components/FAQ/FAQ";
import Contact from "./components/Contact/Contact";

const App = () => {
  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css?family=Press+Start+2P"
        rel="stylesheet"
      />
      <Router>
        <ScrollToTop />
        <div>
          <Switch>
            <Route path="/faq">
              <FAQ />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/tree">
              <PedigreeTree />
            </Route>
            <Route path="/circle">
              <CircleMode />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
