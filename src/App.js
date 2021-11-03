import React from "react";
import Header from "./components/Header";
import Employees from "./components/Employees";
import Main from "./components/Main";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/employees">
          <Employees />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </Router>
  );
}
