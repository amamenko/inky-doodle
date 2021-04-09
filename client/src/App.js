import React from "react";
import PedigreeTree from "./components/PedigreeTree/PedigreeTree";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Search from "./components/Search/Search";

const App = () => {
  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css?family=Press+Start+2P"
        rel="stylesheet"
      />
      <Router>
        <div>
          <Switch>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/tree">
              <PedigreeTree />
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
