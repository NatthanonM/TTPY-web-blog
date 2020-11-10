import React, { Component, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";

import { createBrowserHistory } from "history";
import API from "./utils/api";

import cookie from "js-cookie";

const history = createBrowserHistory();

function App() {
  const [islogin, setIsLogin] = useState(false);
  const [userProfile, setUserProfile] = useState({
    username: "Loading...",
    role: "Loading...",
  });

  const getUser = async () => {
    const res = await API.getUser();
    switch (res.statusCode) {
      case 200:
        setUserProfile(res.data);
        break;
      case 500:
        alert(res.message);
        break;
      default:
        alert("Something went wrong");
        break;
    }
  };

  useEffect(() => {
    if (!cookie.get("TTPY-LOG")) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
      getUser();
    }
  }, [islogin]);

  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route
            path="/login"
            exact
            render={(props) =>
              !islogin ? <Login {...props} /> : <Redirect to="/" />
            }
          />
          <Route
            path="/"
            exact
            render={(props) =>
              islogin ? (
                <Home {...props} userProfile={userProfile} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
