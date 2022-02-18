import React from "react";

import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";

import Login from "./Login/Login";
import Register from "./CreateAccount/CreateAccount";
import Dashboard from "./Dashboard/Dashboard";
import NotFound from "./NotFound/NotFound";

const authGuard = (Component) => () => {
  return localStorage.getItem("token") ? (
    <Component />
  ) : (
    <Navigate to="/login" />
  );
};
const Routing = (props) => (
  <Router {...props}>
    <Routes>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/dashboard" render={authGuard(Dashboard)}></Route>
      <Route exact path="/">
        <Navigate to="/dashboard" />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Routes>
  </Router>
);

export default Routing;
