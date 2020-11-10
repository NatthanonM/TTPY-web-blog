import React, { Component, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import history from "./History";
import API from "./utils/api";

function App() {
  const [islogin, setIsLogin] = useState(false);

  const getIsLogin = async () => {
    const res = await API.isLogin();
    switch (res.statusCode) {
      case 200:
        setIsLogin(true);
        break;
      case 401:
        setIsLogin(false);
        break;
    }
  };

  useEffect(() => {
    getIsLogin();
    console.log(islogin);
  }, [islogin]);

  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route
            path="/login"
            exact
            render={(props) => {
              !islogin ? <Login {...props} /> : <Redirect to="/" />;
            }}
          />
          <Route
            path="/"
            exact
            render={(props) => {
              islogin ? <Home {...props} /> : <Redirect to="/login" />;
            }}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
